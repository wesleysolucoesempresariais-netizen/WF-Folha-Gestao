/* Comportamento único para todos os formulários do site.
   Cada página define window.WF_FORM = { assunto, endpoint }.
   Enquanto o endpoint estiver vazio, o envio é simulado (modo protótipo). */
(function () {
  'use strict';
  var cfg = window.WF_FORM || {};
  var form = document.querySelector('.form-wf form') || document.querySelector('form.form-wf');
  if (!form) return;
  var botao = form.querySelector('button[type=submit]');
  var rotuloBotao = botao ? botao.textContent : 'Enviar';

  function grupo(el) { return el.closest('.campo') || el.parentElement; }

  function valida(el) {
    var ok = true;
    if (el.name === 'site') return true;        // campo-isca: nunca validar
    if (el.hasAttribute('required')) {
      ok = (el.type === 'checkbox') ? el.checked : el.value.trim() !== '';
    }
    if (ok && el.id === 'whatsapp' && el.value.trim() !== '') {
      ok = el.value.replace(/\D/g, '').length >= 10;   // DDD + número
    }
    var g = grupo(el);
    if (g) g.classList.toggle('tem-erro', !ok);
    el.classList.toggle('erro', !ok);
    el.setAttribute('aria-invalid', String(!ok));
    return ok;
  }

  Array.prototype.forEach.call(form.querySelectorAll('input, select, textarea'), function (el) {
    el.addEventListener('blur', function () { if (el.value.trim() !== '') valida(el); });
    el.addEventListener('input', function () {
      var g = grupo(el);
      if (g && g.classList.contains('tem-erro')) valida(el);
    });
  });

  /* Trava do bloco sensível: marcou saúde ou sindicato, precisa da autorização própria.
     É o que a LGPD art. 11, I exige — consentimento específico e destacado. */
  function sensivelPendente() {
    var bloco = form.querySelector('.sensivel');
    if (!bloco) return false;
    var consent = bloco.querySelector('.consent-destacado input[type=checkbox]');
    if (!consent || consent.checked) return false;
    var marcou = Array.prototype.some.call(
      bloco.querySelectorAll('input[type=checkbox]'),
      function (c) { return c !== consent && c.checked; }
    );
    var preencheu = Array.prototype.some.call(
      bloco.querySelectorAll('input[type=text], textarea'),
      function (c) { return c.value.trim() !== ''; }
    );
    return marcou || preencheu;
  }

  function dados() {
    var fd = new FormData(form), out = {};
    fd.forEach(function (v, k) {
      if (out[k] === undefined) out[k] = v;
      else out[k] = [].concat(out[k], v).join(', ');
    });
    out._assunto = cfg.assunto || 'Formulário do site';
    out._origem = location.pathname;
    return out;
  }

  function confirma() {
    var alvo = form.parentElement;
    alvo.innerHTML =
      '<div class="confirmacao" role="status" tabindex="-1">' +
      '<h2>Recebido. Retorno em até 1 dia útil.</h2>' +
      '<p>Se preferir falar agora, é só chamar no WhatsApp.</p>' +
      '<a href="https://wa.me/5581999955522?text=' +
      encodeURIComponent('Olá! Acabei de enviar o formulário pelo site.') +
      '" target="_blank" rel="noopener">Chamar no WhatsApp</a></div>';
    alvo.querySelector('.confirmacao').focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var campos = form.querySelectorAll('input, select, textarea');
    var valido = true, primeiro = null;
    Array.prototype.forEach.call(campos, function (el) {
      if (!valida(el)) { valido = false; if (!primeiro) primeiro = el; }
    });
    if (!valido) { primeiro.focus(); return; }

    if (sensivelPendente()) {
      var c = form.querySelector('.consent-destacado input[type=checkbox]');
      grupo(c).classList.add('tem-erro');
      c.focus();
      return;
    }

    if (botao) { botao.disabled = true; botao.textContent = 'Enviando...'; }

    if (!cfg.endpoint) {                     // modo protótipo
      window.setTimeout(confirma, 700);
      return;
    }

    fetch(cfg.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(dados())
    }).then(confirma).catch(function () {
      if (botao) { botao.disabled = false; botao.textContent = rotuloBotao; }
      alert('Não consegui enviar agora. Tente de novo ou chame no WhatsApp.');
    });
  });
})();
