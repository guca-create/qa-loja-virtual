import './commands';
import registerCypressGrep from '@cypress/grep';
import { apagarConta } from './api/lojaApi';

registerCypressGrep();

// Limpeza garantida: o afterEach roda depois de cada teste, passe ou falhe.
afterEach(() => {
  cy.task('contasPendentes').then((contas) => {
    contas.forEach((conta) => {
      apagarConta(conta).then(() => cy.task('removerConta', conta.email));
    });
  });
});

// Ignora só erros de scripts de anúncio de terceiros. Erros da própria loja continuam falhando o teste.
Cypress.on('uncaught:exception', (err) => {
  if (/adsbygoogle|googletag|google_vignette/i.test(err.message)) return false;
  return undefined;
});
