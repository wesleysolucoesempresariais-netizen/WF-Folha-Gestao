# Auditoria técnica — site folhaegestao.com.br

**Data:** 14/10/2026 · **Escopo:** as 4 páginas publicadas do site institucional
(`index.html`, `ponto/`, `calculo-rescisao/`, `404.html`).
**Natureza:** somente leitura. Nenhum arquivo do site foi alterado.

**Onde fica o site:** `site-folhaegestao/`, dentro de
`~/Documents/App/PontoWF-GitHub/ponto-wf/`.
**Como é publicado:** GitHub Pages (a produção responde `server: GitHub.com`),
no endereço `folhaegestao.com.br`. **Qual repositório recebe o push, ainda não
sabemos** — a pasta local não está sob git e nenhum clone no Mac contém esses
arquivos. Isso precisa ser confirmado pelo dono antes da Fase 3.

**Ramo `chore/auditoria-site`: não foi criado.** A pasta do site não é um
repositório git, então não há onde abrir ramo. Este relatório foi gravado em
`docs/` sem versionamento. Ver achado PR-1.

## Gravidade

| Nível | Significado |
|---|---|
| **Crítico** | Risco legal ou quebra de acesso. Corrigir antes de novas campanhas. |
| **Alto** | Perda mensurável de conversão, de busca ou de acessibilidade. |
| **Médio** | Deve ser corrigido, sem urgência. |
| **Baixo** | Ajuste fino. |

Total: **4 críticos, 12 altos, 12 médios, 3 baixos** (o P-6 foi acrescentado em 14/10 ao corrigir um erro deste relatório).

---

## 1. Acessibilidade

### A-1 · Crítico · `site-folhaegestao/index.html:1`
A página inicial **não tem `<!DOCTYPE html>` nem `<html lang="pt-BR">`**. O
arquivo começa direto em `<meta charset="UTF-8">`. As outras três páginas têm
ambos.

Duas consequências: o navegador renderiza em *quirks mode*, um modo de
compatibilidade antigo onde medidas de caixa e altura de linha se comportam de
outro jeito; e, sem idioma declarado, o leitor de tela pronuncia o texto
português com fonética inglesa. É falha de WCAG 3.1.1, nível A — o nível mais
básico.

**Correção:** acrescentar no topo `<!DOCTYPE html>` e `<html lang="pt-BR">`,
com `<head>` e `<body>` delimitados, fechando com `</html>`.

### A-2 · Alto · `site-folhaegestao/index.html` (todo o CSS)
**Nenhum estilo de foco em toda a página inicial** — zero ocorrências de
`:focus` nos 139 KB de CSS. Quem navega por teclado não enxerga onde está. As
páginas `ponto/` e `calculo-rescisao/` têm 3 regras cada, então o problema é
só da home. Falha de WCAG 2.4.7, nível AA.

**Correção:**
```css
:focus-visible{ outline:3px solid #D8B66A; outline-offset:2px; border-radius:8px; }
```

### A-3 · Alto · `site-folhaegestao/index.html:223` e `:626`
O menu é escondido abaixo de 1200px (`display:none`, reforçado com
`!important` na linha 626) e **não existe substituto**. Resultado: celular e
tablet, que é de onde vem a maior parte do tráfego de Instagram e WhatsApp,
ficam **sem navegação nenhuma** — só o logotipo no topo. Confirmado no print
`mobile-home-dobra.png`.

**Correção:** menu hambúrguer (item *d* da Fase 2).

### A-4 · Médio · `site-folhaegestao/index.html` (60 ocorrências de `<svg>`)
Dos 60 SVGs, apenas 14 têm `aria-hidden`. Os outros 46 são ícones decorativos
que o leitor de tela anuncia como conteúdo, poluindo a leitura.

**Correção:** `aria-hidden="true" focusable="false"` nos decorativos;
`role="img"` com `<title>` nos que carregam informação.

