/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe("Blog app", function () {
  beforeEach(function () {
    const user0 = {
      name: "Berlin Tegel",
      username: "germany",
      password: "Flughafen",
    }
    const user1 = {
      name: "London Heathrow",
      username: "united_kingdom",
      password: "Airport",
    }

    cy.wait(400)
    cy.request("POST", "http://localhost:3003/api/testing/reset")
      .then((r) => {
        cy.request("POST", "http://localhost:3003/api/users", user0)
      })
      .then((r) => {
        cy.request("POST", "http://localhost:3003/api/users", user1)
      })
      .then((r) => {
        cy.log("RESET OK")
        cy.visit("http://localhost:3000")
      })
  })

  it("Login form is shown", function () {
    cy.contains("Username")
    cy.contains("Password")
  })

  describe("Login", function () {
    it("succeeds with correct credentials.", function () {
      cy.get("#username").type("germany")
      cy.get("#password").type("Flughafen")
      cy.get("#login-button").click()
      cy.contains("Logged in as Berlin Tegel")
    })

    it("fails with wrong credentials.", function () {
      cy.get("#username").type("germany")
      cy.get("#password").type("wrong")
      cy.get("#login-button").click()
      cy.get(".notification")
        .should("contain", "Wrong username or password")
        .should("have.css", "background-color", "rgb(255, 184, 207)")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "germany", password: "Flughafen" })
    })

    it("a blog can be created.", function () {
      cy.get("#show-button").should("contain", "New blog").click()
      cy.get("#title").type("I Love Cypress")
      cy.get("#author").type("CypressLover")
      cy.get("#url").type("cypress.com")
      cy.get("#add-button").click()
      cy.contains("I Love Cypress")
    })

    describe("and there is a blog,", function () {
      beforeEach(function () {
        cy.log("TRYING TO CREATE")
        cy.createBlog(0)
        cy.log("CREATED")
      })

      it("the blog is visible.", function () {
        cy.contains("Writing tests sucks")
      })

      it("the blog can be expanded.", function () {
        cy.get("#view-blog-button").contains("View").click()
        cy.contains("Added by")
      })

      it("the blog can be liked.", function () {
        cy.get("#view-blog-button").contains("View").click()
        cy.contains("2 likes")
        cy.get("#like-button").contains("Like").click()
        cy.contains("3 likes")
      })

      it("adder can delete the blog.", function () {
        cy.get("#view-blog-button").contains("View").click()
        cy.get("#delete-blog-button").click()
        cy.root().should("not.contain", "Writing")
      })

      it("non-adder does not have a delete button.", function () {
        cy.get("#log-out-button").click()
        cy.login({
          username: "united_kingdom",
          password: "Airport",
        })
        cy.get("#view-blog-button").contains("View").click()
        cy.should("not.contain", "Delete")
      })

      it("they are sorted.", function () {
        cy.createBlog(1)
        cy.createBlog(2)
        cy.contains("View").click()
        cy.contains("View").click()
        cy.contains("View").click()
        cy.get(".blog").eq(0).contains("3 likes")
        cy.get(".blog").eq(1).contains("2 likes")
        cy.get(".blog").eq(2).contains("1 likes")
        cy.contains("duck.com")
          .parent()
          .find("#like-button")
          .click()
          .parent()
          .contains("2 likes")
          .find("#like-button")
          .click()
          .parent()
          .contains("3 likes")
          .find("#like-button")
          .click()
          .parent()
          .contains("4 likes")
        cy.get(".blog").eq(0).contains("4 likes")
        cy.get(".blog").eq(1).contains("3 likes")
        cy.get(".blog").eq(2).contains("2 likes")
      })
    })
  })
})
