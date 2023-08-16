function sortByPriceAsc(books) {
  return books.sort(
    (firstBook, anotherBook) => firstBook.price - anotherBook.price
  );
}

module.exports = sortByPriceAsc;
