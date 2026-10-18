# Apps Script dos formulários — já instalado

**Status: no ar desde 15/10/2026.** Este documento vira referência; não é preciso
repetir a instalação.

| | |
|---|---|
| Projeto | **Formularios do site WF**, no Drive de wesleysolucoesempresariais@gmail.com |
| Implantação | App da Web, versão 3 · implantação única (a órfã da 1ª tentativa foi arquivada em 17/10) |
| Executar como | wesleysolucoesempresariais@gmail.com |
| Quem pode acessar | Qualquer pessoa |
| Endpoint | `https://script.google.com/macros/s/AKfycbwINddzkBUDdeYM5D1zlmpYUIPC_WcGX4gWWCjVPJP8yDSLvDidY9tIIylfbxPFd47U/exec` |

Ele está ligado em `/questionario/` (`window.WF_FORM.endpoint`).

## Permissões

O script pede **uma só**: enviar e-mail em nome do dono.

A primeira versão do código tinha uma função opcional de gravar em planilha,
desligada por padrão. Mesmo desligada, ela fazia o Google pedir acesso a
**todas as planilhas da conta**. A função foi removida antes de autorizar, e a
permissão de planilha deixou de ser pedida.

## Para onde cada formulário vai

| Formulário | Destino |
|---|---|
| Questionário de levantamento | comercial@folhaegestao.com.br |
| Cálculo de rescisão | rh@folhaegestao.com.br |
| Demonstração do WF Ponto | ponto@folhaegestao.com.br |
| Qualquer outro | comercial@folhaegestao.com.br |

O roteamento usa o campo `_assunto` que a página envia. Para mudar destino,
edite `DESTINOS` no `Codigo.gs` e **crie uma nova implantação** — salvar o
código não basta.

## Observações

- O remetente aparece como **"WF Folha & Gestão — formulário do site"**. O
  endereço por trás é `wesleysolucoesempresariais@gmail.com`, porque o script
  roda nessa conta; o `replyTo` já devolve para o apelido de destino.
- Para o endereço do remetente ser o próprio `comercial@`, é preciso cadastrá-lo
  em Gmail → Configurações → Contas → "Enviar e-mail como", o que exige a senha
  SMTP da caixa Titan (`smtp.titan.email`, porta 465, SSL). Feito isso, trocar
  `MailApp.sendEmail` por `GmailApp.sendEmail` com `from:` e reimplantar.
- Como `comercial@` tem regra de entrega, as mensagens caem na pasta
  **Comercial**, não na Caixa de entrada.
- O campo-isca `site` descarta robô em silêncio, e há limite de 5 envios por
  minuto.
- Se o endpoint for apagado ou esvaziado, o `form.js` passa a abrir o WhatsApp
  com as respostas montadas, em vez de perder o contato.

## O outro script

O formulário de rescisão usa um script separado e anterior, que responde
`{"ok":true,"servico":"calculo-rescisao"}` e já funciona. Não foi tocado.

## Armado, se um dia quiser trocar o remetente

`ALTERNATIVA-remetente-comercial.gs`, nesta pasta, tem o código pronto e o
passo a passo para o e-mail sair como `comercial@folhaegestao.com.br`.

**Está desarmado de propósito.** `MailApp` não aceita definir remetente; só
`GmailApp` aceita, e ele exige o escopo `https://mail.google.com/`, que dá ao
script **acesso total à caixa** — ler, escrever e apagar. Trocar um endereço
de remetente por isso é a mesma desproporção da permissão de planilha que foi
recusada na implantação.

Hoje o `replyTo` já devolve para o apelido de destino e o nome de exibição lê
"WF Folha & Gestão — formulário do site", então quem responde não vê o Gmail.

O pré-requisito continua sendo do dono: cadastrar `comercial@` em Gmail →
Configurações → Contas → "Enviar e-mail como", o que pede a senha SMTP do
Titan (`smtp.titan.email`, 465, SSL).
