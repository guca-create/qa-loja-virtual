# Planejamento e dúvidas de negócio

Ambiente: automationexercise.com (público e compartilhado) | Navegador: Chrome 157 | Período: 25/11/2026

## 1. Descobertas da exploração

| # | Frente | O que testei | O que aconteceu | Evidência |
|---|---|---|---|---|
| D01 | Carrinho | Adicionar o mesmo produto 2 vezes pela página do produto | OK: quantidade virou 2 e total Rs. 1000 (500 x 2) | [C1-mesmo-produto-2x.png](evidencias/C1-mesmo-produto-2x.png) |
| D02 | Carrinho | Adicionar pela lista e pela página do produto | Na lista não há campo de quantidade, sempre entra 1. Na página do produto dá para escolher | [C1-lista-sem-quantidade.png](evidencias/C1-lista-sem-quantidade.png) |
| D03 | Catálogo | Rolar a lista de produtos | Cards com alturas diferentes deixam buracos na grade | [K0-grade-desalinhada.png](evidencias/K0-grade-desalinhada.png) |
| D04 | Catálogo | Contagem de marcas da lateral x API productsList | OK: as 8 marcas batem, 34 produtos no total | [K0-marcas.png](evidencias/K0-marcas.png) |
| D05 | API de conta | verifyLogin com conta já apagada (teste automatizado) | HTTP 200, mas o corpo diz responseCode 404 | [A0-status-200-com-erro-404.png](evidencias/A0-status-200-com-erro-404.png) |
| D06 | Carrinho | Alterar a quantidade dentro do carrinho | A quantidade é um botão desativado: clicar não faz nada e não há + ou -. Para reduzir, só removendo a linha inteira | [C6-quantidade-nao-editavel.png](evidencias/C6-quantidade-nao-editavel.png) |
| D07 | Carrinho | Navegar até o carrinho sem bloqueador de anúncio | Anúncio de terceiros em tela cheia cobre o carrinho, muda a URL para #google_vignette e leva para outro site | [C0-anuncio-tela-cheia-carrinho.png](evidencias/C0-anuncio-tela-cheia-carrinho.png) |
| D08 | Catálogo | Navegar pela lista sem bloqueador de anúncio | Banner e popup cobrem botões "Add to cart", e um script de anúncio transforma partes do nome do produto ("Dress", "T-Shirt") em link de propaganda. O nome muda conforme o mouse está ou não sobre o card | [K0-anuncios-cobrem-produtos.png](evidencias/K0-anuncios-cobrem-produtos.png) |
| D09 | Catálogo | Comparar os nomes em "Recommended Items" com a API | O produto 3 aparece com nome "Rs. 1000" em vez de "Sleeveless Dress" (API e lista principal mostram o nome certo). Confirmado no HTML vindo do servidor, então não é efeito de anúncio | [K0-recomendados-sem-nome.png](evidencias/K0-recomendados-sem-nome.png) |
| D10 | Catálogo | Rolar até o fim da página inicial | Faixa em branco abaixo do Copyright, provavelmente o espaço do banner de anúncio recolhido. Visual, sem impacto nos dados | [K0-faixa-branca-rodape.png](evidencias/K0-faixa-branca-rodape.png) |
| D11 | Carrinho | Clicar em "Proceed To Checkout" como visitante | Aviso exige Register / Login para finalizar. Melhoria: o aviso não tem X para fechar, e a única saída é "Continue On Cart", cujo texto não deixa claro que só fecha o aviso | [C7-checkout-exige-login.png](evidencias/C7-checkout-exige-login.png) |
| D12 | Compra | Abrir a tela de login | Não existe opção "Esqueci minha senha": quem esquecer a senha não consegue mais entrar nem comprar. Há também um anúncio "Secure Login Solutions" na tela de senha, que pode ser confundido com um recurso da loja | [P0-login-sem-recuperar-senha.png](evidencias/P0-login-sem-recuperar-senha.png) |
| D13 | Compra | Ver as opções de país no cadastro | Só 7 países (India, United States, Canada, Australia, Israel, New Zealand, Singapore). Brasil não está na lista, embora o módulo seja para o CPB: cliente brasileiro não consegue informar o país correto no endereço de entrega | [P0-cadastro-sem-brasil.png](evidencias/P0-cadastro-sem-brasil.png) |
| D14 | API de conta | Clicar em "Delete Account" logado | A conta é apagada na hora, sem pedido de confirmação, e a exclusão é permanente. Um clique acidental faz o cliente perder a conta | [A0-apagar-conta-sem-confirmacao.png](evidencias/A0-apagar-conta-sem-confirmacao.png) |
| D15 | Compra | Ver endereço de entrega e cobrança no checkout | O nome aparece como ". pedro" (com ponto na frente), enquanto o topo mostra "pedro". Provável causa: título (Mr/Mrs) não escolhido no cadastro, e o sistema monta "[título]. [nome]" mesmo vazio. O nome sai errado no endereço de entrega | [P1-nome-com-ponto-no-endereco.png](evidencias/P1-nome-com-ponto-no-endereco.png) |
| D16 | Catálogo | Comparar a escrita dos nomes dos produtos (tela e API) | Nomes sem padrão: "GRAPHIC DESIGN MEN T SHIRT - BLUE" todo em maiúsculas; T-shirt escrito de 4 jeitos (Tshirt, T-Shirt, T-Shirts, T SHIRT); traço longo em "Colour Blocked Shirt – Sky Blue"; falta de espaço em "Outfits -Pink". Pode afetar a busca | [K0-nomes-sem-padrao.png](evidencias/K0-nomes-sem-padrao.png) |
| D17 | API de conta | getUserDetailByEmail só com o e-mail, sem senha | Devolve nome, data de nascimento, endereço completo, empresa e ID interno do cliente sem nenhuma autenticação. Qualquer pessoa que saiba ou adivinhe um e-mail obtém os dados pessoais | [A3-dados-pessoais-sem-senha.png](evidencias/A3-dados-pessoais-sem-senha.png) |
| D18 | API de conta | Cabeçalhos da resposta da API | O corpo é JSON, mas o Content-Type é text/html. Clientes da API precisam converter a resposta manualmente | [A3-dados-pessoais-sem-senha.png](evidencias/A3-dados-pessoais-sem-senha.png) |
| D19 | API de conta | Comparar o que é enviado no createAccount com o que volta no getUserDetailByEmail | Nome de campo muda (birth_date enviado, birth_day devolvido) e mobile_number enviado não volta na consulta | [A3-dados-pessoais-sem-senha.png](evidencias/A3-dados-pessoais-sem-senha.png) |
| D20 | API de conta | createAccount com dados válidos | O cabeçalho HTTP é 200, mas o corpo diz responseCode 201 "User created!". Mesmo padrão da D05: o status HTTP não reflete o resultado real | [A2-criar-conta-status-200-corpo-201.png](evidencias/A2-criar-conta-status-200-corpo-201.png) |

