# QA - Loja Virtual (Automation Exercise)

Avaliação do módulo de loja virtual antes do aceite da entrega do fornecedor, nas frentes **carrinho de visitante**, **catálogo e busca**, **API de conta** e **compra de ponta a ponta**.

Sistema avaliado: https://www.automationexercise.com (tela) e https://automationexercise.com/api_list (API).

## Resumo do diagnóstico

- **18 observações** formais, sendo **2 críticas**: a API devolve dados pessoais sem autenticação (OBS-001) e o pagamento confirma pedidos com dados de cartão inválidos (OBS-002).
- **Não recomendamos o aceite** antes da correção das críticas e das altas (OBS-006, quantidade 0 aceita; OBS-007, Brasil ausente no cadastro).
- Detalhes em [`docs/observacoes/`](docs/observacoes/README.md).

## Onde está cada entrega

| Entrega | Local |
|---|---|
| 1. Planejamento, riscos, perguntas e premissas | [`docs/planejamento.md`](docs/planejamento.md) |
| 2. Cenários e técnicas | [`docs/cenarios.md`](docs/cenarios.md) |
| 3. Automação Cypress | [`cypress/`](cypress/) |
| 4. Testes de API | [`cypress/e2e/api-conta/`](cypress/e2e/api-conta/) e [`docs/api.md`](docs/api.md) |
| 5. Observações e melhorias | [`docs/observacoes/`](docs/observacoes/README.md) |
| 6. Decisões | [`DECISOES.md`](DECISOES.md) |
| 7. Uso de IA | [`docs/uso-de-ia.md`](docs/uso-de-ia.md) |

## Como rodar do zero

Pré-requisitos: [Node.js 18+](https://nodejs.org) e Git.

```bash
git clone https://github.com/guca-create/qa-loja-virtual.git
cd qa-loja-virtual
npm install
npx cypress verify
```

| Comando | O que roda |
|---|---|
| `npm run cy:open` | Cypress interativo |
| `npm run test:smoke` | Testes rápidos (`@smoke`): o que bloqueia um merge |
| `npm run test:regressao` | Tudo, exceto as falhas esperadas |
| `npm run test:api` | Só os testes de API |
| `npm run test:bugs` | Só as falhas esperadas (`@bug-conhecido`): defeitos abertos |

Opcional: `CYPRESS_autor=seunome` muda o nome usado nas contas criadas (padrão: `guilherme`).

Não há credenciais no repositório. Cada teste cria a própria conta com dados fictícios e a apaga ao final, mesmo se falhar.

### Problemas comuns no Windows

**O npm não baixa o Cypress** (aviso `install-scripts ... cypress` no npm 11+): rode `npx cypress install`.

**A instalação trava em "Unzipping Cypress 0%"**: baixe e extraia manualmente pelo cmd:

```
npx cypress cache clear
curl -L -o %USERPROFILE%\Downloads\cypress.zip "https://download.cypress.io/desktop/13.17.0?platform=win32&arch=x64"
mkdir %LOCALAPPDATA%\Cypress\Cache\13.17.0
tar -xf %USERPROFILE%\Downloads\cypress.zip -C %LOCALAPPDATA%\Cypress\Cache\13.17.0
npx cypress verify
```

## Testes automatizados

| Arquivo | O que cobre | Tags |
|---|---|---|
| `carrinho/adicionar-produto.cy.js` | Produto no carrinho igual à API | smoke |
| `carrinho/quantidade.cy.js` | Total = preço x quantidade para 1, 2, 5, 10 (data-driven); quantidade 0 (falha esperada) | regressão, bug-conhecido |
| `carrinho/remover.cy.js` | Remoção, persistência após recarregar e carrinho vazio | regressão |
| `catalogo/catalogo-tela-x-api.cy.js` | Produtos e marcas tela x API; Recommended Items e produto inexistente (falhas esperadas) | smoke, regressão, bug-conhecido |
| `catalogo/busca-tela-x-api.cy.js` | Busca tela x API para 9 termos (data-driven) | regressão |
| `api-conta/ciclo-de-vida.cy.js` | Criar, consultar, entrar, atualizar e apagar | smoke |
| `api-conta/contrato-status.cy.js` | Código e mensagem para 10 combinações (data-driven); status HTTP (falha esperada) | regressão, bug-conhecido |
| `api-conta/estrutura.cy.js` | Estrutura das respostas e senha nunca devolvida; contrato inconsistente (falha esperada) | smoke, regressão, bug-conhecido |
| `api-conta/seguranca-dados.cy.js` | Duplicidade e senha errada; dados pessoais sem autenticação (falha esperada) | regressão, bug-conhecido |
| `compra/compra-ponta-a-ponta.cy.js` | Conta pela API, login, compra, endereço, total, fatura e carrinho vazio | smoke |
| `compra/pagamento-invalido.cy.js` | 4 tipos de cartão inválido (data-driven, falha esperada) | bug-conhecido |

## Estrutura

```
cypress/
  e2e/
    carrinho/       frente 1: carrinho de visitante
    catalogo/       frente 2: catálogo e busca (tela x API)
    api-conta/      frente 3: API de conta
    compra/         frente 4: compra de ponta a ponta
  pages/            Page Objects: seletores e ações de cada tela
  support/
    api/            cliente da API (um método por endpoint)
    factories/      dados fictícios e únicos por execução
    limpeza/        registro de contas criadas para limpeza garantida
    utils/          funções auxiliares (preço, sorteio)
docs/               planejamento, cenários, API, observações, evidências e uso de IA
```

## Convenções

- **Dados vêm da API.** Nenhum ID de produto, preço ou contagem fixos no teste.
- **Contas**: nome `QA_<autor>_<id>`, e-mail `qa_<autor>_<id>@example.com`, criadas pelo comando `cy.criarContaViaApi`.
- **Limpeza garantida**: a conta é registrada antes de ser criada. Um `afterEach` global apaga as pendentes (roda mesmo se o teste falhar), e o evento `after:run` apaga o que sobrar.
- **Isolamento**: `testIsolation` ligado. Cada teste tem sessão e carrinho próprios.
- **Sem espera fixa**: nada de `cy.wait(<ms>)`.
- **Anúncios bloqueados** (`blockHosts`): são de terceiros e deixavam a tela instável.
- **Falha esperada**: título `[FALHA ESPERADA][OBS-XXX]` e tag `@bug-conhecido`. Fica fora da regressão e roda com `npm run test:bugs`.
- **Evidências**: nomes no padrão `<frente><número>-<descrição>.png` (C carrinho, K catálogo, A API, P compra; 0 = exploração livre) e cores com significado fixo. Detalhes em [`docs/evidencias/README.md`](docs/evidencias/README.md).