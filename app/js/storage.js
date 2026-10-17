export const STORAGE_KEY = 'skill-talents:Eng-TOEIC:v1';

export function createStorage(engine, curriculum, storage) {
  function envelope(points) {
    return { schemaVersion: 1, curriculumVersion: curriculum.curriculumVersion, classId: curriculum.id, updatedAt: new Date().toISOString(), points: engine.validatePoints(points) };
  }
  function parse(text) {
    if (typeof text !== 'string' || text.length > 100000) throw new Error('備份過大或格式不正確（上限 100 KB）。');
    let data;
    try { data = JSON.parse(text); } catch { throw new Error('無法讀取 JSON 備份，原有進度未變更。'); }
    if (data?.schemaVersion !== 1 || data.classId !== curriculum.id) throw new Error('此備份的版本或職業不相容。');
    if (data.curriculumVersion !== curriculum.curriculumVersion) throw new Error('此備份的課程版本不相容，請保留備份以便日後轉移。');
    return engine.validatePoints(data.points);
  }
  function read() {
    let raw;
    try {
      raw = storage.getItem(STORAGE_KEY);
      return { points: raw ? parse(raw) : {}, error: null, raw };
    } catch (error) { return { points: {}, error: error.message, raw }; }
  }
  function write(points) {
    const data = envelope(points);
    storage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }
  return { envelope, parse, read, write };
}
