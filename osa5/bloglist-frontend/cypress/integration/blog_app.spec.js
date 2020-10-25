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
      cy.get('.error')
        .contains('wrong')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function(){
    beforeEach(function() {
      cy.login({ username: 'hellas', password: 'salainen' })
    })

    it('a new blog can be created', function(){
      cy.contains('create new blog').click()
      cy.get('#title').type('A new blog can be created')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('.test')
      cy.get('#createBlog').click()

      cy.contains('A new blog can be created')
    })

    describe('when a blog exists', function(){
      beforeEach(function() {
        cy.createBlog({
          url: '.commands.createBlog',
          title: 'testblog create',
          author: 'Cypress',
          likes: 68
        })
      })

      it('a blog can be liked', function(){
        cy.get('#viewInfo').click()
        cy.get('#likeBlog').click()
        cy.contains('likes 69')
      })

      it('a blog can be deleted', function(){
        cy.get('#viewInfo').click()
        cy.get('#deleteBlog').click()
        cy.get('html').should('not.contain', 'testblog create')
      })
    })
  })
  
})