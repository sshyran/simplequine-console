export function getStorageItem (key) {
  return window.localStorage.getItem(key);
}

export function setStorageItem (key, content) {
  return window.localStorage.setItem(key, content);
}

export function removeStorageItem (key) {
  return window.localStorage.removeItem(key);
}
