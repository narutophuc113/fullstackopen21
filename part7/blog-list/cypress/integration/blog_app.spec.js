describe('Blogs app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'root',
      username: 'root',
      password: 'root'
    }
    const user1 = {
      name: 'phuc',
      username: 'phuc',
      password: 'phuc'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user1)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.get('button').should('contain', 'login')
  })

  describe('Login', function () {
    it('should succeeds with correct credentials', function () {
      cy.get('input[name="Username"]').type('root')
      cy.get('input[name="Password"]').type('root')
      cy.get('button')
        .should('contain', 'login')
        .click()

      cy.contains('root logged in')
    })

    it('should fail with wront credentials', function () {
      cy.get('input[name="Username"]').type('root')
      cy.get('input[name="Password"]').type('wrong')
      cy.get('button')
        .should('contain', 'login')
        .click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'root logged in')
    })
  })
  describe('when logged in', function () {
    beforeEach(function () {
      cy.login('root', 'root')
    })

    it('should a blog can be create', function () {
      cy.get('#btnCreateBlog').click()

      cy.get('#title').type('The first Blogs test')
      cy.get('#author').type('The First')
      cy.get('#url').type('http://1.com')

      cy.get('button[type="submit"]').click()

      cy.contains('a new blog The first Blogs test The First added')
      cy.contains('The first Blogs test The First')
    })

    describe('and blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'The First Blogs', author: 'The First', url: 'http://1', likes: 5 })
        cy.createBlog({ title: 'The Second Blogs', author: 'The Second', url: 'http://2', likes: 10 })
        cy.createBlog({ title: 'The Third Blogs', author: 'The Third', url: 'http://3' })
      })

      it('should able to like blog', function () {
        cy.contains('The Second Blogs').parent().as('secondBlog')
        cy.get('@secondBlog').contains('button', 'view').click()
        cy.get('@secondBlog').contains('button', 'like').click()
        cy.contains('a blog The Second Blogs The Second updated')
      })

      it('should able to delete blog belong to user', function () {
        cy.contains('The Second Blogs').parent().as('secondBlog')
        cy.get('@secondBlog').contains('button', 'view').click()
        cy.get('@secondBlog').contains('button', 'remove').click()
        cy.contains('a blog deleted')
      })

      it('should not able to delete blog not belong to user', function () {
        cy.contains('logout').click()
        cy.login('phuc', 'phuc')
        cy.contains('The Second Blogs').parent().as('secondBlog')
        cy.get('@secondBlog').contains('button', 'view').click()
        cy.get('@secondBlog').contains('button', 'remove').click()
        cy.contains('Update fail blog not belong to you')
      })

      it.only('should order blog by number of like', function () {
        cy.get('.blog').then(blogs => {
          blogs.map((i, el) => {
            if (i > 0) {
              let previous
              cy.get(`.blog:eq(${i - 1})`).find('span[name="likesNum"]').then((num) => {
                previous = parseInt(num.text())
              })
              cy.get(el).find('span[name="likesNum"]').then(num => {
                const current = parseInt(num.text())
                expect(current).to.lessThan(previous)
              })
            }
          })
        })
      })
    })
  })
})