import BasePage from './BasePage';

class CheckoutPage extends BasePage {
  el = {
    enderecoEntrega: () => cy.get('#address_delivery'),
    enderecoCobranca: () => cy.get('#address_invoice'),
    totalGeral: () => cy.contains('tr', 'Total Amount').find('.cart_total_price'),
    comentario: () => cy.get('textarea[name="message"]'),
    fazerPedido: () => cy.get('a[href="/payment"]'),
  };

  fazerPedido(comentario = 'Pedido de teste QA') {
    this.el.comentario().type(comentario);
    this.el.fazerPedido().click();
  }
}

export default new CheckoutPage();
