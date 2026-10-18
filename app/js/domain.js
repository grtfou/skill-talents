// 純規則層：不存取畫面、檔案或瀏覽器儲存空間。
export function createEngine(curriculum) {
  const skills = new Map(curriculum.skills.map(skill => [skill.id, skill]));
  const dependents = new Map(curriculum.skills.map(skill => [skill.id, []]));
  if (skills.size !== curriculum.skills.length) throw new Error('技能識別碼重複。');
  for (const skill of skills.values()) {
    if (!Number.isInteger(skill.hours) || skill.hours < 1 || skill.hours > 20) throw new Error('每項技能需介於 1–20 小時。');
    for (const id of skill.prerequisites) {
      if (!skills.has(id)) throw new Error(`找不到先備技能：${id}`);
      dependents.get(id).push(skill.id);
    }
  }
  const visited = new Set(), visiting = new Set();
  function visit(id) {
    if (visiting.has(id)) throw new Error('先備技能不可循環相依。');
    if (visited.has(id)) return;
    visiting.add(id);
    skills.get(id).prerequisites.forEach(visit);
    visiting.delete(id);
    visited.add(id);
  }
  skills.forEach(skill => visit(skill.id));
  const value = (points, id) => Object.hasOwn(points, id) ? points[id] ?? 0 : 0;
  const unlocked = (points, id) => skills.get(id).prerequisites.every(dep => value(points, dep) === skills.get(dep).hours);
  const blockers = (points, id) => dependents.get(id).filter(dep => value(points, dep) > 0);

  function change(points, id, delta) {
    const skill = skills.get(id);
    if (!skill || ![1, -1].includes(delta)) return { ok: false, message: '無效的技能操作。' };
    const next = value(points, id) + delta;
    if (next < 0 || next > skill.hours) return { ok: false, message: next < 0 ? '這項技能尚未投入時數。' : '這項技能已經滿點。' };
    if (delta > 0 && !unlocked(points, id)) return { ok: false, message: '請先完成列出的先備技能，再投入這項技能。' };
    if (delta < 0 && blockers(points, id).length) {
      return { ok: false, message: `請先收回後續技能「${blockers(points, id).map(dep => skills.get(dep).title).join('、')}」的點數。` };
    }
    const result = { ...points };
    if (next === 0) delete result[id];
    else result[id] = next;
    return { ok: true, points: result };
  }

  function validatePoints(points) {
    if (!points || typeof points !== 'object' || Array.isArray(points)) throw new Error('進度格式不正確。');
    const result = {};
    for (const [id, amount] of Object.entries(points)) {
      const skill = skills.get(id);
      if (!skill) throw new Error(`備份包含未知技能：${id}`);
      if (!Number.isInteger(amount) || amount < 0 || amount > skill.hours) throw new Error(`「${skill.title}」的時數必須是 0–${skill.hours} 的整數。`);
      if (amount > 0) result[id] = amount;
    }
    for (const id of Object.keys(result)) {
      if (!unlocked(result, id)) throw new Error(`「${skills.get(id).title}」缺少已完成的先備技能。`);
    }
    return result;
  }

  function summary(points, branch) {
    const list = curriculum.skills.filter(skill => !branch || skill.branch === branch);
    return {
      hours: list.reduce((sum, skill) => sum + value(points, skill.id), 0),
      total: list.reduce((sum, skill) => sum + skill.hours, 0),
      completed: list.filter(skill => value(points, skill.id) === skill.hours).length,
      available: list.filter(skill => unlocked(points, skill.id) && value(points, skill.id) < skill.hours).length,
      count: list.length,
    };
  }
  return { skills, dependents, value, unlocked, blockers, change, validatePoints, summary };
}
