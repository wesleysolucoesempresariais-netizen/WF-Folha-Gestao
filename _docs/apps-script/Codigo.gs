/**
 * WF Folha & Gestão — recebe os formulários do site e envia por e-mail.
 *
 * O visitante preenche em folhaegestao.com.br; esta função só transforma
 * o envio em mensagem. Ela não guarda nada, a não ser que você ligue a planilha
 * em GUARDAR_NA_PLANILHA.
 */

// ----------------------------------------------------------------- ajustes
var DESTINO = 'comercial@folhaegestao.com.br';
var RESPONDER_PARA = 'comercial@folhaegestao.com.br';
var WHATSAPP = '5581999955522';
var GUARDAR_NA_PLANILHA = false;   // true = também grava numa aba da planilha
var ID_DA_PLANILHA = '';           // preencha se ligar o item acima
var LIMITE_POR_MINUTO = 5;         // trava simples contra robô

// Rótulos bonitos para cada campo. Campo que não estiver aqui usa o próprio nome.
var ROTULOS = {
  nome: 'Nome', whatsapp: 'WhatsApp', empresa: 'Empresa',
  perfil: 'Perfil do negócio', colaboradores: 'Colaboradores',
  convencao: 'Convenção coletiva', hoje: 'Quem cuida hoje',
  rotinas: 'Quer terceirizar', dor: 'O que incomoda',
  admissao: 'Admissão', desligamento: 'Desligamento', motivo: 'Motivo',
  aviso: 'Aviso prévio', tipoContrato: 'Tipo de contrato',
  salario: 'Último salário', medias: 'Média de variáveis',
  feriasVencidas: 'Férias vencidas', faltas: 'Faltas', saldoFgts: 'Saldo FGTS',
  gestante: 'Gestante / licença-maternidade', afastamentoInss: 'Afastamento INSS',
  adicionais: 'Insalubridade ou periculosidade', observacoes: 'Observações',
  controle: 'Controle de ponto hoje', formato: 'Formato', periodo: 'Período',
  escalas: 'Escalas e adicionais'
};

// Campos que nunca entram no corpo do e-mail.
var OCULTOS = ['lgpd', 'lgpdSensivel', 'declaracao', '_assunto', '_origem', 'site'];

// ----------------------------------------------------------------- entrada
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) return responde({ ok: false, erro: 'vazio' });

    var dados = JSON.parse(e.postData.contents);

    // Isca anti-robô: o campo "site" é invisível na página. Se veio preenchido, é robô.
    if (dados.site) return responde({ ok: true });   // responde ok e descarta em silêncio

    if (passouDoLimite_()) return responde({ ok: false, erro: 'limite' });

    MailApp.sendEmail({
      to: DESTINO,
      replyTo: RESPONDER_PARA,
      subject: assunto_(dados),
      htmlBody: corpoHtml_(dados),
      body: corpoTexto_(dados),
      name: 'Site WF Folha & Gestão'
    });

    if (GUARDAR_NA_PLANILHA && ID_DA_PLANILHA) guardaNaPlanilha_(dados);

    return responde({ ok: true });
  } catch (erro) {
    // Nunca registre o conteúdo do formulário no log: ele tem dado pessoal.
    console.error('Falha ao processar envio: ' + erro.name);
    return responde({ ok: false });
  }
}

function doGet() {
  return HtmlService.createHtmlOutput(
    '<p style="font:16px/1.5 Arial;padding:24px">Este endereço só recebe os formulários do site ' +
    '<a href="https://folhaegestao.com.br">folhaegestao.com.br</a>.</p>');
}

// ----------------------------------------------------------------- auxiliares
function responde(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function passouDoLimite_() {
  var cache = CacheService.getScriptCache();
  var chave = 'envios_' + Math.floor(Date.now() / 60000);
  var n = Number(cache.get(chave) || 0) + 1;
  cache.put(chave, String(n), 120);
  return n > LIMITE_POR_MINUTO;
}

function assunto_(d) {
  var base = d._assunto || 'Formulário do site';
  var quem = d.empresa || d.nome || '';
  var tamanho = d.colaboradores ? ' (' + d.colaboradores + ')' : '';
  return quem ? base + ' — ' + quem + tamanho : base;
}

function pares_(d) {
  var out = [];
  for (var k in d) {
    if (OCULTOS.indexOf(k) !== -1) continue;
    var v = String(d[k] == null ? '' : d[k]).trim();
    if (!v) continue;                       // campo vazio não aparece
    if (v === 'sim') v = 'Sim';
    out.push([ROTULOS[k] || k, v]);
  }
  return out;
}

function escapa_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function corpoHtml_(d) {
  var linhas = pares_(d).map(function (p) {
    return '<tr>' +
      '<td style="padding:10px 14px;border-bottom:1px solid #DCE3E6;font:700 13px Arial;' +
      'color:#4C5A61;width:38%;vertical-align:top">' + escapa_(p[0]) + '</td>' +
      '<td style="padding:10px 14px;border-bottom:1px solid #DCE3E6;font:14px Arial;' +
      'color:#1A1A1A;vertical-align:top">' + escapa_(p[1]) + '</td></tr>';
  }).join('');

  var zap = d.whatsapp
    ? '<a href="https://wa.me/' + WHATSAPP + '" style="display:inline-block;background:#0B6A4F;' +
      'color:#fff;font:700 14px Arial;text-decoration:none;padding:12px 22px;border-radius:8px">' +
      'Responder no WhatsApp</a>'
    : '';

  return '' +
  '<div style="background:#EEF1F3;padding:24px;font-family:Arial,sans-serif">' +
    '<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden">' +
      '<div style="background:#084D6E;color:#fff;padding:20px 24px">' +
        '<div style="font:700 11px Arial;letter-spacing:.1em;text-transform:uppercase;color:#94ADBB">' +
          'Novo envio pelo site</div>' +
        '<div style="font:800 19px Arial;margin-top:6px">' + escapa_(d._assunto || 'Formulário') + '</div>' +
      '</div>' +
      '<table style="width:100%;border-collapse:collapse">' + linhas + '</table>' +
      '<div style="padding:20px 24px;background:#FBFCFC">' + zap +
        '<p style="font:12px Arial;color:#646E73;margin:14px 0 0">' +
          'Enviado por ' + escapa_(d._origem || '/') + ' · folhaegestao.com.br</p>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function corpoTexto_(d) {
  return pares_(d).map(function (p) { return p[0] + ': ' + p[1]; }).join('\n');
}

function guardaNaPlanilha_(d) {
  var aba = SpreadsheetApp.openById(ID_DA_PLANILHA).getSheets()[0];
  var pares = pares_(d);
  aba.appendRow([new Date()].concat(pares.map(function (p) { return p[1]; })));
}
