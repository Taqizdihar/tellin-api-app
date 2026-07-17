const HISTORY_KEY = 'tellin_request_history';
const MAX_HISTORY = 50;

export function getHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addHistoryRecord(record) {
  const history = getHistory();
  const newRecord = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    ...record,
  };
  
  const updatedHistory = [newRecord, ...history].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  return updatedHistory;
}

export function deleteHistoryRecord(id) {
  const history = getHistory();
  const updated = history.filter(r => r.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return updated;
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
  return [];
}
