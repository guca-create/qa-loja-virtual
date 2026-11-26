import { criarConta, apagarConta } from './api/lojaApi';

/**
 * Cria a conta pela API e a registra para limpeza automática.
 * O registro acontece ANTES da criação: se algo falhar no meio, o afterEach ainda tenta apagar.
 */
Cypress.Commands.add('criarContaViaApi', (usuario) => {
  cy.task('registrarConta', { email: usuario.email, password: usuario.password });
  return criarConta(usuario).then((r) => {
    expect(r.json && r.json.responseCode, `criar conta: ${r.json && r.json.message}`).to.eq(201);
    return usuario;
  });
});

Cypress.Commands.add('apagarContaViaApi', ({ email, password }) =>
  apagarConta({ email, password }).then((r) => {
    cy.task('removerConta', email);
    return r;
  }));