### A-5 · Médio · `calculo-rescisao/index.html`, `ponto/index.html`
Rótulos sem associação programática: a rescisão tem 56 `<label>` para 31
atributos `for=`; `ponto/` tem 18 `<label>` para 9. Parte usa `label` envolvendo
o campo, o que é válido — mas a diferença indica campos onde o rótulo não está
ligado ao `id`, e aí o leitor de tela lê "caixa de edição" sem dizer de quê.

**Correção:** conferir campo a campo e garantir `for`/`id` ou o campo dentro do
próprio `label`.

### A-6 · Médio · `index.html` (ausência de `<main>`)
A home não tem o marco `<main>`; `ponto/` e `calculo-rescisao/` têm. Nenhuma
das páginas tem link "pular para o conteúdo".

**Correção:** envolver o conteúdo em `<main id="conteudo">` e acrescentar o
link de pulo como primeiro elemento do `<body>`.

### A-7 · Baixo · `index.html:694`
`<a class="brand-lockup" href="#">` — o logotipo não leva a lugar nenhum.
**Correção:** `href="/"`.

### O que está correto
Um único `<h1>` por página, hierarquia de títulos sem saltos, e contraste
aprovado nas combinações medidas:

| Combinação | Razão | Situação |
|---|---|---|
| Texto do hero `#F3F7F9` sobre petróleo `#084D6E` | 9,6:1 | AAA |
| `--ink-soft #4C5A61` sobre branco | 7,14:1 | AAA |
| Petróleo sobre branco | 9,14:1 | AAA |
| `--ink-faint #646E73` sobre branco | 5,22:1 | AA |
| Borda dos botões contornados (branco 40%) sobre petróleo | 3,49:1 | passa no mínimo de 3:1 da WCAG 1.4.11, com folga pequena |

Observação de marca, não de acessibilidade: a variável `--gold` vale hoje
`#4F6F80` (`index.html:36`), um azul acinzentado, e não o dourado `#D8B66A` do
manual. O botão primário usa `var(--brand)` com texto branco, então não há falha
de contraste — mas a cor de ação da marca foi substituída, e vale decidir se foi
de propósito.

---

## 2. Desempenho

### P-1 · Alto · `site-folhaegestao/index.html:60`
A marca d'água está embutida como **PNG de 83 KB em base64 dentro do `<style>`**
(`--wm-glyph: url("data:image/png;base64,...")`). São cerca de 46% do peso da
página inicial, dentro de um bloco que **bloqueia a renderização** e que não
entra em cache separado.

**Correção:** trocar por SVG — o símbolo já existe em vetor — ou por arquivo
externo. Sozinho, isso corta a home quase à metade.

### P-2 · Alto · `site-folhaegestao/index.html`
**139.708 bytes de CSS embutido** numa página de 180 KB. Todo ele é
render-blocking e é rebaixado inteiro a cada visita, porque vive dentro do HTML.

**Correção:** extrair para `estilos.css`. O GitHub Pages serve arquivo estático
com cache próprio; o HTML cai para cerca de 40 KB.

### P-3 · Médio · produção (cabeçalho `cache-control: max-age=600`)
A produção manda cache de **10 minutos** para o HTML. Como CSS, JS e a imagem
estão dentro do HTML, o visitante rebaixa 180 KB a cada 10 minutos. O GitHub
Pages não permite configurar esse cabeçalho.

**Correção:** é consequência de P-1 e P-2. Com os arquivos separados e hash no
nome, eles passam a ser cacheados por muito mais tempo.

### P-4 · Médio · `index.html:23`
A folha do Google Fonts é carregada de forma bloqueante. Os dois `preconnect`
(linhas 21 e 22) e o `display=swap` estão certos, o que ameniza.

**Correção:** auto-hospedar as duas fontes, ou carregar com
`media="print" onload="this.media='all'"`.

