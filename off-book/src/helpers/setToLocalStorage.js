export default function setToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
