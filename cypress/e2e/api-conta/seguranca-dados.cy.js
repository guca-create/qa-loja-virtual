import { detalheUsuario, apagarConta, criarConta } from '../../support/api/lojaApi';
import { criarUsuario } from '../../support/factories/usuarioFactory';

describe('API de conta - regras e dados pessoais', { tags: ['@api', '@regressao'] }, () => {
  it('não permite criar duas contas com o mesmo e-mail', () => {
    const usuario = criarUsuario();
    cy.criarContaViaApi(usuario);
    criarConta(usuario).then((r) => {
      expect(r.json.responseCode).to.eq(400);
      expect(r.json.message).to.match(/already exists/i);
    });
  });

  it('não apaga a conta com a senha errada', () => {
    const usuario = criarUsuario();
    cy.criarContaViaApi(usuario);
    apagarConta({ email: usuario.email, password: 'senha-errada' }).then((r) => {
      expect(r.json.responseCode).to.eq(404);
    });
    detalheUsuario(usuario.email).its('json.responseCode').should('eq', 200);
  });

  it('[FALHA ESPERADA][OBS-001] consulta de dados pessoais sem autenticação deve ser recusada', { tags: ['@bug-conhecido', '@smoke'] }, () => {
    const usuario = criarUsuario();
    cy.criarContaViaApi(usuario);

    // Só o e-mail, sem senha ou token: qualquer pessoa poderia fazer esta chamada.
    detalheUsuario(usuario.email).then((r) => {
      expect(r.json.responseCode, 'deveria exigir autenticação (401/403)').to.be.oneOf([401, 403]);
      expect(r.json, 'não deveria devolver dados pessoais').to.not.have.property('user');
    });
  });
});