### P-5 · Médio · `index.html:44`
O CSS usa `font-family: 'Archivo Expanded'`, mas **essa família nunca chega**.
Testei a URL exata do site: o Google devolve apenas `font-family: 'Archivo'`.
Ou seja, a fonte de display cai em fallback silencioso e o site nunca mostrou o
desenho pretendido.

**Correção:** usar o eixo de largura (`wdth`) da Archivo variável, ou tirar a
referência e assumir a Archivo normal.

### P-6 · Alto · `site-folhaegestao/index.html:146-235` (cabeçalho)
**CORREÇÃO DESTE RELATÓRIO, registrada em 14/10/2026 durante a Fase 3.**

A seção "Responsivo" da primeira versão deste documento afirmou que não havia
overflow horizontal no desktop. **Estava errado.** Ao reconferir no navegador, com
as fontes já carregadas, o cabeçalho estoura em toda largura de desktop:

| Largura | Sobra |
|---|---|
| 1200px | 165px |
| 1280px | 170px |
| 1440px | 114px |
| 1680px | 31px |

A conta: o cabeçalho precisa de **1433px** (logo 206 + nove links 996 + botão 174
+ espaçamentos) e o container entrega **1180px**. Como logo e botão têm
`flex:none` e todos os links têm `white-space:nowrap`, nada encolhe e a lista
transborda para fora da tela. Só para de estourar perto de 1700px.

A medição errada da primeira versão provavelmente foi feita antes de a fonte
Archivo terminar de carregar, quando o texto ainda ocupava menos espaço.

**Correção aplicada:** a lista completa passou a aparecer só a partir de 1700px,
onde de fato cabe; abaixo disso vai para o menu, sem perder nenhum link.

### O que está correto
Nenhuma imagem `<img>` — a iconografia é SVG inline, o que elimina requisições.
JS inline é pequeno (934 bytes na home). `prefers-reduced-motion` presente na
home.

---

## 3. SEO técnico

### S-1 · Alto · `sitemap.xml:4` × `calculo-rescisao/index.html:18`
Contradição direta: o sitemap pede a indexação de `/calculo-rescisao/`,
enquanto a própria página manda `<meta name="robots" content="noindex">`. O
Google recebe duas ordens opostas e gasta rastreamento à toa.

**Correção:** tirar a URL do sitemap. O `noindex` no formulário está certo e
deve ficar — o item *k* da Fase 2 prevê uma página indexável **separada** sobre
cálculo de rescisão, e é ela que entra no sitemap.

### S-2 · Médio · `index.html:1`
A falta de `<html lang>` (ver A-1) também tira do buscador o sinal de idioma da
página mais importante do site.

### O que está correto
JSON-LD único e válido (`ProfessionalService`), `canonical` correto nas três
páginas públicas, `404.html` com `noindex`, redirecionamento `http → https`
(301) e `www → apex` (301), `og:image` e `twitter:card` presentes, e nenhum
link interno quebrado em produção.

---

## 4. Segurança

### SEC-1 · Médio · produção (cabeçalhos)
A resposta não traz **nenhum** cabeçalho de segurança: sem HSTS, sem
Content-Security-Policy, sem `X-Content-Type-Options`, sem `Referrer-Policy`,
sem `Permissions-Policy`. Só vem `cache-control`.

Contexto honesto: **o GitHub Pages não permite definir cabeçalhos de resposta**,
então isso não se corrige no código. Como o site é estático, sem login e sem
área logada, o risco real é baixo — o principal efeito é o `Referrer-Policy`
ausente, que deixa a URL de origem vazar para o Google Fonts e para o WhatsApp.

**Correção:** aceitar conscientemente, ou colocar um CDN na frente (Cloudflare
no plano gratuito resolve os cinco). Paliativo parcial: CSP por
`<meta http-equiv>` no HTML.

