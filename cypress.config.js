const { defineConfig } = require('cypress');
const registro = require('./cypress/support/limpeza/registroContas');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    viewportWidth: 1366,
    viewportHeight: 900,
    defaultCommandTimeout: 10000,
    // Cada teste começa com cookies e storage limpos: sessão e carrinho próprios.
    testIsolation: true,
    retries: { runMode: 1, openMode: 0 },
    video: false,
    screenshotOnRunFailure: true,
    // Anúncios de terceiros abrem popups e deixam a tela instável. Não são parte do sistema avaliado.
    blockHosts: [
      '*googlesyndication.com',
      '*doubleclick.net',
      '*googleadservices.com',
      '*google-analytics.com',
      '*googletagmanager.com',
      '*adtrafficquality.google',
      '*fundingchoicesmessages.google.com',
    ],
    env: {
      apiUrl: 'https://automationexercise.com/api',
      autor: 'guilherme', // usado no nome (QA_<autor>_...) e no e-mail das contas criadas
      grepFilterSpecs: true,
      grepOmitFiltered: true,
    },
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);

      on('task', {
        registrarConta: (conta) => registro.registrar(conta),
        removerConta: (email) => registro.remover(email),
        contasPendentes: () => registro.listar(),
      });

      // Rede de segurança: se o processo de algum teste morrer antes do afterEach,
      // as contas que sobraram são apagadas ao final da execução.
      on('after:run', () => registro.limparTudo(config.env.apiUrl));

      return config;
    },
  },
});
