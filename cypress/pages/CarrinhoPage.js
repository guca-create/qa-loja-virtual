import BasePage from './BasePage';

class CarrinhoPage extends BasePage {
  el = {
    linhas: () => cy.get('#cart_info_table tbody tr[id^="product-"]'),
    linha: (id) => cy.get(`#product-${id}`),
    nome: (id) => cy.get(`#product-${id} .cart_description h4 a`),
    preco: (id) => cy.get(`#product-${id} .cart_price p`),
    quantidade: (id) => cy.get(`#product-${id} .cart_quantity button`),
    total: (id) => cy.get(`#product-${id} .cart_total_price`),
    remover: (id) => cy.get(`#product-${id} .cart_quantity_delete`),
    vazio: () => cy.get('#empty_cart'),
    checkout: () => cy.contains('a', 'Proceed To Checkout'),
  };

  abrir() {
    this.visitar('/view_cart');
    return this;
  }

  removerProduto(id) {
    this.el.remover(id).click();
    this.el.linha(id).should('not.exist');
    return this;
  }

  irParaCheckout() {
    this.el.checkout().click();
  }
}

export default new CarrinhoPage();
