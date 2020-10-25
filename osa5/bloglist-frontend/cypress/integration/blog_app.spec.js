describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Arto Hellas',
      username: 'hellas',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function(){
      cy.get('#usernameInput').type('hellas')
      cy.get('#passwordInput').type('salainen')
      cy.get('#loginButton').click()
      cy.contains('logged in')
    })

    it('fails with wrong credentials', function(){
      cy.get('#usernameInput').type('hellas')
      cy.get('#passwordInput').type('wrong')
      cy.get('#loginButton').click()
      cy.get('.error').contains('wrong').should('have.css', 'color').and('eq', 'rgb(255, 0, 0)')
    })
  })
  
})