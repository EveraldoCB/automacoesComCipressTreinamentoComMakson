// Teste modernizado para Frete Cálculo V3 Detalhes, usando intercept para mockar a resposta

/**
 * Filtro de execução por tags para Cypress sem plugin externo.
 * Use: npx cypress run --env grep=tag1,tag2
 * No modo interativo (cypress open), todos aparecem, mas os pulados mostram aviso no log.
 */
const grep = Cypress.env('grep');
const tags = grep ? grep.split(',').map(t => t.trim()) : [];
function onlyIf(cond, tag) {
  return cond
    ? it
    : function(title, cb) {
        it.skip(title, function() {
          // eslint-disable-next-line no-console
          console.warn(`Teste pulado: tag '${tag}' não está presente em --env grep (${grep || 'nenhuma'})`);
          if (cb) cb();
        });
      };
}

describe('Testes da API Frete Cálculo V3 Detalhes', () => {
  context('Quando o CEP é válido', () => {
    onlyIf(tags.length === 0 || tags.includes('cenariosPositivos'), 'cenariosPositivos')(
      'Deve retornar o tipo de entrega, o prazo, a data e o valor',
      () => {
        cy.deveRetornaroTipoDeEntregaoPrazoaDataeoValor();
      }
    );
  });

  context('Quando o CEP é inválido (vazio)', () => {
    onlyIf(tags.length === 0 || tags.includes('cenariosNegativos'), 'cenariosNegativos')(
      'testeComCampoCepVazio',
      () => {
        cy.testeComCampoCepVazio();
      }
    );
  });
});
