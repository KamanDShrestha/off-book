export default function getFromLocalStorage(key) {
  const storedItem = localStorage.getItem(key);
  if (storedItem === 'undefined' || storedItem === null) {
    return;
  }

  return JSON.parse(localStorage.getItem(key));
}
