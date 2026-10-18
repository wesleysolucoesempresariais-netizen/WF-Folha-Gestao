/**
 * ALTERNATIVA — fazer o e-mail sair como comercial@folhaegestao.com.br
 *
 * NÃO ESTÁ EM USO. Cole no lugar da função doPost do Codigo.gs só se decidir
 * aceitar o custo descrito abaixo.
 *
 * =====================================================================
 * O CUSTO, antes de qualquer coisa
 * =====================================================================
 * O script hoje usa MailApp.sendEmail, que pede UMA permissão estreita:
 * "enviar e-mail em seu nome".
 *
 * MailApp NÃO aceita definir o remetente. Para isso é preciso GmailApp, que
 * exige o escopo https://mail.google.com/ — ou seja, acesso TOTAL ao Gmail:
 * ler, escrever, arquivar e apagar qualquer mensagem da conta.
 *
 * Trocar um endereço de remetente por acesso irrestrito à caixa é uma troca
 * ruim. O replyTo já devolve para comercial@, e o nome de exibição já lê
 * "WF Folha & Gestão — formulário do site". Quem responde não vê o Gmail.
 *
 * Minha recomendação é NÃO trocar. Se ainda assim quiser, siga abaixo.
 *
 * =====================================================================
 * PRÉ-REQUISITO, que é seu e exige senha
 * =====================================================================
 * Gmail (wesleysolucoesempresariais@gmail.com) → Configurações → Contas e
 * importação → "Enviar e-mail como" → Adicionar outro endereço:
 *
 *   E-mail ............. comercial@folhaegestao.com.br
 *   Nome ............... WF Folha & Gestão
 *   Tratar como alias .. DESMARCAR
 *   Servidor SMTP ...... smtp.titan.email
 *   Porta .............. 465, com SSL
 *   Usuário ............ wesley@folhaegestao.com.br
 *   Senha .............. a da caixa Titan
 *
 * O código de confirmação chega na pasta Comercial do Titan.
 *
 * Sem esse cadastro, GmailApp ignora o from e manda pelo endereço padrão.
 *
 * =====================================================================
 * DEPOIS de cadastrar: substitua o bloco de envio do doPost por este
 * =====================================================================
 */

var REMETENTE = 'comercial@folhaegestao.com.br';

function enviar_(destino, dados) {
  var assunto = assunto_(dados);
  var html = corpoHtml_(dados);
  var texto = corpoTexto_(dados);
  var nome = 'WF Folha & Gestão — formulário do site';

  // Só usa o remetente próprio se ele estiver mesmo cadastrado na conta.
  // Assim, se o cadastro for removido um dia, o envio continua funcionando.
  var apelidos = GmailApp.getAliases();
  if (apelidos.indexOf(REMETENTE) !== -1) {
    GmailApp.sendEmail(destino, assunto, texto, {
      htmlBody: html, name: nome, from: REMETENTE, replyTo: destino
    });
  } else {
    MailApp.sendEmail({
      to: destino, replyTo: destino, subject: assunto,
      htmlBody: html, body: texto, name: nome
    });
  }
}

/* No doPost, troque o bloco MailApp.sendEmail({...}) por:
 *
 *     enviar_(destino, dados);
 *
 * Salve, e em Implantar → Gerenciar implantações → editar → Versão: Nova
 * versão → Implantar. Editar a implantação existente preserva a URL; criar
 * uma nova gera outro endereço e quebraria o site.
 *
 * Na primeira execução o Google vai pedir a permissão nova. É ali que o
 * acesso total ao Gmail é concedido.
 */
