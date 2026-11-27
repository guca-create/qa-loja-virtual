Roteiro de exploração

Checklist de trabalho (não é entrega). Para cada item: anote o que aconteceu em docs/planejamento.md (seção Descobertas) e salve a evidência em docs/evidencias/.

Use o Chrome com o DevTools aberto (F12, aba Network). Para a API, use curl -i no cmd: o -i mostra o status HTTP e os cabeçalhos, que servem de evidência.

Legenda: [x] executado, com resultado registrado (descoberta, observação, evidência ou teste automatizado). [ ] não executado ou sem registro: fica como pendência, com o motivo.

Frente 1: carrinho de visitante
[x] Adicionar o mesmo produto 2 vezes: a quantidade soma ou duplica a linha?

Soma. Uma única linha com quantidade 2 e total Rs. 1000 (Blue Top, Rs. 500 x 2). D01, evidência C1-mesmo-produto-2x.png.

[x] Quantidade na página do produto: 0, -1, 1.5, vazio, e, 99999. O que entra no carrinho?

Parcial. 0: aceito, mostra "Added!" e o produto entra no carrinho (D26, OBS-006, alta; evidência C2-quantidade-zero-aceita.png; falha esperada em carrinho/quantidade.cy.js). -1, 1.5, vazio, e e 99999: não executados. Ficaram no cenário manual CT-C08, que depende da resposta da P11 (quantidade máxima por item).

[x] O total da linha é sempre preço × quantidade?

Sim para 1, 2, 5 e 10 unidades. Teste data-driven carrinho/quantidade.cy.js, com preço vindo da API. Evidência manual em C1-mesmo-produto-2x.png.

[x] Existe total geral no carrinho, ou só no checkout?

Só no checkout. O carrinho mostra apenas o total de cada linha (C1-mesmo-produto-2x.png). O "Total Amount" aparece no checkout e é conferido em compra/compra-ponta-a-ponta.cy.js.

[x] Dá para alterar a quantidade dentro do carrinho?

Não. A quantidade é um botão desativado, sem + ou -. Para reduzir, só removendo a linha. D06, OBS-009, evidência C6-quantidade-nao-editavel.png. Depende da P02.

[x] Remover um item: some? Volta ao recarregar a página (F5)?

Some e não volta. O outro item permanece e a remoção persiste após recarregar. Automatizado em carrinho/remover.cy.js.

[x] Remover o último item: aparece a mensagem de carrinho vazio?

Sim, aparece "Cart is empty". Automatizado em carrinho/remover.cy.js.

[x] O carrinho continua após fechar e reabrir o navegador?

Sim. Os itens adicionados como visitante continuaram no carrinho depois de fechar e reabrir o Chrome. Teste manual.

[x] Adicionar pela lista de produtos e pela página de detalhe dá o mesmo resultado?

Não exatamente. Pela lista não há campo de quantidade e sempre entra 1 unidade. Pela página do produto dá para escolher. D02, OBS-016, evidência C1-lista-sem-quantidade.png. Depende da P01.

[x] Carrinho em duas abas ao mesmo tempo: remover em uma reflete na outra?

Não. Com o carrinho aberto em duas abas, o item removido na primeira continuou aparecendo na segunda mesmo depois do F5. Teste manual. Divergência de estado entre abas: candidato a nova observação (Bug, Carrinho), com causa a confirmar (cache da página ou sessão). Repetir uma vez para confirmar e salvar o print.

[x] Visitante com itens no carrinho faz login: o carrinho é mantido?

Sim. Depois do login, os itens adicionados como visitante continuaram no carrinho. Teste manual. Isso responde na prática o comportamento da P04: a premissa PR08 ("o carrinho não precisa sobreviver ao login") pode ser atualizada para refletir que o sistema mantém o carrinho. Relacionado: visitante que clica em "Proceed To Checkout" recebe aviso exigindo login, sem X para fechar (D11, OBS-016, C7-checkout-exige-login.png).

Frente 2: catálogo e busca (tela x API)
[x] Quantos produtos a tela /products mostra? E a API productsList?

34 nas duas. A tela mostra exatamente os mesmos produtos da API: teste catalogo/catalogo-tela-x-api.cy.js (smoke) e D04.

[x] A API pula IDs (9, 10, 17...). Abra /product_details/9 na tela: o produto existe?

Parcial. Testado com o ID 9999 (inexistente na API): a página abre "vazia", com imagem quebrada, mas com "NEW", avaliação, "In Stock" e Add to cart. D23, OBS-005, evidência K1-produto-inexistente.png; falha esperada automatizada (maior ID da API + 1000). O ID 9 especificamente não foi registrado. Pendente confirmar se o mesmo comportamento ocorre nos IDs pulados.

