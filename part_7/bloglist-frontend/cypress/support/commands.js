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

import blogService from "../../src/services/blogs"

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    username,
    password,
  }).then(({ body }) => {
    window.localStorage.setItem("loggedUser", JSON.stringify(body))
    cy.visit("http://localhost:3000")
  })
})

Cypress.Commands.add("createBlog", (n) => {
  const blogs = [
    {
      title: "Writing tests sucks",
      author: "Artemide",
      url: "http://www.google.com",
      likes: 2,
      user: { name: "Berlin Tegel" },
    },
    {
      title: "No it doesn't, with Cypress",
      author: "Tolomeo",
      url: "http://www.bing.com",
      likes: 3,
      user: { name: "London Heathrow" },
    },
    {
      title: "You're both wrong!",
      author: "Just A Lamp",
      url: "duck.com",
      likes: 1,
      user: { name: "Berlin Tegel" },
    },
  ]
  cy.request({
    url: "http://localhost:3003/api/blogs",
    method: "POST",
    body: blogs[n],
    headers: {
      Authorization: `bearer ${
        JSON.parse(window.localStorage.getItem("loggedUser")).token
      }`,
    },
  }).then((r) => {
    cy.visit("http://localhost:3000")
  })
})
