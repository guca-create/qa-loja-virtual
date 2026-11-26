# Cenários de teste

Execução: **Auto** (automatizado, com o arquivo) ou **Manual** (com o motivo). Os valores esperados dos testes automatizados vêm da API.

## Frente 1: carrinho de visitante
**Técnicas:** partição de equivalência (quantidades válidas x inválidas), valor limite (1 é o menor válido, 0 é o primeiro inválido) e transição de estado (vazio → com itens → item removido → vazio).

| ID | Cenário | Tipo | Prioridade | Execução | Spec / motivo |
|---|---|---|---|---|---|
| CT-C01 | Adicionar 1 produto: nome, preço, quantidade e total iguais aos da API | Positivo | Alta | Auto | `carrinho/adicionar-produto.cy.js` |
| CT-C02 | Quantidades 1, 2, 5 e 10: total = preço x quantidade (data-driven) | Positivo | Alta | Auto | `carrinho/quantidade.cy.js` |
| CT-C03 | Quantidade 0 é recusada | Negativo | Alta | Auto (falha esperada) | `carrinho/quantidade.cy.js` / OBS-006 |
| CT-C04 | Mesmo produto 2 vezes soma a quantidade | Positivo | Média | Manual | Coberto na exploração (D01); baixo risco de regressão |
| CT-C05 | Remover item: o outro permanece e a remoção persiste após recarregar | Positivo | Alta | Auto | `carrinho/remover.cy.js` |
| CT-C06 | Remover o último item mostra carrinho vazio | Positivo | Média | Auto | `carrinho/remover.cy.js` |
| CT-C07 | Alterar quantidade dentro do carrinho | Negativo | Média | Manual | Depende da P02 (OBS-009) |
| CT-C08 | Quantidade negativa e valores altos (99999) | Negativo | Média | Manual | Depende da P11 |
| CT-C09 | Visitante tenta finalizar e recebe pedido de login | Positivo | Média | Manual | D11 |

## Frente 2: catálogo e busca
**Técnicas:** partição de equivalência nos termos de busca (com resultado, sem resultado, maiúsculas, variações de escrita, marca e categoria) e comparação tela x API (oráculo = API).

| ID | Cenário | Tipo | Prioridade | Execução | Spec / motivo |
|---|---|---|---|---|---|
| CT-K01 | A página de produtos mostra exatamente os produtos da API | Positivo | Alta | Auto | `catalogo/catalogo-tela-x-api.cy.js` |
| CT-K02 | Contagem de marcas da lateral igual à API | Positivo | Média | Auto | `catalogo/catalogo-tela-x-api.cy.js` |
| CT-K03 | Busca na tela igual à API para 9 termos (data-driven) | Positivo | Alta | Auto | `catalogo/busca-tela-x-api.cy.js` |
| CT-K04 | Recommended Items com nomes que existem na API | Positivo | Média | Auto (falha esperada) | `catalogo/catalogo-tela-x-api.cy.js` / OBS-004 |
| CT-K05 | Produto inexistente não é exibido como à venda | Negativo | Média | Auto (falha esperada) | `catalogo/catalogo-tela-x-api.cy.js` / OBS-005 |
| CT-K06 | Nomes de produtos seguem um padrão | Positivo | Baixa | Manual | Revisão de conteúdo (OBS-015) |
| CT-K07 | Layout da grade e anúncios | Negativo | Baixa | Manual | Visual; anúncios bloqueados na automação (OBS-013, OBS-018) |

## Frente 3: API de conta
**Técnicas:** tabela de decisão (método x parâmetros x resultado esperado) e transição de estado no ciclo de vida da conta (inexistente → criada → atualizada → apagada).

| ID | Cenário | Tipo | Prioridade | Execução | Spec / motivo |
|---|---|---|---|---|---|
| CT-A01 | Ciclo de vida: criar, consultar, entrar, atualizar e apagar | Positivo | Alta | Auto | `api-conta/ciclo-de-vida.cy.js` |
| CT-A02 | Código e mensagem no corpo para 10 combinações de método e parâmetro (data-driven) | Positivo/Negativo | Alta | Auto | `api-conta/contrato-status.cy.js` |
| CT-A03 | Status HTTP igual ao código do corpo (data-driven) | Negativo | Média | Auto (falha esperada) | `api-conta/contrato-status.cy.js` / OBS-003 |
| CT-A04 | Estrutura de productsList, brandsList e getUserDetailByEmail | Positivo | Alta | Auto | `api-conta/estrutura.cy.js` |
| CT-A05 | A consulta de usuário nunca devolve a senha | Positivo | Alta | Auto | `api-conta/estrutura.cy.js` |
| CT-A06 | E-mail duplicado é recusado | Negativo | Alta | Auto | `api-conta/seguranca-dados.cy.js` |
| CT-A07 | Exclusão com senha errada é recusada | Negativo | Alta | Auto | `api-conta/seguranca-dados.cy.js` |
| CT-A08 | Dados pessoais sem autenticação são recusados | Negativo | Crítica | Auto (falha esperada) | `api-conta/seguranca-dados.cy.js` / OBS-001 |
| CT-A09 | Content-Type JSON e campos enviados voltam na consulta | Positivo | Baixa | Auto (falha esperada) | `api-conta/estrutura.cy.js` / OBS-012 |
| CT-A10 | Exclusão pela tela pede confirmação | Negativo | Média | Manual | Depende da P07 (OBS-014) |
| CT-A11 | Força bruta e injeção na API | Negativo | Alta | Fora | Ambiente público de terceiros: não atacamos, só registramos o risco |

## Frente 4: compra de ponta a ponta
**Técnicas:** caso de uso (fluxo principal de ponta a ponta) e partição de equivalência nos dados do cartão (classes inválidas, com valor limite no mês 13 e ano passado).

| ID | Cenário | Tipo | Prioridade | Execução | Spec / motivo |
|---|---|---|---|---|---|
| CT-P01 | Conta pela API, login pela tela, compra de 2 produtos: endereço, total, confirmação, fatura e carrinho vazio conferem | Positivo | Crítica | Auto | `compra/compra-ponta-a-ponta.cy.js` |
| CT-P02 | Cartão inválido não confirma o pedido (4 casos data-driven) | Negativo | Crítica | Auto (falha esperada) | `compra/pagamento-invalido.cy.js` / OBS-002 |
| CT-P03 | Nome no endereço sem ". " quando não há título | Negativo | Média | Manual | Cadastro só pela tela (OBS-008) |
| CT-P04 | Brasil disponível no cadastro | Positivo | Alta | Manual | Depende da P06 (OBS-007) |
| CT-P05 | Fatura completa (itens, data, número) | Positivo | Média | Manual | Depende de definição do comprovante (OBS-010) |
| CT-P06 | Abrir /payment_done/<valor> sem compra | Negativo | Alta | Manual (a investigar) | Possível manipulação do valor da fatura (OBS-010) |
