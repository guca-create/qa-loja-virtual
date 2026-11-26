# Testes de API

Endpoints: lista oficial em https://automationexercise.com/api_list. Os testes ficam em `cypress/e2e/api-conta/` e rodam com `npm run test:api` (ou pelo `cy:open`).

## Status HTTP x corpo da resposta

A API sempre responde **HTTP 200**, e o resultado real fica no campo `responseCode` do corpo. Coberto em `contrato-status.cy.js`: a primeira suíte confere o corpo (passa), e a segunda confere o status HTTP (falha esperada, OBS-003).

| ID | Método e endpoint | Parâmetros | responseCode esperado (doc. oficial) | Status HTTP obtido |
|---|---|---|---|---|
| API-01 | GET productsList | - | 200 | 200 |
| API-02 | POST productsList | - | 405 | 200 |
| API-03 | GET brandsList | - | 200 | 200 |
| API-04 | PUT brandsList | - | 405 | 200 |
| API-05 | POST searchProduct | search_product=top | 200 | 200 |
| API-06 | POST searchProduct | (sem parâmetro) | 400 | 200 |
| API-07 | POST verifyLogin | só password | 400 | 200 |
| API-08 | DELETE verifyLogin | - | 405 | 200 |
| API-09 | POST verifyLogin | credenciais inexistentes | 404 | 200 ([evidência](evidencias/A0-status-200-com-erro-404.png)) |
| API-10 | GET getUserDetailByEmail | e-mail inexistente | 404 | 200 |
| - | POST createAccount | dados válidos | 201 | 200 ([evidência](evidencias/A2-criar-conta-status-200-corpo-201.png)) |

A coluna "Status HTTP obtido" é confirmada a cada execução pelo relatório do Cypress (`npm run test:bugs`).

## Estrutura das respostas (`estrutura.cy.js`)

- **productsList:** todo produto tem `id` numérico, `name`, `price` no formato `Rs. N`, `brand` e `category.category` / `category.usertype.usertype`.
- **brandsList:** toda marca usada nos produtos existe na lista de marcas.
- **getUserDetailByEmail:** traz os 16 campos do usuário e **nunca** a senha.
- **Falhas esperadas (OBS-012):** Content-Type `text/html` em vez de `application/json`; `birth_date` volta como `birth_day`; `mobile_number` não volta.

## Métodos e parâmetros que não deveriam ser aceitos

Casos API-02, API-04, API-06, API-07 e API-08: o corpo recusa corretamente (405 ou 400), mas o status HTTP continua 200.

## Fluxo encadeado de conta (`ciclo-de-vida.cy.js`)

Criar → entrar (`verifyLogin`) → consultar → atualizar (`updateAccount`, conferido na consulta seguinte) → apagar → entrar de novo (404). A conta é registrada para limpeza **antes** de ser criada, então é apagada mesmo se o teste falhar no meio.

## Regras de conta (`seguranca-dados.cy.js`)

- E-mail duplicado: recusado (400, "already exists").
- Exclusão com senha errada: recusada, e a conta continua existindo.
- **Consulta sem autenticação (OBS-001, crítica):** devolve dados pessoais. Falha esperada.

## Tela x API

| O que compara | Teste | Resultado |
|---|---|---|
| Lista de produtos (/products) x productsList | `catalogo-tela-x-api.cy.js` | Coberto |
| Contagem de marcas da lateral x productsList | `catalogo-tela-x-api.cy.js` | OK (D04) |
| Busca na tela x searchProduct, 9 termos | `busca-tela-x-api.cy.js` | Coberto |
| Recommended Items x productsList | `catalogo-tela-x-api.cy.js` | Diverge (OBS-004) |
| Produto da página de detalhe x carrinho | `carrinho/*.cy.js` | Coberto |
| Endereço do checkout x dados enviados no createAccount | `compra-ponta-a-ponta.cy.js` | Coberto |
| Total do checkout e da fatura x soma dos preços da API | `compra-ponta-a-ponta.cy.js` | Coberto |
