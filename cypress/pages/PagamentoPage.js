import BasePage from './BasePage';

class PagamentoPage extends BasePage {
  el = {
    nomeCartao: () => cy.get('[data-qa="name-on-card"]'),
    numeroCartao: () => cy.get('[data-qa="card-number"]'),
    cvc: () => cy.get('[data-qa="cvc"]'),
    mes: () => cy.get('[data-qa="expiry-month"]'),
    ano: () => cy.get('[data-qa="expiry-year"]'),
    pagar: () => cy.get('[data-qa="pay-button"]'),
    pedidoConfirmado: () => cy.get('[data-qa="order-placed"]'),
  };

  // Cartão de teste fictício (número padrão de testes, não é cartão real).
  pagar(cartao = { nome: 'QA TESTE', numero: '4111111111111111', cvc: '123', mes: '12', ano: '2030' }) {
    this.el.nomeCartao().type(cartao.nome);
    this.el.numeroCartao().type(cartao.numero, { log: false });
    this.el.cvc().type(cartao.cvc, { log: false });
    this.el.mes().type(cartao.mes);
    this.el.ano().type(cartao.ano);
    this.el.pagar().click();
  }
}

export default new PagamentoPage();
