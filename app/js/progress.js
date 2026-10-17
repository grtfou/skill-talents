// 統一儲存結果與提示，避免成功訊息蓋掉失敗警告。
export function saveProgress(persistence, points, successMessage = '') {
  try {
    const data = persistence.write(points);
    return { points, saved: true, updatedAt: data.updatedAt, error: null, message: successMessage };
  } catch (error) {
    return {
      points,
      saved: false,
      error: error.message || '瀏覽器拒絕儲存',
      message: '無法儲存到瀏覽器，請匯出旅程保留本次進度。',
    };
  }
}

// key 為 null 代表 clear()；排除同名 sessionStorage 和其他職業的事件。
export function isProgressStorageEvent(event, localStorage, key) {
  return event.storageArea === localStorage && (event.key === key || event.key === null);
}
