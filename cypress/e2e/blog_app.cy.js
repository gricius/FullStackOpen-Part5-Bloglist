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
  }
  )
})