[x] Nome, preço, marca e categoria batem entre tela e API? (confira 3 ou 4 produtos)

Nome: bate na lista principal (teste automatizado). Diverge no "Recommended Items": o produto 3 aparece como "Rs. 1000" em vez de "Sleeveless Dress", confirmado no HTML do servidor (D09, OBS-004, K0-recomendados-sem-nome.png).
Preço: bate no carrinho e no checkout (carrinho/adicionar-produto.cy.js, compra-ponta-a-ponta.cy.js). Marca e categoria na página de detalhe: sem registro específico. A API foi validada por estrutura (estrutura.cy.js). Extra: nomes sem padrão (T-shirt escrito de 4 jeitos, um nome todo em maiúsculas), D16, OBS-015.

[x] Marcas: a lateral da tela mostra contagens, como "POLO (6)". Batem com a API?

Sim. As 8 marcas batem com a API (34 produtos): POLO 6, H&M 5, MADAME 5, MAST & HARBOUR 3, BABYHUG 4, ALLEN SOLLY JUNIOR 3, KOOKIE KIDS 3, BIBA 5. D04, evidência K0-marcas.png, teste automatizado em catalogo-tela-x-api.cy.js.

[x] Busque na tela e na API os mesmos termos e compare a quantidade de resultados: top, TOP, top, tshirt, t-shirt, jean, dress, Polo (marca), Women (categoria), termo inexistente, vazio, %, <b>teste</b>.

Parcial. Automatizados em catalogo/busca-tela-x-api.cy.js (tela x API, resultado esperado vindo da API): top, TOP, tshirt, t-shirt, jean, dress, Polo, Women e um termo inexistente. A comparação é por lista de nomes, não só por quantidade. Não executados: top (com espaços), vazio, % e <b>teste</b>. Pendentes. (O searchProduct sem parâmetro foi coberto na API: responseCode 400, caso API-06.)

[x] curl -i -X POST https://automationexercise.com/api/productsList: qual o status HTTP e qual o responseCode no corpo?

HTTP 200, responseCode 405 no corpo. Caso API-02 em api-conta/contrato-status.cy.js; a divergência é a OBS-003.

[ ] searchProduct com GET em vez de POST.

Não executado. Não está entre os casos de contrato-status.cy.js. Pela documentação oficial o esperado é responseCode 405 (e, pelo padrão da OBS-003, provavelmente HTTP 200). Pendente confirmar.

Frente 3: API de conta
[x] O status HTTP é igual ao responseCode do corpo? (compare em sucesso e em erro)

Não. O HTTP é sempre 200. Em erro: verifyLogin com conta apagada devolve HTTP 200 com corpo 404 (D05, A0-status-200-com-erro-404.png). Em sucesso: createAccount devolve HTTP 200 com corpo 201 (D20, A2-criar-conta-status-200-corpo-201.png). OBS-003, com 7 casos de falha esperada em contrato-status.cy.js (400, 404 e 405).

[x] Qual o Content-Type das respostas?

text/html; charset=utf-8, embora o corpo seja JSON. D18, OBS-012, evidência A3-dados-pessoais-sem-senha.png; falha esperada em estrutura.cy.js.

[x] getUserDetailByEmail sem senha: quais dados pessoais retorna? Retorna a senha?

Retorna ID interno, nome, e-mail, título, data de nascimento (dia, mês, ano), nome e sobrenome, empresa, endereço 1 e 2, país, estado, cidade e CEP, com HTTP 200 e sem nenhuma autenticação. Não retorna a senha (conferido em estrutura.cy.js). D17, OBS-001 (crítica), A3-dados-pessoais-sem-senha.png; falha esperada em seguranca-dados.cy.js. Extra: birth_date enviado volta como birth_day, e mobile_number não volta (D19, OBS-012).

[x] createAccount com: e-mail inválido (abc), e-mail já usado, campos faltando, senha vazia, birth_date=32, birth_month=13, nome com 500 caracteres.

Parcial. E-mail já usado: recusado com responseCode 400 e mensagem "already exists" (seguranca-dados.cy.js). Não executados: e-mail abc, campos faltando, senha vazia, birth_date=32, birth_month=13 e nome com 500 caracteres. Pendentes.

[ ] updateAccount com senha errada. Dá para trocar o e-mail da conta?

Não executado. Só o caminho feliz foi testado: atualização da cidade com a senha certa, conferida na consulta seguinte (ciclo-de-vida.cy.js). Pendente.

