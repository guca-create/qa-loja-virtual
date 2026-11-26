export default class BasePage {
  visitar(caminho = '/') {
    cy.visit(caminho);
  }

  usuarioLogado() {
    return cy.contains('a', 'Logged in as');
  }
}
