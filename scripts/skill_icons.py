"""小技能的語意圖樣；逐項配對名稱，避免以分支底圖或文字代替圖示。"""
from html import escape


# 主色、亮部、深部；配色隨物件而變，不受路線主色限制。
PALETTES = {
    "amber": ("#e5b45f", "#fff0b5", "#75461e"),
    "flame": ("#fb9255", "#ffe6a3", "#922c38"),
    "ice": ("#72d9ed", "#e0fcff", "#315794"),
    "violet": ("#bca0f7", "#f0dfff", "#593a8d"),
    "rose": ("#ed98bd", "#ffe2ef", "#843a63"),
    "leaf": ("#9fd685", "#efffc4", "#396948"),
    "jade": ("#68d5b4", "#d4ffed", "#236d72"),
    "blue": ("#83b5fc", "#e1edff", "#354b95"),
}

# 主要物件使用可辨認的剪影、實色與高光；尺寸依 64 × 64 徽章設計。
MOTIFS = {
    "seal": '<circle cx="32" cy="30" r="15"/><path d="m23 43-3 11 12-6 12 6-3-11"/><path class="shine" d="m25 36 7-17 7 17m-11-6h8"/>',
    "contract": '<path d="M17 16h26v32H17z"/><path class="shine" d="M23 23h14m-14 6h10m-10 6h7"/><circle cx="42" cy="41" r="9"/><path class="shine" d="m38 41 3 3 5-6"/>',
    "flame": '<path d="M33 10c5 13 17 17 15 29-1 9-10 14-19 12-15-3-17-17-9-27 0 8 3 10 6 10-3-10 7-15 7-24Z"/><path class="shine" d="M33 31c1 7 9 8 7 14-1 5-12 5-13-1-1-5 4-7 6-13Z"/>',
    "key": '<circle cx="25" cy="25" r="12"/><path d="m33 34 17 17 5-5-5-5-4 3-5-5 3-4-5-5"/><circle class="shine" cx="25" cy="25" r="5"/>',
    "forge": '<path d="M17 24h30l5 8-13 6v9h7v5H18v-5h7v-9l-10-5Z"/><path class="shine" d="M26 22c-5-7 5-8 3-15m7 15c-3-5 6-6 4-12M21 30h23"/>',
    "boots": '<path d="m18 16 13 2-3 21 10 5v7H15V38Zm19-2 12 2-3 18 8 5v7H41l-9-6Z"/><path class="shine" d="m20 25 8 1m-9 6 8 1m12-9 8 1"/>',
    "tablet": '<path d="m20 13 23 1 6 9-3 28H17l-2-30Z"/><path class="shine" d="M23 23h16m-16 7h19m-19 7h12m-12 7h17M33 14l-3 7 4 5"/>',
    "crystal": '<path d="m32 9 15 13-3 24-12 10-13-10-3-24Z"/><path class="shine" d="m32 9-6 16 6 31 7-31Zm-16 13 10 3h13l8-3M19 46l7-21m18 21-5-21"/>',
    "stars": '<path d="m24 12 4 12 12 4-12 4-4 12-4-12-12-4 12-4Zm21 20 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"/><path class="shine" d="m31 14 10 5m-26 27 9 5"/>',
    "shield": '<path d="m32 11 18 7-2 18c-1 8-8 14-16 19-8-5-15-11-16-19l-2-18Z"/><path class="shine" d="m32 18 10 4-1 12c0 5-4 9-9 13-5-4-9-8-9-13l-1-12Zm0 0v29"/>',
    "pulse": '<path d="M12 19h40v28H12z"/><path class="shine" d="M13 34h10l5-12 7 19 5-10h11M22 51h20"/>',
    "book": '<path d="M32 19c-6-5-14-5-22-3v31c9-2 16-1 22 4 6-5 13-6 22-4V16c-8-2-16-2-22 3Z"/><path class="shine" d="M32 19v32M16 24l10 2m-10 6 10 2m12-8 10-2m-10 10 10-2"/>',
    "astrolabe": '<circle cx="32" cy="32" r="20"/><ellipse class="shine" cx="32" cy="32" rx="10" ry="20" transform="rotate(35 32 32)"/><path class="shine" d="M12 32h40M32 12v40m0-31 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"/>',
    "hourglass": '<path d="M19 13h26v8c0 6-9 9-9 11s9 5 9 11v8H19v-8c0-6 9-9 9-11s-9-5-9-11Z"/><path class="shine" d="M16 12h32M16 52h32M23 20h18l-9 8Zm9 17-9 10h18Z"/>',
    "compass": '<circle cx="32" cy="32" r="20"/><path class="shine" d="m40 20-4 16-16 8 7-17Zm-13 7 9 9M32 9v5m23 18h-5M32 55v-5M9 32h5"/>',
    "spark": '<path d="m35 9-5 16 14-3-10 13 3 20-9-15-15 3 9-14-2-13 9 8Z"/><path class="shine" d="m46 13-3 6m6 22 5 3M13 15l4 5m-4 30 7-4"/>',
    "bag": '<path d="m25 11 7 3 9-3-4 13c8 6 15 12 13 21-2 10-33 10-36 0-2-9 5-15 13-21Z"/><path class="shine" d="M24 24h16m-17 4h18m-9 7v12m-6-6h12"/>',
    "skeleton": '<circle cx="32" cy="17" r="7"/><path d="M28 24h8v25h-8z"/><path class="shine" d="M21 30h22m-24 7h26m-22 7h18M32 49l-9 6m9-6 9 6"/>',
    "mask": '<path d="M14 17c10 5 26 5 36 0l-2 20c-1 9-9 16-16 18-7-2-15-9-16-18Z"/><path class="shine" d="m20 29 8 3-7 3m23-6-8 3 7 3m-17 9q6-5 12 0"/>',
    "barrier": '<circle cx="32" cy="32" r="19"/><path class="shine" d="m19 45 26-26M10 22l-3 10 3 10m44-20 3 10-3 10"/>',
    "flag": '<path d="M21 12v43m1-41c12-9 14 10 29 0l-4 23c-12 9-16-9-25 0"/><path class="shine" d="m29 24 5 5 8-9M14 55h18"/>',
    "council": '<circle cx="32" cy="33" r="13"/><path class="shine" d="M32 24v18m-9-9h18"/>' + ''.join(f'<circle cx="{x}" cy="{y}" r="4"/>' for x,y in [(32,10),(48,17),(55,33),(48,49),(32,56),(16,49),(9,33),(16,17)]),
    "chest": '<path d="M13 28h38v22H13Zm0 0v-6c0-14 38-14 38 0v6Z"/><path class="shine" d="M13 33h38M21 16v34m22-34v34M28 29h8v10h-8Z"/>',
    "crown": '<path d="m10 21 12 8 10-16 10 16 12-8-6 28H16Z"/><path class="shine" d="M17 42h30m-15-8 3 4-3 4-3-4Z"/><circle cx="10" cy="19" r="3"/><circle cx="32" cy="11" r="3"/><circle cx="54" cy="19" r="3"/>',
    "wand": '<path d="m17 51 24-26 5 5-24 26Z"/><path class="shine" d="m40 10 2 8 9 2-9 3-2 8-3-8-8-3 8-2Zm-21 4 1 5 5 1-5 1-1 5-1-5-5-1 5-1Z"/>',
    "sword": '<path d="m44 10 9 1-1 10-21 23-10-10Z"/><path class="shine" d="m47 16-21 23M17 31l17 17m-10-9-9 12m-4-4 8 8"/>',
    "scales": '<path d="M29 14h6v35h-6zM22 49h20v5H22z"/><path class="shine" d="M13 23h38m-32 0-9 16h18Zm26 0-9 16h18ZM10 39q9 11 18 0m8 0q9 11 18 0"/>',
    "gate": '<path d="M15 53V25a17 17 0 0 1 34 0v28H39V26a7 7 0 0 0-14 0v27Z"/><path class="shine" d="M12 53h40M16 27h9m14 0h9M32 9v10m-12-5 7 8m17-8-7 8"/>',
    "runes": '<path d="m32 10 21 12v24L32 56 11 44V22Z"/><path class="shine" d="m32 17 14 10v13l-14 8-14-9V27Zm-8 13 16 9m-16 0 16-9M32 17v31"/>',
    "swords": '<path d="m13 11 10 2 24 31-7 6-26-29Zm38 0-10 2L17 44l7 6 26-29Z"/><path class="shine" d="m12 40 15 12m10 0 15-12M18 47l-6 7m34-7 6 7"/>',
    "resonance": '<path d="M21 16v15a11 11 0 0 0 22 0V16h-6v15a5 5 0 0 1-10 0V16Z"/><path class="shine" d="M32 42v12m-7 0h14M13 19q-7 12 0 22m38-22q7 12 0 22"/>',
    "clock": '<circle cx="32" cy="32" r="20"/><path class="shine" d="M32 17v16l10 6M32 12v4m20 16h-4M32 52v-4M12 32h4"/>',
    "wheel": '<circle cx="32" cy="32" r="21"/><circle class="shine" cx="32" cy="32" r="6"/><path class="shine" d="M32 11v15m0 12v15M11 32h15m12 0h15M17 17l11 11m10 10 9 9m0-30L36 28m-8 10-11 9"/>',
    "rings": '<ellipse cx="32" cy="32" rx="21" ry="15"/><ellipse class="shine" cx="32" cy="32" rx="15" ry="10"/><ellipse class="shine" cx="32" cy="32" rx="7" ry="5"/><path class="shine" d="m13 20 9 6m21 13 8 5M25 13l4 8"/>',
    "orb": '<circle cx="32" cy="28" r="18"/><path d="m22 44-5 9h30l-5-9Z"/><path class="shine" d="m32 16 3 8 8 3-8 3-3 9-3-9-8-3 8-3Zm-13 2 5-4"/>',
    "echo": '<circle cx="24" cy="32" r="6"/><path class="shine" d="M32 20q13 12 0 24m7-32q21 20 0 40m-25-30q-7 10 0 20"/>',
    "staff": '<path d="m29 26 6 1-7 29-6-2Z"/><path d="m34 8 10 10-6 12-13-2-4-12Z"/><path class="shine" d="m34 8-2 15 12-5m-23-2 11 7 6 7"/>',
    "armor": '<path d="m24 13 8 6 8-6 14 9-6 11-5-3 2 22H19l2-22-5 3-6-11Z"/><path class="shine" d="m24 13 8 18 8-18M23 35h18M32 31v21"/>',
    "chain": '<rect x="11" y="17" width="26" height="17" rx="8" transform="rotate(-40 24 25)"/><rect x="27" y="31" width="26" height="17" rx="8" transform="rotate(-40 40 39)"/><path class="shine" d="m25 39 14-14"/>',
    "fork": '<path d="M28 54V35L14 21l6-6 12 13 12-13 6 6-14 14v19Z"/><path class="shine" d="M12 28V13h15m10 0h15v15"/>',
    "rewind": '<path d="M15 24a20 20 0 1 1 1 23l7-5a12 12 0 1 0 0-18l7 6H10V10Z"/><path class="shine" d="M33 23v11l7 5"/>',
    "web": '<path d="m32 10 21 14v23L32 55 11 43V23Z"/><path class="shine" d="M32 10v45M11 23l42 24M11 43l42-19M23 17l-1 23 19 6 2-23ZM11 23l11 17 10 15m21-31-12 22"/>',
    "portal": '<ellipse cx="32" cy="32" rx="18" ry="23"/><ellipse class="shine" cx="32" cy="32" rx="11" ry="16"/><path class="shine" d="m27 27 10 10m0-10L27 37M9 20l-3 12 3 12m46-24 3 12-3 12"/>',
    "mirror": '<ellipse cx="32" cy="27" rx="16" ry="19"/><path d="M28 46h8v10h-8z"/><path class="shine" d="m23 26 13-10m-10 20 15-13"/>',
    "scroll": '<path d="M18 14h31v7h-5v25c0 9-28 9-28 0V21h-5v-4c0-6 7-7 7-3Z"/><path class="shine" d="M18 14v27h20v5c0 7 6 7 6 0M24 23h14m-14 7h10"/>',
    "quill": '<path d="M18 46C15 29 32 9 52 10c-1 21-17 35-34 36Z"/><path class="shine" d="m12 54 32-34m-20 22 1-13m4 7 13-1m-8-6 1-10"/>',
    "hammer": '<path d="m21 12 10-3 20 20-11 11-19-20Z"/><path d="m29 29 6 6-20 21-7-7Z"/><path class="shine" d="m25 16 20 20M13 45l6 6"/>',
    "feast": '<path d="m14 32 6 17h24l6-17Z"/><path class="shine" d="M12 31h40M23 24c-6-6 6-7 0-13m10 13c-6-6 6-7 0-13m10 13c-6-6 6-7 0-13M24 53h16"/>',
    "ship": '<path d="M11 39h43l-9 13H22ZM31 12v25H14Zm5 3 15 20H36Z"/><path class="shine" d="M32 9v32M9 56q6-4 12 0t12 0 12 0 12 0"/>',
    "fountain": '<path d="M15 36h34c-2 11-11 13-14 13v6h-6v-6c-5-1-13-4-14-13Z"/><path class="shine" d="M32 35V18m0 7c-12-13-18-5-16 2m16-2c12-13 18-5 16 2m-16-5c-6-8-6-10 0-16 6 6 6 8 0 16Z"/>',
    "leaf": '<path d="M15 47C7 25 27 12 51 11c1 26-14 43-36 36Z"/><path class="shine" d="m11 54 32-33m-22 22-1-13m8 6 13-1m-7-7 1-10"/>',
    "badge": '<path d="m21 10 11 6 11-6-3 17H24Z"/><path d="m32 24 7 5 9 1 1 10-6 6-3 9-8-3-8 3-3-9-6-6 1-10 9-1Z"/><path class="shine" d="m32 30 3 6 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1Z"/>',
    "table": '<ellipse cx="32" cy="29" rx="23" ry="14"/><path class="shine" d="M13 29v18m38-18v18M32 43v12m0-33v13m-8-6h16"/>',
    "coins": '<path d="M13 34v15c0 7 24 7 24 0V34Z"/><ellipse cx="25" cy="34" rx="12" ry="5"/><circle cx="41" cy="24" r="13"/><path class="shine" d="M41 17v14m4-12c-9-6-15 5-5 5s3 11-4 5M13 42q12 8 24 0"/>',
    "cart": '<path d="M10 22h39l-4 20H18Z"/><path class="shine" d="M8 16h8l6 26m1-20v20m10-20v20m10-20v20M17 31h30"/><circle cx="23" cy="50" r="5"/><circle cx="42" cy="50" r="5"/>',
    "horn": '<path d="m15 29 16-5 20-12v38L31 38l-16-3Zm8 8 6 16h8l-6-15Z"/><path class="shine" d="M43 17v28M9 27v11m46-17 5-4m-5 27 5 4"/>',
    "terminal": '<path d="M14 14h36v30H14Zm12 30h12v6h9v4H17v-4h9Z"/><path class="shine" d="m32 18 10 8-3 10-7 5-7-5-3-10Zm0 0-3 10 3 13 4-13Zm-10 8 7 2h7l6-2"/>',
    "castle": '<path d="M11 17h7v8h6v-8h7v8h7v-8h7v8h7v28H11Z"/><path class="shine" d="M27 53V40a6 6 0 0 1 12 0v13M17 33h4m23 0h4M32 11v13"/>',
    "root": '<path d="m32 10 12 9-3 13-9 6-10-6-3-13Z"/><path class="shine" d="m32 10-4 13 4 15 5-15ZM32 38v10m0-5-14 7m14-7 14 7m-14-2-7 8m7-8 7 8"/>',
    "mold": '<path d="M12 16h40v36H12Z"/><path class="shine" d="m32 22 10 9-3 13H25l-3-13ZM12 34h10m20 0h10M32 16v6m0 22v8"/>',
    "ghost": '<path d="M16 51V27a16 16 0 0 1 32 0v24l-8-5-8 6-8-6Z"/><path class="shine" d="M24 28v7m16-7v7m-11 6h6"/>',
    "bow": '<path d="M20 12c29 2 29 38 0 40l8-20Z"/><path class="shine" d="M20 12v40M10 32h44m-8-7 8 7-8 7"/>',
    "bridge": '<path d="M10 25h44v10c-13-1-17 9-17 18H27c0-9-4-19-17-18Z"/><path class="shine" d="M10 17v19m11-19v10m11-10v10m11-10v10m11-10v19M10 21h44"/>',
    "drum": '<ellipse cx="32" cy="29" rx="18" ry="8"/><path d="M14 29v18c0 11 36 11 36 0V29"/><path class="shine" d="m14 32 12 18 12-17 12 14M17 10l26 15M47 10 25 25"/>',
    "party": '<circle cx="32" cy="17" r="7"/><circle cx="14" cy="25" r="5"/><circle cx="50" cy="25" r="5"/><path d="M21 51V36a11 11 0 0 1 22 0v15Zm-13-6v-9a6 6 0 0 1 11 0v9Zm37 0v-9a6 6 0 0 1 11 0v9Z"/>',
    "net": '<path d="m42 10 11 10-25 25-12-12Z"/><path class="shine" d="m16 33 26-23m-19 30 26-25M33 20l12 12m-19-5 12 12M22 39 10 54"/>',
    "ear": '<path d="M25 46c0-7-9-8-9-19a16 16 0 0 1 32 0c0 9-8 11-9 18-1 13-14 13-14 1Z"/><path class="shine" d="M24 27a8 8 0 0 1 16 0c0 7-9 5-8 14M53 18q8 9 0 19"/>',
    "eye": '<path d="M7 32q25-30 50 0-25 30-50 0Z"/><circle class="shine" cx="32" cy="32" r="9"/><circle cx="32" cy="32" r="3"/>',
    "lyre": '<path d="M17 14h9v13l-3 9c0 12 18 12 18 0l-3-9V14h9v20c0 11-5 17-12 18v5h-6v-5c-7-1-12-7-12-18Z"/><path class="shine" d="M26 20h12M29 20v24m6-24v24"/>',
    "speech": '<path d="M10 15h31v24H27L15 49V39h-5Z"/><path d="M43 23h12v28H43l-9 6v-6h-7v-9h17Z"/><path class="shine" d="M17 24h17m-17 7h11"/>',
    "search": '<circle cx="28" cy="27" r="16"/><path d="m38 39 6-5 13 16-7 6Z"/><path class="shine" d="m20 28 6 5 11-13"/>',
    "footprints": '<ellipse cx="24" cy="24" rx="6" ry="12" transform="rotate(-25 24 24)"/><path d="m24 38 7-3 2 7-7 3Z"/><ellipse cx="43" cy="34" rx="6" ry="12" transform="rotate(20 43 34)"/><path d="m35 47 8 2-2 7-8-2Z"/>',
    "chart": '<path d="M12 13h40v36H12Z"/><path class="shine" d="M19 39V28h6v11m5 0V21h6v18m5 0V17h5v22M19 44h27M32 49v7m-10 0h20"/>',
    "beacon": '<path d="m25 28 14 0 7 26H18Zm-3-13h20v13H22Zm3-5h14v5H25Z"/><path class="shine" d="M28 20h8M12 17l-7-4m7 13-7 4m47-13 7-4m-7 13 7 4M23 38h18m-21 9h24"/>',
    "torch": '<path d="M24 32h16l-5 24h-6Z"/><path d="M33 8c-2 10-14 10-13 20 2 13 25 10 24-1 0-7-8-10-11-19Z"/><path class="shine" d="M33 22c-6 5-7 10 0 11 7-1 5-6 0-11ZM24 38h16"/>',
    "moon": '<path d="M43 11a22 22 0 1 0 10 33C26 51 17 21 43 11Z"/><path class="shine" d="m46 18 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"/>',
    "tower": '<path d="M19 10h7v7h12v-7h7v17l-5 4 3 23H21l3-23-5-4Z"/><path class="shine" d="M28 54V42h8v12M29 28h6v6h-6M20 22h24"/>',
    "puzzle": '<path d="M13 14h14c-4 12 14 12 10 0h14v14c-12-4-12 14 0 10v13H37c4-12-14-12-10 0H13V38c12 4 12-14 0-10Z"/>',
    "envelope": '<path d="M11 21h42v30H11Z"/><path class="shine" d="m11 21 21 18 21-18M11 51l15-16m27 16L38 35"/><path d="m21 21 11-12 11 12-11 10Z"/>',
    "wall": '<path d="M10 17h44v36H10Z"/><path class="shine" d="M10 29h44M10 41h44M24 17v12m16-12v12M18 29v12m16-12v12m14-12v12M24 41v12m16-12v12"/>',
    "window": '<path d="M13 16h38v37H13Z"/><path class="shine" d="M18 21h28v25H18Zm14 0v25M18 33h28m-23-7 5-2m8 16 6-3M9 54h46"/>',
    "files": '<path d="M19 10h25l7 8v29H19Z"/><path d="M12 18h25l7 8v28H12Z"/><path class="shine" d="M37 18v9h7M19 34h18m-18 7h18m-18 7h12"/>',
    "eagle": '<path d="m9 18 18 11 5-10 5 10 18-11-7 19-12 5-4 14-4-14-12-5Z"/><path class="shine" d="m13 24 14 12m24-12L37 36m-9-7h8m-5-5 4 2"/>',
    "cipher": '<path d="M14 12h36v40H14Z"/><path class="shine" d="m21 20 6 6m0-6-6 6m17-6 5 6m0-6-5 6M21 34h6m-6 7h6m11-7 5 7m0-7-5 7M32 15v34"/>',
    "lantern": '<path d="m24 19 3-9h10l3 9 8 5-4 26H20l-4-26Zm-4 31h24v5H20Z"/><path class="shine" d="M17 25h30M26 25l-3 25m15-25 3 25M32 31l4 8-4 7-4-7Z"/>',
    "loom": '<path d="M12 12h7v42h-7Zm33 0h7v42h-7Z"/><path class="shine" d="M19 18h26M19 46h26M24 18v28m8-28v28m8-28v28M19 27l26 9m-26 0 26-9"/>',
    "trap": '<path d="m10 39 7-14 7 10 8-14 8 14 7-10 7 14-9 13H19Z"/><path class="shine" d="m17 48 7-10 8 11 8-11 7 10M28 13l4-5 4 5"/>',
    "towers": '<path d="M8 30h12v24H8Zm18-17h12v41H26Zm18 17h12v24H44Z"/><path class="shine" d="M14 30 32 13l18 17M8 39h12m6-15h12m6 15h12M12 47h4m14-4h4m14 4h4"/>',
    "maze": '<path d="M11 11h42v42H11Z"/><path class="shine" d="M19 11v17h17V19h9v25H27v9M11 36h8v9m17-1V28h17M27 11v9m-8 16h8"/>',
    "map": '<path d="m9 17 15-6 16 6 15-6v37l-15 6-16-6-15 6Z"/><path class="shine" d="M24 11v37m16-31v37M15 35l6-7 11 9 14-12m-2-4 7 7m0-7-7 7"/>',
    "camp": '<path d="M8 49 32 13l24 36Zm16 0 8-19 8 19Z"/><path class="shine" d="M32 7v23M12 53h40m-35-4 11-28m19 28L36 21"/>',
    "bolt": '<path d="M34 8 15 36h15l-1 20 21-31H35Z"/><path class="shine" d="M15 16h9M9 25h10m25 20h10m-15 9h10"/>',
    "banner": '<path d="M17 9v47m2-44h30v29L34 51 19 41Z"/><path class="shine" d="m26 28 6 6 11-14M10 56h16"/>',
    "gear": '<path d="m27 10 10 0 2 7 7 4 7-1 5 9-5 5-1 8 3 6-8 6-6-4-8 1-5 5-9-5 1-7-4-7-7-2V25l7-2 4-7-1-7 9-5Z" transform="translate(2 3) scale(.9)"/><circle class="shine" cx="32" cy="32" r="10"/>',
}

