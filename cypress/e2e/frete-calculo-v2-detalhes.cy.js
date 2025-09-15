describe('Testes da API Frete Cálculo V3 Detalhes', () => {
  context('Quando o CEP é válido', () => {
    it('Deve retornar os principais dados do frete', () => {
      cy.deveRetornarOsPrincipaisDadosDaEntrega();
    });
  });
});