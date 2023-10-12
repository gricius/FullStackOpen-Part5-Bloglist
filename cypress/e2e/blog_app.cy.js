describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3003')
  })

  it('Login form is shown', function() {
    cy.get('.login-button').should('exist')
    cy.contains('username')
    cy.contains('password')
  })

  // Make tests for logging in. Test both successful and unsuccessful login attempts.
  // Make a new user in the beforeEach block for the tests.
  // Check that the notification shown with unsuccessful login is displayed red.
  describe('Login',function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'blogtest',
        name: 'Test User',
        password: 'blogpassword'
      })
    })

    it('succeeds with correct credentials', function() {
      cy.contains('.login-button', 'Log in')
      cy.get('.username').type('blogtest')
      cy.get('.password').type('blogpassword')
      cy.get('.login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials with notification wrong credentials in red color', function() {
      cy.contains('.login-button', 'Log in')
      cy.get('.username').type('blogtest')
      cy.get('.password').type('wrong')
      cy.get('.login-button').click()

      cy.get('.error').should('contain', 'wrong credentials').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    // Make a test which checks that a logged in user can create a new blog.
    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'blogtest', password: 'blogpassword' })
      })

      it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('.title').type('test title')
        cy.get('.author').type('test author')
        cy.get('.url').type('test url')
        cy.get('.create-button').click()

        cy.contains('test title')
      })

      // Make a test which checks that a logged in user can like a blog.
      it('A blog can be liked', function() {
        cy.contains('new blog').click()
        cy.get('.title').type('test title')
        cy.get('.author').type('test author')
        cy.get('.url').type('test url')
        cy.get('.create-button').click()
        cy.contains('Show details').click()
        cy.contains('Like').click()
        cy.contains('Likes: 1 ')
      })

      // Make a test for ensuring that the user who created a blog can delete it.
      it('A blog can be deleted by a user who created the blog', function() {
        cy.contains('new blog').click()
        cy.get('.title').type('test title')
        cy.get('.author').type('test author')
        cy.get('.url').type('test url')
        cy.get('.create-button').click()
        cy.contains('Show details').click()
        cy.contains('Remove').click()
        cy.get('html').should('not.contain', 'test title')
      })

      // Make a test that ensures that users cannot delete blogs created by other users.
      it('A blog cannot be deleted by a user who did not create the blog', function() {
        cy.contains('new blog').click()
        cy.get('.title').type('test title')
        cy.get('.author').type('test author')
        cy.get('.url').type('test url')
        cy.get('.create-button').click()
        cy.contains('Logout').click()
        cy.request('POST', 'http://localhost:3003/api/users', {
          username: 'blogtest2',
          name: 'Test User 2',
          password: 'blogpassword2'
        })
        cy.login({ username: 'blogtest2', password: 'blogpassword2' })
        cy.contains('Show details').click()
        cy.get('html').should('not.contain', 'Remove')
      })
    })
  })
})