[x] deleteAccount com senha errada, e com GET/POST em vez de DELETE.

Parcial. Senha errada: recusada (responseCode 404) e a conta continua existindo (seguranca-dados.cy.js). GET/POST em vez de DELETE: não executados. Pendente. Relacionado: pela tela, "Delete Account" apaga a conta na hora, sem confirmação (D14, OBS-014, A0-apagar-conta-sem-confirmacao.png).

[ ] verifyLogin com o e-mail em maiúsculas.

Não executado. Pendente.

[x] Conta criada pela tela aparece na API, e o contrário também?

Parcial. API → tela: sim, a conta criada pela API entra pela tela e mostra "Logged in as <nome>" (compra-ponta-a-ponta.cy.js). Tela → API: sem registro. O cadastro pela tela só foi explorado manualmente (ver DECISOES.md). Pendente.

Frente 4: compra de ponta a ponta
[x] Conta criada pela API consegue entrar pela tela? Aparece "Logged in as <nome>"?

Sim. Automatizado em compra/compra-ponta-a-ponta.cy.js (smoke). Observação: clicar em "Logged in as" não abre nada, não existe área de perfil (D21, OBS-011, P0-sem-area-de-perfil.png).

[x] O endereço do checkout é igual ao enviado na API?

Sim para nome e sobrenome, endereço, cidade, CEP e país (compra-ponta-a-ponta.cy.js). Em conta criada pela tela sem título (Mr/Mrs), o nome aparece como ". pedro" no endereço de entrega e de cobrança (D15, OBS-008, P1-nome-com-ponto-no-endereco.png). Além disso, o Brasil não está entre os 7 países do cadastro (D13, OBS-007, P0-cadastro-sem-brasil.png).

[x] O "Total Amount" é a soma das linhas, com os preços da API?

Sim. Compra de 2 produtos sorteados; o total do checkout é igual à soma dos preços da API (compra-ponta-a-ponta.cy.js).

[x] Pagamento com cartão com letras, mês 13, ano 2000, CVC vazio: aceita?

Aceita e confirma o pedido ("Order Placed!"). Letras no número, CVC e validade: D24, OBS-002 (crítica), P2-pagamento-aceita-letras.png. Número com letras, CVC com letras, mês 13 e ano 2000: falha esperada data-driven em compra/pagamento-invalido.cy.js. CVC vazio: não executado. Pendente.

[x] Depois da compra: o carrinho esvazia? Existe histórico de pedidos?

O carrinho esvazia (compra-ponta-a-ponta.cy.js). Não existe histórico de pedidos nem área do cliente (D21, OBS-011).

[x] O total da fatura (Download Invoice) bate com o checkout?

Sim, o valor bate (conferido na automação). Mas a fatura é um .txt com uma frase só, sem itens, data nem número do pedido, e o valor é o mesmo número da URL /payment_done/<valor> (D25, OBS-010, P3-fatura-incompleta.png). A possibilidade de manipular o valor pela URL ficou a investigar (CT-P06).

[x] Voltar (botão do navegador) depois de pagar e pagar de novo: gera outro pedido?

Não. Ao voltar para a tela de pagamento e pagar de novo, a confirmação "Order Placed!" não apareceu novamente. Teste manual. Limitação: sem histórico de pedidos (OBS-011), não dá para confirmar pela tela que nenhum pedido extra foi gravado no servidor.

Lembretes
Toda conta criada à mão: nome QA_guilherme_..., e-mail qa_guilherme_<número>@example.com.
Apague as contas que criar à mão (pela tela "Delete Account" ou pela API).
Resumo
Frente	Itens	Executados	Parciais	Não executados
1. Carrinho de visitante	11	10	1	0
2. Catálogo e busca	7	3	3	1
3. API de conta	8	3	3	2
4. Compra de ponta a ponta	7	6	1	0
Total	33	22	8	3

Pendências prioritárias (maior risco entre o que não foi executado):

Itens de API ainda não executados: searchProduct com GET, updateAccount com senha errada (e troca de e-mail) e verifyLogin com o e-mail em maiúsculas.

Abrir /payment_done/<valor> sem compra (CT-P06, possível manipulação do valor da fatura).
updateAccount com senha errada e troca de e-mail (sequestro de conta).
Confirmar a divergência do carrinho em duas abas, registrar a evidência e abrir a observação.
Quantidades -1, 1.5, e e 99999 no carrinho (total do pedido, CT-C08).
createAccount com dados inválidos (e-mail abc, data 32/13, nome com 500 caracteres).
Busca com %, <b>teste</b>, vazio e espaços (comportamento inesperado e injeção de HTML).