### SEC-2 · Médio · `calculo-rescisao/index.html:574`
O formulário envia por `fetch` para um endpoint do Google Apps Script usando
`Content-Type: text/plain;charset=utf-8`. Esse content-type é o contorno
conhecido para não disparar verificação prévia de CORS — funciona, mas significa
que **dados pessoais e sensíveis trafegam para um endpoint do Google sem que
nenhuma página do site informe isso ao visitante**. Ver L-1 e L-6.

### O que está correto
HTTPS ativo com redirecionamento. Todos os `target="_blank"` têm
`rel="noopener"` nas três páginas — zero ocorrências sem. O formulário de
`ponto/` não manda dados a servidor nenhum: monta uma mensagem e abre o WhatsApp
(`ponto/index.html:464`), o que reduz bastante a superfície.

---

## 5. LGPD

Esta é a área mais grave da auditoria.

### L-1 · Crítico · as 4 páginas
**Nenhuma página do site tem link para a Política de Privacidade.** Verifiquei
`index.html`, `ponto/index.html`, `calculo-rescisao/index.html` e `404.html`:
zero ocorrências. Ao mesmo tempo, o site coleta dado pessoal em formulário. Com
formulário no ar e sem política publicada, falta a informação que o art. 9º
exige e não há onde o titular exercer os direitos do art. 18.

**Correção:** publicar a política e linká-la no rodapé das quatro páginas e ao
lado de cada botão de envio. Já existe uma base em `public/privacidade/` no
repositório do app, que pode ser adaptada.

### L-2 · Crítico · `calculo-rescisao/index.html:356`, `:357`, `:266`, `:269`
O formulário coleta **dado pessoal sensível**:

- linha 356: "Trabalhadora gestante ou em licença-maternidade";
- linha 357: "Afastada(o) pelo INSS por acidente/doença do trabalho nos últimos 12 meses";
- linhas 266 e 269: graus de insalubridade e periculosidade;
- campo `convencaoColetiva`: revela filiação sindical.

Saúde e filiação sindical são sensíveis pelo art. 5º, II. O único consentimento
do formulário está na linha 372 e é genérico: *"Autorizo o uso destes dados
exclusivamente para a elaboração do cálculo e o contato sobre este serviço"*.
O art. 11, I exige consentimento **específico e destacado** para dado sensível —
uma caixa geral não cumpre.

**Correção:** consentimento separado e visualmente destacado só para esses
campos, dizendo quais são e para quê; ou tirá-los do formulário e levantá-los na
conversa (é o caminho do item *i* da Fase 2).

### L-3 · Crítico · `calculo-rescisao/index.html` (campos `trabalhador*`)
O formulário pede **nome, CPF e data de nascimento do trabalhador**
(`trabalhadorNome`, `trabalhadorCPF`, `trabalhadorNascimento`), mas quem
preenche é outra pessoa — há campos próprios para o solicitante
(`solicitanteNome`, `solicitanteWhatsapp`, `solicitanteEmail`).

Consentimento dado por A não autoriza tratar dado de B. O site coleta dado
pessoal de terceiro sem base legal declarada, e CPF é identificador direto.

**Correção:** o cálculo de rescisão não precisa de CPF nem de nome para ficar
correto — precisa de datas, salário, verbas e motivo. Remover os três e, se o
nome for necessário para emitir o documento, coletá-lo depois, na contratação,
onde a base legal é a execução de contrato.

### L-4 · Alto · `calculo-rescisao/index.html:363`
O campo livre `observacoes` tem o texto de apoio *"Algo que eu deva saber:
horas extras não pagas, **afastamentos**, acordos feitos etc."* — ou seja,
**convida** o visitante a digitar informação de saúde num campo sem qualquer
proteção específica.

**Correção:** reescrever o apoio sem induzir a dado de saúde, por exemplo
"Algo sobre verbas ou acordos que eu deva considerar no cálculo".

### L-5 · Alto · `calculo-rescisao/index.html`
**57 campos de formulário.** O art. 6º, III manda coletar só o necessário.
Além do problema legal, cada campo derruba conversão.

**Correção:** reduzir ao mínimo do cálculo (item *i* da Fase 2).