# 明確列出每項技能的物件與元素色，不用序號或分支猜測名稱。
SKILL_ART = {
    "f": "seal:amber contract:rose flame:flame key:jade forge:flame boots:leaf tablet:blue crystal:ice stars:violet shield:blue seal:violet pulse:rose book:amber astrolabe:blue hourglass:amber compass:jade spark:flame bag:leaf skeleton:amber shield:jade mask:violet key:amber barrier:rose flag:leaf",
    "g": "council:violet chest:amber crown:amber wand:violet sword:ice scales:jade gate:blue runes:violet swords:ice resonance:jade clock:amber wheel:ice tablet:amber rings:leaf orb:violet seal:amber clock:blue echo:jade staff:violet armor:blue swords:flame gate:amber chain:amber seal:rose fork:violet rewind:blue orb:rose web:jade chain:violet portal:violet mask:rose contract:amber mask:blue wand:jade quill:ice mirror:violet contract:rose tablet:jade wand:violet forge:flame",
    "v": "bag:amber ship:ice key:amber feast:flame hammer:amber fountain:jade spark:rose leaf:leaf council:blue badge:amber table:leaf scroll:ice hammer:flame book:violet contract:rose wheel:jade coins:amber scales:jade cart:amber horn:flame forge:flame terminal:ice scales:violet castle:amber root:leaf seal:blue mold:flame ghost:violet swords:rose chain:jade echo:blue chest:amber",
    "l": "bow:leaf bridge:ice drum:flame party:violet net:amber echo:jade ear:blue eye:jade eye:amber gate:violet shield:blue lyre:rose wand:ice swords:flame speech:rose orb:violet footprints:leaf council:blue eye:violet chart:jade badge:amber beacon:ice crystal:violet torch:flame horn:amber resonance:jade moon:blue crown:violet",
    "r": "search:jade tower:blue chain:amber search:violet puzzle:leaf scroll:amber swords:flame envelope:ice wall:amber window:rose files:blue gate:amber speech:jade badge:leaf eye:violet eagle:amber cipher:violet lantern:amber beacon:jade loom:rose trap:flame scroll:ice towers:violet maze:blue swords:jade boots:flame map:leaf crown:amber",
    "e": "map:amber puzzle:jade castle:blue camp:leaf torch:flame resonance:ice bolt:amber banner:violet sword:ice eye:violet hourglass:amber banner:leaf swords:rose rewind:blue armor:jade crown:amber",
}
ART = {f"{prefix}{index:02d}": tuple(spec.split(":"))
       for prefix, specs in SKILL_ART.items()
       for index, spec in enumerate(specs.split(), 1)}


