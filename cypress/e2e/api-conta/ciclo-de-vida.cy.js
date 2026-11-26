import { criarUsuario } from '../../support/factories/usuarioFactory';
import { verificarLogin, detalheUsuario, atualizarConta, apagarConta } from '../../support/api/lojaApi';

describe('API de conta - ciclo de vida', { tags: ['@api', '@smoke'] }, () => {
  it('cria, consulta, entra, atualiza e apaga uma conta', () => {
    const usuario = criarUsuario();

    // Criar (registrada para limpeza antes de criar)
    cy.criarContaViaApi(usuario);

    // Entrar
    verificarLogin({ email: usuario.email, password: usuario.password }).then((r) => {
      expect(r.json.responseCode).to.eq(200);
      expect(r.json.message).to.eq('User exists!');
    });

    // Consultar
    detalheUsuario(usuario.email).then((r) => {
      expect(r.json.responseCode).to.eq(200);
      expect(r.json.user.email).to.eq(usuario.email);
      expect(r.json.user.name).to.eq(usuario.name);
    });

    // Atualizar
    const novaCidade = `Cidade Atualizada ${Date.now()}`;
    atualizarConta({ ...usuario, city: novaCidade }).then((r) => {
      expect(r.json.responseCode).to.eq(200);
      expect(r.json.message).to.eq('User updated!');
    });
    detalheUsuario(usuario.email).its('json.user.city').should('eq', novaCidade);

    // Apagar
    apagarConta(usuario).then((r) => {
      expect(r.json.responseCode).to.eq(200);
      expect(r.json.message).to.eq('Account deleted!');
      cy.task('removerConta', usuario.email);
    });

    // Conta apagada não entra mais
    verificarLogin({ email: usuario.email, password: usuario.password })
      .its('json.responseCode').should('eq', 404);
  });
});
