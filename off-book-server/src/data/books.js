const books = [
  {
    isbn: '9781593275846',
    title: 'Circle of Women',
    imageLink:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1683735261i/62919732.jpg',
    author: 'Lisa See',
    published: 'June 6, 2023',
    publisher: "O'Reilly Media",
    pages: 472,
    genre: 'Mystery',
    description:
      "How might a woman like Yunxian break free of these traditions, go on to treat women and girls from every level of society, and lead a life of such importance that many of her remedies are still used five centuries later? How might the power of friendship support or complicate these efforts? Lady Tan's Circle of Women is a captivating story of women helping other women. It is also a triumphant reimagining of the life of a woman who was remarkable in the Ming dynasty and would be considered remarkable today.",
    website:
      'http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/',
  },
  {
    isbn: '9781449331818',
    title: 'The Spectacular',
    imageLink:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1668531985i/62588481.jpg',
    author: 'Fiona Davis',
    published: 'June 13, 2023',
    publisher: "O'Reilly Media",
    pages: 200,
    genre: 'Mystery',
    description:
      'New York City, 1956: Nineteen-year-old Marion is over the moon to have been selected to be one of the Rockettes, Radio City Music Hall’s glamorous precision-dancing troupe. It’s an honor to perform in the world’s most spectacular theater, an art deco masterpiece. But with four shows a day as well as grueling rehearsals, not to mention exacting standards of perfection to live up to, Marion quickly realizes that the life of a Rockette has both extraordinary highs and devastating lows.',
    website:
      'http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/',
  },
  {
    isbn: '9781449331818',
    title: 'The Wishing Game',
    imageLink:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1684817680i/62926992.jpg',
    author: 'Meg Shaffer',
    published: 'June 13, 2023',
    publisher: "O'Reilly Media",

    pages: 254,
    genre: 'Thriller',
    description:
      'Years ago, a reclusive mega-bestselling children’s author quit writing under mysterious circumstances. Suddenly he resurfaces with a brand-new book and a one-of-a-kind competition, offering a prize that will change the winner’s life in this absorbing and whimsical novel.',

    website:
      'http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/',
  },
  {
    isbn: '9781491950296',
    title: 'Ink Blood Sister Scribe',
    author: 'Emma Törzs',
    published: 'May 30, 2023',
    imageLink:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1685457125i/62854842.jpg',
    publisher: "O'Reilly Media",
    pages: 254,
    genre: 'Comedy',
    description:
      "In this spellbinding debut novel, two estranged half-sisters tasked with guarding their family's library of magical books must work together to unravel a deadly secret at the heart of their collection--a tale of familial loyalty and betrayal, and the pursuit of magic and power.",
    website: 'http://chimera.labs.oreilly.com/books/1234000000262/index.html',
  },
  {
    isbn: '9781491950296',
    title: 'Angels & Demons',
    author: 'Dan Brown',
    published: 'May 1, 2000',
    imageLink:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1639587647i/960.jpg',
    publisher: "O'Reilly Media",
    pages: 254,
    genre: 'Adventure',
    description:
      'World-renowned Harvard symbologist Robert Langdon is summoned to a Swiss research facility to analyze a cryptic symbol seared into the chest of a murdered physicist. What he discovers is unimaginable: a deadly vendetta against the Catholic Church by a centuries-old underground organization -- the Illuminati. In a desperate race to save the Vatican from a powerful time bomb, Langdon joins forces in Rome with the beautiful and mysterious scientist Vittoria Vetra. Together they embark on a frantic hunt through sealed crypts, dangerous catacombs, and deserted cathedrals, and into the depths of the most secretive vault on earth...the long-forgotten Illuminati lair.',
    website: 'http://chimera.labs.oreilly.com/books/1234000000262/index.html',
  },
  {
    isbn: '9781491904244',
    title: 'Harry Potter and the Philosophers Stone',
    imageLink:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1170803558l/72193.jpg',
    author: 'J.K. Rowling',
    published: 'June 26, 1997',
    publisher: "O'Reilly Media",
    pages: 278,
    genre: 'Adventure',
    description:
      'Harry Potter thinks he is an ordinary boy - until he is rescued by an owl, taken to Hogwarts School of Witchcraft and Wizardry, learns to play Quidditch and does battle in a deadly duel. The Reason ... HARRY POTTER IS A WIZARD!',
    website:
      'https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20&%20beyond',
  },
  {
    isbn: '9781491904244',
    title: 'My Murder',
    imageLink:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1671235474i/62952152.jpg',
    author: 'Katie Williams',
    published: 'June 6, 2023',
    publisher: "O'Reilly Media",
    pages: 278,
    genre: 'Mystery',
    description:
      'Lou is a happily married mother of an adorable toddler. Shes also the victim of a local serial killer. Recently brought back to life and returned to her grieving family by a government project, she is grateful for this second chance. But as the new Lou re-adapts to her old routines, and as she bonds with other female victims, she realizes that disturbing questions remain about what exactly preceded her death and how much she can really trust those around her.',
    website:
      'https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20&%20beyond',
  },
  {
    isbn: '9781491904244',
    title: 'She Started It',
    imageLink:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1667925081i/62292419.jpg',
    author: 'Sian Gilbert',
    published: 'June 13, 2023',
    publisher: "O'Reilly Media",
    pages: 278,
    genre: 'Comedy',
    description:
      'Lou is a happily married mother of an adorable toddler. Shes also the victim of a local serial killer. Recently brought back to life and returned to her grieving family by a government project, she is grateful for this second chance. But as the new Lou re-adapts to her old routines, and as she bonds with other female victims, she realizes that disturbing questions remain about what exactly preceded her death and how much she can really trust those around her.',
    website:
      'https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20&%20beyond',
  },
];

module.exports = books;