## 2. Riscos por frente (em ordem de prioridade)

### Ordem das frentes e por quê

### Frente 1: carrinho de visitante
### Frente 2: catálogo e busca
### Frente 3: API de conta
### Frente 4: compra de ponta a ponta

## 3. Perguntas ao PO / dev

| # | Pergunta | Se a resposta for A, meu teste... | Se for B, meu teste... |
|---|---|---|---|
| P01 | A lista de produtos deve permitir escolher a quantidade, ou a adição rápida de 1 unidade é intencional? | Intencional: vira premissa e o teste só confere que entra 1 unidade | Não intencional: vira melhoria para o fornecedor e um cenário de quantidade pela lista |
| P02 | O cliente deve poder alterar a quantidade dentro do carrinho? | Sim: vira defeito para o fornecedor e cenário de aumentar/diminuir | Não: vira premissa, e o teste cobre só remover e adicionar de novo |
| P03 | O módulo entregue ao CPB terá anúncios de terceiros? | Sim: vira risco alto e testo carrinho e checkout com anúncios ligados | Não: o fornecedor remove os anúncios, e a automação continua bloqueando-os por estabilidade |
| P04 | O carrinho montado como visitante deve ser mantido depois do login? | Sim: testo que os mesmos itens e quantidades continuam após entrar | Não: vira premissa, e o cliente precisa ser avisado de que perderá o carrinho |
| P05 | A recuperação de senha faz parte do escopo deste módulo? | Sim: vira defeito para o fornecedor e cenários de recuperação (e-mail válido, inválido, link expirado) | Não: vira premissa e risco registrado, já que o cliente que esquece a senha fica bloqueado |
| P06 | Quais países o módulo deve atender? O Brasil é obrigatório? | Só Brasil ou incluindo Brasil: vira defeito alto, e testo CEP brasileiro (8 dígitos) e estados | Lista atual intencional: vira premissa, com risco de endereço errado para clientes brasileiros |
| P07 | A exclusão de conta deve pedir confirmação (ou senha) antes de apagar? | Sim: vira defeito e cenário de cancelar a exclusão | Não: vira premissa, e o teste só confere que a conta deixa de existir na tela e na API |
| P08 | Quem pode consultar os dados de um cliente pela API, e com qual autenticação? | Só o próprio cliente ou o CPB, com token: vira defeito crítico, e testo acesso sem token e com token de outro usuário | Consulta aberta intencional: vira risco crítico de LGPD para o PO decidir antes do aceite |


## 4. Premissas adotadas (onde faltou regra)

| # | Premissa | Por que adotei | Como afeta os testes |
|---|---|---|---|
| PR01 | | | |