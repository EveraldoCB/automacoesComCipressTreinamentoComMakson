describe('Teste Site Google', () => {
    beforeEach(() => {
        cy.visit('https://www.google.com/')
    })
    it('Validar a página Google', () => {
        cy.title().should('include', 'Google')
    })
})