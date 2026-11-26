/**
 * Gera um usuário fictício e único a cada chamada.
 * Nome: QA_<autor>_<id> | E-mail: qa_<autor>_<id>@example.com (domínio reservado para exemplos)
 * Nenhum dado aqui é real: endereço, telefone e empresa são inventados.
 */
let contador = 0;

export function criarUsuario(overrides = {}) {
  const autor = String(Cypress.env('autor') || 'qa').toLowerCase();
  contador += 1;
  const id = `${Date.now()}${contador}${Math.floor(Math.random() * 100)}`;

  return {
    name: `QA_${autor}_${id}`,
    email: `qa_${autor}_${id}@example.com`,
    password: `Qa#${id}`,
    title: 'Mr',
    birth_date: '15',
    birth_month: '5',
    birth_year: '1990',
    firstname: 'QA',
    lastname: `Teste${id}`,
    company: 'Empresa Ficticia QA',
    address1: 'Rua Ficticia 123',
    address2: 'Sala 4',
    country: 'Canada', // precisa ser uma das opções do formulário da tela
    zipcode: '00000',
    state: 'Estado Ficticio',
    city: 'Cidade Ficticia',
    mobile_number: '0000000000',
    ...overrides,
  };
}
