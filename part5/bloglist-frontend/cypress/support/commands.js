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
Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(response => {
    const body = response.body
    localStorage.setItem('userLoggedIn', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
Cypress.Commands.add('createBlog', newBlog => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: newBlog,
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('userLoggedIn')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
