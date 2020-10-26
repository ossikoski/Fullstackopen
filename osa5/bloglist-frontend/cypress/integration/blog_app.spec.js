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
    it('succeeds with correct credentials', function() {
      cy.get('#usernameInput').type('hellas')
      cy.get('#passwordInput').type('salainen')
      cy.get('#loginButton').click()
      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#usernameInput').type('hellas')
      cy.get('#passwordInput').type('wrong')
      cy.get('#loginButton').click()
      cy.get('.error')
        .contains('wrong')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'hellas', password: 'salainen' })
    })

    it('a new blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('A new blog can be created')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('.test')
      cy.get('#createBlog').click()

      cy.contains('A new blog can be created')
    })

    describe('when a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          url: '.commands.createBlog',
          title: 'testblog create',
          author: 'Cypress',
          likes: 68
        })
      })

      it('a blog can be liked', function() {
        cy.get('#viewInfo').click()
        cy.get('#likeButton').click()
        cy.contains('likes 69')
      })

      it('a blog can be deleted', function() {
        cy.get('#viewInfo').click()
        cy.get('#deleteBlog').click()
        cy.get('html').should('not.contain', 'testblog create')
      })

      it('a blog cant be deleted by user who didnt add it', function() {
        const user = {
          name: 'Another user',
          username: 'another',
          password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.get('#logoutButton').click
        cy.login({ username: 'another', password: 'salainen' })
        cy.get('#viewInfo').click()
        cy.get('html').should('not.contain', '#deleteBlog')
        cy.contains('testblog create')
      })
    })

    describe('a few blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ url: '.com', title: 'testblog2', author: 'Cypress', likes: 2 })
        cy.createBlog({ url: '.com', title: 'testblog1', author: 'Cypress', likes: 1 })
        cy.createBlog({ url: '.com', title: 'testblog3', author: 'Cypress', likes: 3 })
      })

      it.only('Blogs are ordered by likes', function() {
        // Testaa että aluksi ylimpänä on testblog3 kolmella likellä vaikka se on lisätty viimeisenä
        cy.contains('view').parent().contains('testblog3')

        // Etsi testiblog2 ja likeä sitä 2 kertaa -> 4 likeä
        cy.contains('testblog2').as('second').contains('view').click()
        cy.get('@second').parent().contains('like').click()
        cy.get('@second').parent().contains('like').click()
        cy.get('@second').parent().contains('likes 4')
        cy.get('@second').parent().contains('hide').click()
        // Testaa että ylimpänä on testiblog2 kun sillä on 4 likeä
        cy.contains('view').parent().contains('testblog2')

        // Etsi testiblog1 ja likeä sitä 4 kertaa -> 5 likeä
        cy.contains('testblog1').as('first').contains('view').click()
        cy.get('@first').parent().contains('like').click()
        cy.get('@first').parent().contains('like').click()
        cy.get('@first').parent().contains('like').click()
        cy.get('@first').parent().contains('like').click()
        cy.get('@first').parent().contains('likes 5')
        cy.get('@first').parent().contains('hide').click()
        // Testaa että ylimpänä on testiblog1 kun sillä on 5 likeä
        cy.contains('view').parent().contains('testblog1')

      })
    })
  })

  
})