### L-6 · Médio · `calculo-rescisao/index.html:574`
Os dados vão para uma planilha do Google via Apps Script. O Google é **operador**
de tratamento nessa cadeia, e nada no site informa isso.

**Correção:** declarar na política quem são os operadores e onde os dados ficam.
O item *j* da Fase 2, que traz o questionário para o domínio próprio, reduz o
problema na origem.

### L-7 · Baixo · o que está correto, e é bastante
Não há cookie próprio, Google Analytics, pixel do Meta nem qualquer rastreador —
confirmei nas quatro páginas. Por isso **banner de consentimento não é
necessário**, e a ausência dele não é falha. A única requisição a terceiro é o
Google Fonts, que compartilha o IP do visitante; se quiser rigor total,
auto-hospedar as fontes encerra o assunto (e ainda resolve P-4).

---

## 6. Conteúdo com peso jurídico

Achados que sustentam os itens *f*, *g* e *h* da Fase 2.

### C-1 · Alto · `ponto/index.html:280`
Título: *"Três garantias que valem na fiscalização e na Justiça do Trabalho"*.
Promete resultado em processo judicial, que ninguém pode garantir.

### C-2 · Alto · `ponto/index.html:282`
O subtítulo diz **"Registro no INPI"**, enquanto o corpo do mesmo bloco diz,
corretamente, "protocolado". Pedido de registro não é registro concedido;
anunciar como registro é afirmação inverídica enquanto o processo não for
deferido.

**Correção:** "Pedido de registro protocolado no INPI", mantendo o número do
processo.

### C-3 · Médio · `ponto/index.html:11`, `:235`, `:259`
"Dentro da lei" como afirmação absoluta, inclusive no `og:description` e no
`<h1>`.

### C-4 · Alto · `index.html:765` e `:886`
A home anuncia *"A partir de R$ 4,99 por funcionário/mês"* **sem o mínimo de
R$ 99/mês**, que só aparece em `ponto/index.html:302`. Quem entra pela home e
tem 5 funcionários calcula R$ 24,95 e encontra R$ 99 na proposta.

O CDC, art. 31, exige informação correta, clara e precisa sobre o preço. É o
item *h* da Fase 2 e, dos quatro, o de maior chance de gerar reclamação.

---

## 7. Processo e versionamento

### PR-1 · Alto · a pasta publicada não está sob git e **está incompleta**
`site-folhaegestao/` tem 6 arquivos. A produção serve, com status 200, quatro
arquivos que **não existem na cópia local**:

| Arquivo | Produção | Local |
|---|---|---|
| `favicon.ico` | 200 | ausente |
| `icon-512.png` | 200 | ausente |
| `apple-touch-icon.png` | 200 | ausente |
| `og-image.png` | 200 | ausente |

Os quatro são referenciados pelo HTML. Rodando o site em localhost, o navegador
registrou 404 em `favicon.ico` e `icon-512.png` — em produção eles respondem,
então o problema é a cópia local.

O risco concreto: **publicar a partir desta pasta apagaria os quatro arquivos**,
quebrando favicon, ícone de app e a imagem de compartilhamento.

**Correção, antes de qualquer alteração da Fase 3:** identificar o repositório
que alimenta o GitHub Pages, cloná-lo e trabalhar a partir dele.

### PR-2 · Médio · o site mora numa cópia antiga do app
`site-folhaegestao/` está dentro de `ponto-wf/`, que é um retrato antigo do
aplicativo: o `package.json` dela não tem os comandos atuais (`local`,
`emuladores`, `aprovar`). O repositório vivo é `ponto-wf-repo/`, e ele **não
contém** o site. Há risco de editar o arquivo errado.

Consequência adicional: por estar fora do repositório, o site **não é protegido
pela trava de aprovação** nem pelos testes descritos no `CLAUDE.md`.

---

## 8. Prints

