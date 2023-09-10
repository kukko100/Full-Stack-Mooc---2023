describe("Bloglist app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Kukko Sata",
      username: "kukko100",
      password: "salasana",
      blogs: [],
    };
    const userImpostor = {
      name: "Fake Kukko",
      username: "kukko200",
      password: "salasana",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, userImpostor);
    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.contains("blogs");
  });

  it("login form can be opened", function () {
    cy.contains("log in").click();
  });

  it("user can log in", function () {
    cy.contains("log in").click();
    cy.get("#usernameInput").type("kukko100");
    cy.get("#passwordInput").type("salasana");
    cy.get("#logInButton").click();

    cy.contains("kukko100 logged in");
  });

  it("login fails with wrong password", function () {
    cy.contains("log in").click();
    cy.get("#usernameInput").type("kukko100");
    cy.get("#passwordInput").type("salasana1");
    cy.get("#logInButton").click();

    cy.get(".error")
      .should("contain", "Wrong username or password")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "kukko100 logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "kukko100", password: "salasana" });
    });

    it("a new blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get(".blogFormTitleInput").type("newCypressTitle");
      cy.get(".blogFormAuthorInput").type("newCypressAuthor");
      cy.get(".blogFormUrlInput").type("newCypressUrl");
      cy.get("#createBlogButton").click();
      cy.get(".success").contains(
        "a new blog newCypressTitle by newCypressAuthor added",
      );
    });

    describe("when a blog exists", function () {
      beforeEach(function () {
        const cypressTestAuthor = "newCypressAuthor";
        const cypressTestTitle = "newCypressTitle";
        const cypressTestUrl = "newCypressUrl";
        cy.createBlog({
          author: cypressTestAuthor + 1,
          title: cypressTestTitle + 1,
          url: cypressTestUrl + 1,
        });
        cy.createBlog({
          author: cypressTestAuthor + 2,
          title: cypressTestTitle + 2,
          url: cypressTestUrl + 2,
        });
        cy.createBlog({
          author: cypressTestAuthor + 3,
          title: cypressTestTitle + 3,
          url: cypressTestUrl + 3,
        });
      });

      it("blog can be liked", function () {
        cy.contains("newCypressAuthor1").contains("view").click();
        cy.contains("newCypressAuthor1").contains("like").click();
        cy.contains("newCypressAuthor1")
          .get(".url-likes")
          .get(".numberOfLikes")
          .contains("1");
      });

      it("a blog can be deleted", function () {
        cy.contains("newCypressAuthor1").contains("view").click();
        cy.contains("newCypressAuthor1").contains("Delete").click();
        cy.should("not.contain", "newCypressAuthor1");
      });

      it("the delete button can not be seen by anyone else but the creator", function () {
        cy.contains("newCypressAuthor1").contains("view").click();
        cy.contains("newCypressAuthor1").contains("Delete");

        cy.login({ username: "kukko200", password: "salasana" });
        cy.contains("newCypressAuthor1").contains("view").click();
        cy.contains("newCypressAuthor1").should("not.contain", "Delete");
      });

      it.only("blogs are ordered by the number of likes they have. from top to bottom, most to least", function () {
        cy.get(".blog").eq(0).should("contain", "newCypressAuthor1");
        cy.get(".blog").eq(1).should("contain", "newCypressAuthor2");

        cy.contains("newCypressAuthor2").contains("view").click();
        cy.contains("newCypressAuthor2").contains("like").click();

        cy.visit("");
        cy.get(".blog").eq(0).should("contain", "newCypressAuthor2");
        cy.get(".blog").eq(1).should("contain", "newCypressAuthor1");
        cy.get(".blog").eq(0).should("not.contain", "newCypressAuthor1");
        cy.get(".blog").eq(1).should("not.contain", "newCypressAuthor2");
      });
    });
  });
});
