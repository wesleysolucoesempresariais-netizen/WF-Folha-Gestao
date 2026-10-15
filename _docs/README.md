# Documentação interna — não publicada

Esta pasta começa com `_`, então o GitHub Pages **não a serve**. O conteúdo não
fica acessível em folhaegestao.com.br. Confirmado após a publicação: as URLs
`/_docs/` e `/_docs/AUDITORIA-TECNICA.md` respondem 404.

| Arquivo | O que é |
|---|---|
| `AUDITORIA-TECNICA.md` | Auditoria do site de 14/10/2026: acessibilidade, desempenho, SEO, segurança e LGPD. Inclui duas correções ao próprio relatório, feitas durante a aplicação. |
| `TESTES-PROTOTIPO.md` | Bateria de testes do protótipo, com os três defeitos encontrados e corrigidos. |
| `apps-script/Codigo.gs` | Código pronto para colar no Google Apps Script, que transforma os formulários em e-mail para comercial@folhaegestao.com.br. |
| `apps-script/COMO-INSTALAR.md` | Passo a passo da publicação do script. Só o dono pode fazer: é a conta Google dele. |
| `prints/` | Telas de antes e depois, celular e desktop. |

## Pendências registradas nos relatórios

1. Revisão jurídica da Política de Privacidade e dos textos sobre o INPI e a Portaria 671.
2. CEP do escritório de Maragogi.
3. Publicar o Apps Script e preencher `window.WF_FORM.endpoint` em `/questionario/`.
   Enquanto estiver vazio, o formulário sai pelo WhatsApp com as respostas montadas.
4. Cabeçalhos de segurança (HSTS, CSP, Referrer-Policy). O GitHub Pages não permite
   configurá-los; exigiria um CDN à frente.