def render_icon(identifier, title, topic):
    motif, palette = ART[identifier]
    color, light, shade = PALETTES[palette]
    frame = int(identifier[1:]) % 3
    frames = [
        '<path d="M19 3h26l16 16v26L45 61H19L3 45V19Z"/>',
        '<rect x="4" y="4" width="56" height="56" rx="15"/>',
        '<path d="m32 2 26 15v30L32 62 6 47V17Z"/>',
    ]
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" data-motif="{motif}" data-palette="{palette}">
<title>{escape(title)}：{escape(topic)}</title>
<defs><radialGradient id="bg"><stop stop-color="{shade}"/><stop offset="1" stop-color="#111b20"/></radialGradient><linearGradient id="art" x2=".8" y2="1"><stop stop-color="{light}"/><stop offset=".45" stop-color="{color}"/><stop offset="1" stop-color="{shade}"/></linearGradient></defs>
<g fill="url(#bg)" stroke="{color}" stroke-width="1.2">{frames[frame]}</g>
<circle cx="32" cy="32" r="24" fill="none" stroke="{color}" opacity=".15"/>
<path d="m9 9 3 3m40 40 3 3M9 55l3-3M52 12l3-3" stroke="{light}" opacity=".65"/>
<style>.shine{{fill:none;stroke:{light};stroke-width:1.5}}</style>
<g fill="url(#art)" stroke="{color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">{MOTIFS[motif]}</g>
</svg>'''
