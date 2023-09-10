// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username: username,
    password: password,
  }).then((response) => {
    localStorage.setItem("loggedBlogUser", JSON.stringify(response.body));
    cy.visit("");
  });
});

Cypress.Commands.add("createBlog", ({ author, title, url }) => {
  const userID = JSON.parse(localStorage.getItem("loggedBlogUser")).id;
  cy.request({
    url: `${Cypress.env("BACKEND")}/blogs`,
    method: "POST",
    body: { author, title, url, userID },
    headers: {
      authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedBlogUser")).token
      }`,
    },
  });

  cy.visit("");
});
