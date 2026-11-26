# QA - Loja Virtual (Automation Exercise)

Avaliação do módulo de loja virtual antes do aceite da entrega do fornecedor. O escopo cobre **carrinho de visitante**, **catálogo e busca**, **API de conta** e **compra de ponta a ponta**.

Sistema avaliado: https://www.automationexercise.com (tela) e https://automationexercise.com/api_list (API).

## Onde está cada entrega

| Entrega | Local |
|---|---|
| 1. Planejamento, riscos, perguntas e premissas | [`docs/planejamento.md`](docs/planejamento.md) |
| 2. Cenários e técnicas | [`docs/cenarios.md`](docs/cenarios.md) |
| 3. Automação Cypress | [`cypress/`](cypress/) |
| 4. Testes de API | [`cypress/e2e/api-conta/`](cypress/e2e/api-conta/), [`cypress/e2e/catalogo/`](cypress/e2e/catalogo/) e [`docs/api.md`](docs/api.md) |
| 5. Observações e melhorias | [`docs/observacoes/`](docs/observacoes/) |
| 6. Decisões | [`DECISOES.md`](DECISOES.md) |
| 7. Uso de IA | [`docs/uso-de-ia.md`](docs/uso-de-ia.md) |

## Como rodar do zero

Pré-requisitos: [Node.js 18+](https://nodejs.org) e Git.

```bash
git clone <url-deste-repositorio>
cd qa-loja-virtual
npm install
npx cypress verify
```

| Comando | O que roda |
|---|---|
| `npm run cy:open` | Cypress interativo |
| `npm run test:smoke` | Só os testes rápidos (`@smoke`) |
| `npm run test:regressao` | Tudo, exceto falhas esperadas |
| `npm run test:bugs` | Só as falhas esperadas (`@bug-conhecido`) |

Opcional: `CYPRESS_autor=seunome` muda o nome usado nas contas criadas (padrão: `guilherme`).

Não há credenciais no repositório. Cada teste cria a própria conta com dados fictícios e a apaga ao final.

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
docs/               planejamento, cenários, observações, evidências, uso de IA
```

## Convenções

- **Dados vêm da API.** Nenhum ID de produto, preço ou contagem fixos no teste.
- **Contas**: nome `QA_<autor>_<id>`, e-mail `qa_<autor>_<id>@example.com`, criadas pelo comando `cy.criarContaViaApi`.
- **Limpeza garantida**: a conta é registrada antes de ser criada. Um `afterEach` global apaga as pendentes (roda mesmo se o teste falhar), e o evento `after:run` apaga o que sobrar.
- **Isolamento**: `testIsolation` ligado. Cada teste tem sessão e carrinho próprios.
- **Sem espera fixa**: nada de `cy.wait(<ms>)`.
- **Anúncios bloqueados** (`blockHosts`): são de terceiros e deixavam a tela instável.
- **Tags**: `@smoke`, `@carrinho`, `@catalogo`, `@api`, `@compra`, `@bug-conhecido`.
- **Falha esperada**: título `[FALHA ESPERADA][OBS-XXX]` e tag `@bug-conhecido`. Fica fora da regressão e roda com `npm run test:bugs`.
