export function getLocalStorageData(key: string) {
  const data = localStorage.getItem(key);

  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
}

export function setLocalStorageData(key: string, data: any) {
  const value = JSON.stringify(data);
  return localStorage.setItem(key, value);
}
