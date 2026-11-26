import BasePage from './BasePage';

class LoginPage extends BasePage {
  el = {
    email: () => cy.get('[data-qa="login-email"]'),
    senha: () => cy.get('[data-qa="login-password"]'),
    botao: () => cy.get('[data-qa="login-button"]'),
  };

  entrar({ email, password }) {
    this.visitar('/login');
    this.el.email().type(email);
    this.el.senha().type(password, { log: false });
    this.el.botao().click();
  }
}

export default new LoginPage();
