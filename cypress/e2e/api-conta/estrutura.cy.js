import { listarProdutos, listarMarcas, detalheUsuario } from '../../support/api/lojaApi';
import { criarUsuario } from '../../support/factories/usuarioFactory';

const CAMPOS_USUARIO = ['id', 'name', 'email', 'title', 'birth_day', 'birth_month', 'birth_year',
  'first_name', 'last_name', 'company', 'address1', 'address2', 'country', 'state', 'city', 'zipcode'];

describe('API - estrutura das respostas', { tags: ['@api', '@regressao'] }, () => {
  it('productsList: todo produto tem id, nome, preço "Rs. N", marca e categoria', { tags: ['@smoke'] }, () => {
    listarProdutos().then((r) => {
      expect(r.json.products).to.be.an('array').and.not.be.empty;
      r.json.products.forEach((p) => {
        expect(p.id, `id do produto ${p.name}`).to.be.a('number');
        expect(p.name).to.be.a('string').and.not.be.empty;
        expect(p.price, `preço de ${p.name}`).to.match(/^Rs\. \d+$/);
        expect(p.brand).to.be.a('string').and.not.be.empty;
        expect(p.category.category).to.be.a('string');
        expect(p.category.usertype.usertype).to.be.a('string');
      });
    });
  });

  it('brandsList: toda marca usada nos produtos existe na lista de marcas', () => {
    listarMarcas().then((rm) => {
      const marcas = rm.json.brands.map((b) => b.brand);
      listarProdutos().then((rp) => {
        const usadas = [...new Set(rp.json.products.map((p) => p.brand))];
        expect(usadas.filter((m) => !marcas.includes(m)), 'marcas sem cadastro').to.deep.eq([]);
      });
    });
  });

  it('getUserDetailByEmail: devolve os campos do usuário e nunca a senha', () => {
    const usuario = criarUsuario();
    cy.criarContaViaApi(usuario);
    detalheUsuario(usuario.email).then((r) => {
      expect(r.json.responseCode).to.eq(200);
      expect(r.json.user).to.include.all.keys(...CAMPOS_USUARIO);
      expect(r.json.user, 'senha nunca deve voltar').to.not.have.any.keys('password');
      expect(r.json.user.email).to.eq(usuario.email);
    });
  });

  it('[FALHA ESPERADA][OBS-012] Content-Type deve ser application/json', { tags: ['@bug-conhecido'] }, () => {
    listarProdutos().then((r) => {
      expect(r.headers['content-type']).to.include('application/json');
    });
  });

  it('[FALHA ESPERADA][OBS-012] dados enviados no cadastro devem voltar na consulta (mobile_number, birth_date)', { tags: ['@bug-conhecido'] }, () => {
    const usuario = criarUsuario();
    cy.criarContaViaApi(usuario);
    detalheUsuario(usuario.email).then((r) => {
      expect(r.json.user).to.have.property('mobile_number', usuario.mobile_number);
      expect(r.json.user).to.have.property('birth_date', usuario.birth_date);
    });
  });
});