Capturados com `playwright-cli` sobre `http://localhost:8788`, nunca em
produção, em `prints/`:

| Arquivo | Dispositivo | Página |
|---|---|---|
| `mobile-home.png` | Pixel 10 (360px) | inicial, página inteira |
| `mobile-home-dobra.png` | Pixel 10 (360px) | inicial, primeira dobra |
| `mobile-ponto.png` | Pixel 10 (360px) | `/ponto/` |
| `mobile-calculo-rescisao.png` | Pixel 10 (360px) | `/calculo-rescisao/` |
| `desktop-home.png` | 1280×900 | inicial |
| `desktop-ponto.png` | 1280×900 | `/ponto/` |
| `desktop-calculo-rescisao.png` | 1280×900 | `/calculo-rescisao/` |

Duas observações visuais que confirmam itens da Fase 2:

- **Item *a*:** em `mobile-home-dobra.png` há cerca de 170px de vazio entre o
  cabeçalho e o `<h1>`; `.hero-inner` tem `padding:76px 0 84px`
  (`index.html:259`). O botão do WhatsApp aparece como pílula larga sobreposta
  ao conteúdo, não como ícone redondo.
- **Item *b*:** a primeira dobra oferece quatro ações de peso parecido — "Pedir
  uma proposta", "Preencher questionário", "Enviar e-mail" e WhatsApp
  (`index.html`, bloco do hero). Três delas são botões empilhados de largura
  cheia.
- **Item *m*:** ~~a home mobile tem 18.427px de altura e é quase toda em fundo
  petróleo.~~ **ERRADO, corrigido em 14/10/2026 durante a Fase 3.** Os prints
  foram tirados pelo playwright-cli, que segue o tema do macOS — e o Mac está
  no modo escuro. O que registrei como "quase toda em petróleo" era o tema
  escuro do próprio site, funcionando como deveria.

  Medindo os fundos computados em modo claro, a home **já alterna**: só o hero
  e a seção "para quem" são petróleo; as demais são `#FFFFFF`, `#FBFCFC` ou
  `#EEF1F3`, intercaladas. **Não há o que corrigir neste item.** A altura de
  18.427px é real, mas é consequência da quantidade de conteúdo, não da cor.

---

## 9. Ferramentas instaladas

| Ferramenta | Origem | Situação |
|---|---|---|
| `design-taste-frontend` | `Leonxlnx/taste-skill` | instalada em `.agents/skills/`; scanners: Gen *Safe*, Socket *0 alertas*, Snyk *Low Risk* |
| `web-design-guidelines` | `vercel-labs/agent-skills` | instalada em `.agents/skills/`; mesmos três scanners limpos |
| `@playwright/cli` | npm (Microsoft) | **não instalada globalmente** — `/usr/local/lib/node_modules` exige senha de administrador. Em uso por `npx @playwright/cli@latest`, que faz o mesmo sem alterar o sistema |
| skill do `playwright-cli` | `playwright-cli install --skills` | instalada em `.claude/skills/playwright-cli`; encontrou o Chrome do Mac e dispensou o download de navegador |

Node do ambiente: **v24.21.0** (o mínimo pedido era 18; a taste-skill pede 22+).

---

## 10. Ordem sugerida de correção

1. **L-1, L-2, L-3** — política de privacidade publicada e linkada, consentimento
   específico para dado sensível, e fim da coleta de CPF de terceiro. Risco legal.
2. **C-4 e C-2** — preço mínimo na home e "protocolado" no lugar de "registro".
   Risco de reclamação e de afirmação inverídica.
3. **A-1** — doctype e idioma na home. Uma linha cada, conserta a base inteira.
4. **PR-1** — site em repositório git antes de mexer em qualquer arquivo.
5. **A-2, A-3** — foco visível e menu no celular.
6. **P-1, P-2** — tirar o PNG de 83 KB e o CSS de 139 KB de dentro do HTML.
7. O restante, junto com as mudanças de layout da Fase 2.
