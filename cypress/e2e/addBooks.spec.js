const firstBook = {
  title: "Generation «П»",
  description:
    "Постмодернистский роман российского писателя Виктора Пелевина о поколении россиян, которое взрослело и формировалось во времена политических и экономических реформ 1990-х годов.",
  author: "Виктор Пелевин",
};

const secondBook = {
  title: "Игры, в которые играют люди",
  description:
    "Книга американского психолога и психиатра Эрика Берна, опубликованная в 1964 году, в основе которой лежит его работа, посвящённая трансакционному анализу.",
  author: "Эрик Берн",
};

const thirdBook = {
  title: "Остров сокровищ",
  description:
    "Роман шотландского писателя Роберта Стивенсона о приключениях, связанных с поиском сокровищ, спрятанных капитаном Флинтом на необитаемом острове",
  author: "Роберт Льюис Стивенсон",
};

describe("Favorite book spec", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
  });

  //проверка загрузки главной страницы
  it("Should successfully login", () => {
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  //добавляем первую книгу
  it("Should add first book", () => {
    cy.addBook(firstBook);
    cy.get(".card-title").should("contain.text", firstBook.title);
  });

  //добовляем вторую книгу
  it("Should add second book", () => {
    cy.addBook(thirdBook);
    cy.get(".card-title").should("contain.text", thirdBook.title);
  });

  //добавляем книгу и помечаем как избранное
  it("Should add new book to favorite", () => {
    cy.addFavoriteBook(secondBook);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", secondBook.title);
  });

  //добавлям книгу в избранное из списка имеющихся
  it("Should add book to favorite through 'Book list' page", () => {
    cy.contains(thirdBook.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(thirdBook.title).should("be.visible");
  });

  //удаляем книгу из избранного
  it("Should delete book from favorite", () => {
    cy.visit("/favorites");
    cy.contains(thirdBook.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(thirdBook.title).should("not.exist");
  });

  //удаляем книгу из избранного
  it("Should delete book from favorite", () => {
    cy.visit("/favorites");
    cy.contains(secondBook.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(secondBook.title).should("not.exist");
  });
});
