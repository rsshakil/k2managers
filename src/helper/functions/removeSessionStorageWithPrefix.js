export default function removeSessionStorageWithCertainPrefix(prefixString) {
  Object.keys(sessionStorage)
    .filter((x) => x.startsWith(prefixString))
    .forEach((x) => sessionStorage.removeItem(x));
}
