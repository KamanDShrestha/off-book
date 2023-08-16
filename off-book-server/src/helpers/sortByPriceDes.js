function sortByPriceDes(books) {
  return books.sort(
    (firstBook, anotherBook) => anotherBook.price - firstBook.price
  );
}

module.exports = sortByPriceDes;
