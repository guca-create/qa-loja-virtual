# Roteiro de exploração

Checklist de trabalho (não é entrega). Para cada item: anote o que aconteceu em `docs/planejamento.md` (seção Descobertas) e salve a evidência em `docs/evidencias/`.

Use o Chrome com o DevTools aberto (F12, aba **Network**). Para a API, use `curl -i` no cmd: o `-i` mostra o status HTTP e os cabeçalhos, que servem de evidência.

## Frente 1: carrinho de visitante

- [ ] Adicionar o mesmo produto 2 vezes: a quantidade soma ou duplica a linha?
- [ ] Quantidade na página do produto: `0`, `-1`, `1.5`, vazio, `e`, `99999`. O que entra no carrinho?
- [ ] O total da linha é sempre preço × quantidade?
- [ ] Existe total geral no carrinho, ou só no checkout?
- [ ] Dá para alterar a quantidade dentro do carrinho?
- [ ] Remover um item: some? Volta ao recarregar a página (F5)?
- [ ] Remover o último item: aparece a mensagem de carrinho vazio?
- [ ] O carrinho continua após fechar e reabrir o navegador?
- [ ] Adicionar pela lista de produtos e pela página de detalhe dá o mesmo resultado?
- [ ] Carrinho em duas abas ao mesmo tempo: remover em uma reflete na outra?
- [ ] Visitante com itens no carrinho faz login: o carrinho é mantido?

## Frente 2: catálogo e busca (tela x API)

- [ ] Quantos produtos a tela `/products` mostra? E a API `productsList`?
- [ ] A API pula IDs (9, 10, 17...). Abra `/product_details/9` na tela: o produto existe?
- [ ] Nome, preço, marca e categoria batem entre tela e API? (confira 3 ou 4 produtos)
- [ ] Marcas: a lateral da tela mostra contagens, como "POLO (6)". Batem com a API?
- [ ] Busque na tela e na API os mesmos termos e compare a quantidade de resultados:
  `top`, `TOP`, ` top `, `tshirt`, `t-shirt`, `jean`, `dress`, `Polo` (marca), `Women` (categoria), termo inexistente, vazio, `%`, `<b>teste</b>`.
- [ ] `curl -i -X POST https://automationexercise.com/api/productsList`: qual o status HTTP e qual o `responseCode` no corpo?
- [ ] `searchProduct` com GET em vez de POST.

## Frente 3: API de conta

- [ ] O status HTTP é igual ao `responseCode` do corpo? (compare em sucesso e em erro)
- [ ] Qual o `Content-Type` das respostas?
- [ ] `getUserDetailByEmail` sem senha: quais dados pessoais retorna? Retorna a senha?
- [ ] `createAccount` com: e-mail inválido (`abc`), e-mail já usado, campos faltando, senha vazia, `birth_date=32`, `birth_month=13`, nome com 500 caracteres.
- [ ] `updateAccount` com senha errada. Dá para trocar o e-mail da conta?
- [ ] `deleteAccount` com senha errada, e com GET/POST em vez de DELETE.
- [ ] `verifyLogin` com o e-mail em maiúsculas.
- [ ] Conta criada pela tela aparece na API, e o contrário também?

## Frente 4: compra de ponta a ponta

- [ ] Conta criada pela API consegue entrar pela tela? Aparece "Logged in as <nome>"?
- [ ] O endereço do checkout é igual ao enviado na API?
- [ ] O "Total Amount" é a soma das linhas, com os preços da API?
- [ ] Pagamento com cartão com letras, mês `13`, ano `2000`, CVC vazio: aceita?
- [ ] Depois da compra: o carrinho esvazia? Existe histórico de pedidos?
- [ ] O total da fatura (Download Invoice) bate com o checkout?
- [ ] Voltar (botão do navegador) depois de pagar e pagar de novo: gera outro pedido?

## Lembretes

- Toda conta criada à mão: nome `QA_guilherme_...`, e-mail `qa_guilherme_<número>@example.com`.
- Apague as contas que criar à mão (pela tela "Delete Account" ou pela API).
