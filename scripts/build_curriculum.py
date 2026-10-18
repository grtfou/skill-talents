"""驗證明確的技能資料，產生排版、SVG 徽章與技能目錄。"""
from copy import deepcopy
from heapq import heappop, heappush
from pathlib import Path
import argparse
import json
import re
from skill_icons import render_icon

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripts/curriculum_source.json"
WINDOWS_RESERVED_NAMES = {"con", "prn", "aux", "nul"} | {
    f"{prefix}{number}" for prefix in ("com", "lpt") for number in range(1, 10)
}


def compile_curriculum(source):
    """純資料轉換：ID、先備不隨順序改動；排版不能新增解鎖條件。"""
    data = deepcopy(source)
    branches, skills = data["branches"], data["skills"]
    if not branches:
        raise ValueError("課程至少需有一個分支。")
    branch_map, lookup, icon_names = {}, {}, set()
    for branch in branches:
        if branch["id"] in branch_map:
            raise ValueError(f"分支識別碼重複：{branch['id']}")
        branch_map[branch["id"]] = branch
    for skill in skills:
        identifier = skill["id"]
        if not isinstance(identifier, str) or not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9_-]*", identifier):
            raise ValueError("技能識別碼僅允許英數字、底線與連字號，且需以英數字開頭。")
        if identifier in lookup:
            raise ValueError(f"技能識別碼重複：{identifier}")
        icon_name = identifier.casefold()
        if icon_name in WINDOWS_RESERVED_NAMES:
            raise ValueError(f"技能識別碼不可使用 Windows 保留檔名：{identifier}")
        if icon_name in icon_names:
            raise ValueError(f"技能圖示檔名重複（不區分大小寫）：{identifier}")
        icon_names.add(icon_name)
        lookup[identifier] = skill
        branch = branch_map.get(skill["branch"])
        if branch is None:
            raise ValueError(f"找不到技能分支：{identifier}")
        lane = skill["lane"]
        if type(lane) is not int or not 0 <= lane < len(branch["lanes"]):
            raise ValueError(f"技能欄位超出範圍：{identifier}")
        if type(skill["hours"]) is not int or not 1 <= skill["hours"] <= 20:
            raise ValueError(f"每項技能需介於 1–20 小時：{identifier}")
        deps = skill["prerequisites"]
        if not isinstance(deps, list) or any(not isinstance(dep, str) for dep in deps):
            raise ValueError(f"先備技能需為識別碼陣列：{identifier}")
        if len(set(deps)) != len(deps):
            raise ValueError(f"先備技能重複：{identifier}")

    dependents = {identifier: [] for identifier in lookup}
    pending = {}
    for index, skill in enumerate(skills):
        pending[skill["id"]] = len(skill["prerequisites"])
        for parent in skill["prerequisites"]:
            if parent not in lookup:
                raise ValueError(f"找不到先備技能：{skill['id']} → {parent}")
            dependents[parent].append(index)

    # 可排版者優先依來源順序取出；重連到同欄後方節點時，依真正先備調整順序。
    ready = []
    for index, skill in enumerate(skills):
        if pending[skill["id"]] == 0:
            heappush(ready, index)
    lane_levels, placed = {}, 0
    while ready:
        skill = skills[heappop(ready)]
        lane_key = (skill["branch"], skill["lane"])
        parent_levels = [lookup[parent]["level"] for parent in skill["prerequisites"]
                         if lookup[parent]["branch"] == skill["branch"]]
        skill["level"] = max([lane_levels.get(lane_key, -1)] + parent_levels) + 1
        lane_levels[lane_key] = skill["level"]
        placed += 1
        for index in dependents[skill["id"]]:
            identifier = skills[index]["id"]
            pending[identifier] -= 1
            if pending[identifier] == 0:
                heappush(ready, index)
    if placed != len(skills):
        raise ValueError("先備技能不可循環相依。")
    for skill in skills:
        skill["icon"] = f"assets/icons/{skill['id']}.svg"
    # 保持既有產物欄位順序，方便確認純重構沒有變動課程。
    data["skills"] = [dict(id=skill["id"], branch=skill["branch"], lane=skill["lane"],
                           level=skill["level"], **{key: value for key, value in skill.items()
                                                  if key not in ("id", "branch", "lane", "level")})
                      for skill in skills]
    return data


def render_catalog(data):
    branches, skills = data["branches"], data["skills"]
    total = sum(s["hours"] for s in skills)
    hour_range = f"，每項 {min(s['hours'] for s in skills)}–{max(s['hours'] for s in skills)} 小時" if skills else ""
    lines = ["# Eng-TOEIC 技能目錄", "", f"共 {len(skills)} 項技能，規劃 {total:,} 小時{hour_range}。", "", "本目錄的時數是為零基礎、學得較慢者編排的保守預算，包含練習、間隔複習及檢討；不是實證平均值、最低必需時數或分數保證。已有能力者可自行記入既有投入；不足者可在樹外持續練習。滿點僅代表記錄完成，不等於通過能力檢核。", "", "先備規則：列出的技能需全部滿點才可投入；『無』代表可直接開始。字母和 KK 入門可獨立開始；聽力辨音會用到拼讀及子音基礎。無關的詞彙主題及單篇文類不互相綁定。", ""]
    names = {s["id"]: s["title"] for s in skills}
    for b in branches:
        group = [s for s in skills if s["branch"] == b["id"]]
        lines.extend([f"## {b['name']}（{len(group)} 項／{sum(s['hours'] for s in group)} 小時）", "", b["description"], ""])
        for s in group:
            deps = "、".join(f"{p} {names[p]}" for p in s["prerequisites"]) or "無"
            lines.extend([f"### {s['id']} {s['title']}｜{s['topic']}（{s['hours']} 小時）", "", f"- 路線：{b['lanes'][s['lane']]}", f"- 先備：{deps}", f"- 內容：{s['description']}", f"- 自我檢核：{s['checkpoint']}", ""])
    return "\n".join(lines)


def build(source_path=SOURCE, output_root=ROOT):
    data = compile_curriculum(json.loads(Path(source_path).read_text(encoding="utf-8")))
    skills = data["skills"]
    # 全部驗證與圖示渲染完成才寫入，避免無效重連覆蓋既有產物。
    icons = {skill["id"]: render_icon(skill["id"], skill["title"], skill["topic"], skill.pop("art", None))
             for skill in skills}
    catalog = render_catalog(data)
    output_root = Path(output_root)
    for relative in ("app/data", "app/assets/icons", "docs"):
        (output_root / relative).mkdir(parents=True, exist_ok=True)
    # 先清理再寫入，確保只改 ID 大小寫時也能建立正確檔名，避免刪掉新圖示。
    # 此資料夾僅放產生器管理的 SVG，職業圖示另放於 app/assets/。
    for path in (output_root / "app/assets/icons").glob("*.svg"):
        if path.stem not in icons:
            path.unlink()
    for identifier, svg in icons.items():
        (output_root / "app/assets/icons" / f"{identifier}.svg").write_text(svg, encoding="utf-8")
    (output_root / "app/data/curriculum.js").write_text("// 由 scripts/build_curriculum.py 產生；請修改來源後重建。\nexport default " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    (output_root / "docs/技能目錄.md").write_text(catalog, encoding="utf-8")
    total = sum(skill["hours"] for skill in skills)
    print(f"已產生 {len(skills)} 項技能、{total} 小時及 {len(skills)} 個原創 SVG 徽章。")
    return data


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=SOURCE)
    parser.add_argument("--output-root", type=Path, default=ROOT)
    args = parser.parse_args()
    build(args.source, args.output_root)
