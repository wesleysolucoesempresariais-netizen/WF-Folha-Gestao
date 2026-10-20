# DESIGN.md — régua visual do site WF Folha & Gestão

> **Situação: APROVADO pelo Wesley em 19/10/2026** (seções 1 a 6).
> Esta é a régua do site. Mudança de visual que contrarie o que está aqui
> precisa primeiro mudar este arquivo, com a aprovação dele.

**De onde vieram estes valores.** Nada aqui foi inventado. Tudo foi lido dos
arquivos do site em 19/10/2026 e os contrastes foram calculados, não estimados.
Onde encontrei o site se contradizendo, eu **não escolhi um lado** — deixei a
decisão para você na última seção.

Fonte dos valores: `estilos.css` (home) e o `<style>` de cada página interna.

---

## 1. Cores

O site tem **tema claro e tema escuro**. O tema escuro liga sozinho quando o
celular ou o computador do visitante está no modo escuro — não é defeito, é
recurso.

### Tema claro

| Papel | Cor | Onde aparece |
|---|---|---|
| Fundo da página | `#FBFCFC` | fundo geral |
| Fundo alternado | `#EEF1F3` | faixas que separam seções |
| Fundo de cartão | `#FFFFFF` | cartões e caixas |
| Texto principal | `#1A1A1A` | títulos e corpo |
| Texto secundário | `#4C5A61` | apoio, legendas |
| Texto discreto | `#646E73` | rodapé, avisos pequenos |
| **Petróleo (cor da marca)** | `#084D6E` | botões, links, destaques |
| Azul-acinzentado | `#94ADBB` | detalhes, numeração |
| Linha divisória | `#DCE3E6` | separadores sutis (`--border-strong`) |
| **Contorno de componente** | `#6E8795` | campo, botão contornado, menu (`--border-ui`) |

### Tema escuro

| Papel | Cor |
|---|---|
| Fundo da página | `#0E1417` |
| Fundo alternado | `#141C20` |
| Fundo de cartão | `#131B1F` |
| Texto principal | `#EDF0F1` |
| Texto secundário | `#AEBBC1` |
| Texto discreto | `#7E8C92` |
| Petróleo clareado | `#5FA0C4` |

### Contraste medido

A regra de acessibilidade pede **4,5:1** para texto. Quanto maior, mais legível.

| Combinação | Medido | Situação |
|---|---|---|
| Texto principal no claro | 16,93:1 | folgado |
| Texto secundário no claro | 6,94:1 | passa |
| Texto discreto no claro | 5,08:1 | passa |
| Texto discreto sobre faixa cinza | 4,61:1 | passa, no limite |
| Petróleo sobre fundo claro | 8,89:1 | passa |
| Branco sobre botão petróleo | 9,14:1 | passa |
| Texto principal no escuro | 16,21:1 | folgado |
| Texto secundário no escuro | 9,44:1 | passa |
| Texto discreto no escuro | 5,35:1 | passa |
| Petróleo clareado no escuro | 6,46:1 | passa |

**Nenhum texto do site reprova.** Isso já está resolvido e não precisa mexer.

### Regras de cor

- Petróleo `#084D6E` é a cor de ação. Botão principal, link, destaque. Não usar
  petróleo em coisa que não seja clicável — confunde o visitante.
- Texto nunca é colorido só por enfeite. Se está colorido, é porque clica ou
  porque é a marca.
- Cor nunca é a **única** forma de passar uma informação. Erro de formulário
  precisa de texto, não só de borda vermelha.
- Cor nova só entra neste arquivo depois de medir o contraste.

---

## 2. Tipografia

**Como está hoje:** o texto corrido do site é **Helvetica Neue / Arial** — a
fonte do próprio aparelho. A **Archivo** (Google Fonts) é usada só em
**12 lugares**: títulos e elementos de destaque.

- Fonte de destaque: `Archivo`
- Fonte de texto: `Helvetica Neue, Helvetica, Arial`
- Altura de linha do corpo: `1.55`

### Escala de tamanhos

| Nome | Valor | Uso |
|---|---|---|
| mínimo | `0.7rem` | etiquetas |
| muito pequeno | `0.82rem` | legenda, aviso |
| pequeno | `0.92rem` | apoio |
| **base** | `1.02rem` | texto corrido |
| médio | `1.1rem` | subtítulo |
| grande | `1.4rem` | destaque |
| título de seção | `1.6rem` a `2.15rem` | cresce com a tela |
| título do topo | `2.1rem` a `3.4rem` | cresce com a tela |

### Regras de tipografia

- **Um `<h1>` por página.** Sem pular de `h2` para `h4`.
- **Campo de formulário com no mínimo 16px.** Abaixo disso o iPhone dá zoom
  sozinho quando a pessoa toca no campo, e ela perde o lugar na página.
- Tamanho novo não se inventa no meio do CSS: ou usa um da escala, ou entra aqui.

---

## 3. Espaçamento e cantos

Os espaços mais usados no site são **8, 10, 12, 14, 16, 20, 24, 28, 32, 40 e
56 px**. Dá para ver uma escala de 4 em 4 por baixo, mas ela não é seguida com
disciplina.

**Proposta:** padronizar em **4, 8, 12, 16, 24, 32, 40, 56, 80 px** e usar
sempre um desses. É o que o site mais usa hoje, só arredondado.

Cantos arredondados: `4px` (pequeno, campos e botões) e `8px` (cartões). Só
esses dois.

Sombra: uma única, suave, puxada para o petróleo — a mesma em todo o site.

---

## 4. Larguras e pontos de quebra

- Largura máxima do conteúdo: **1180px**
- Largura máxima de bloco de leitura: **640px** (linha longa cansa)
- Menu completo aparece a partir de **1700px**; abaixo disso, menu sanduíche
- Telas de teste obrigatórias: **375px** (celular), **768px** (tablet),
  **1280px** (computador)
- **Zero rolagem horizontal** nessas três larguras

---

## 5. Botões e toque

- Alvo de toque mínimo: **44px** de altura. Vale para botão, link de menu e
  campo. Exceção: link no meio de uma frase.
- Botão principal: fundo petróleo, texto branco.
- Botão secundário: fundo transparente, contorno visível. **Cuidado:** contorno
  petróleo sobre fundo petróleo desaparece — isso já aconteceu uma vez.
- Tudo que recebe teclado precisa de **foco visível**.
- Todo botão muda de aparência ao passar o mouse.

---

## 6. Tom de voz

Quem lê é dono de empresa ou gestor, chegando pelo celular, vindo de Instagram
ou WhatsApp. Ele quer saber se você resolve o problema dele e quanto custa.

- **Direto.** Primeira linha diz o que a empresa faz, sem rodeio.
- **Sem juridiquês de enfeite.** Citar lei quando a lei é o assunto; não para
  parecer técnico.
- **Preço com número.** "A partir de R$ X" vale mais que "consulte-nos".
- **Uma ação clara por seção.** Toda seção termina com um caminho para o
  contato.
- **Você**, não "o cliente" nem "a contratante".
- **Promessa que se cumpre.** Prazo escrito é prazo cumprido.

---

## 7. As contradições que eu tinha encontrado — o que foi feito

Esta seção era a lista de contradições que eu não quis resolver sozinho. O
Wesley decidiu cada uma em 19/10/2026. Registro aqui o que aconteceu com cada
item, para ninguém reabrir discussão já encerrada.

### Resolvidas no ramo `design/consertos-objetivos`

**(a) A fonte `Archivo Expanded` não existe.** Removida do endereço do Google e
da variável `--font-display-x`. O único elemento que a usava já caía em Archivo
comum na prática, então não mudou um pixel.

**(b) Cada página pedia um endereço de fonte diferente.** Eram quatro endereços
em sete páginas. Agora é um só, aproveitado do cache entre as páginas.

**(c) Quantos pesos manter.** Descoberta que mudou a decisão: a Archivo no
Google é **fonte variável** — pedir 5 pesos ou 2 baixa os **mesmos 3 arquivos**.
Cortar peso não economiza fonte, só texto de CSS. Ficaram **400, 600, 700 e
800**, que são os que o site de fato renderiza. O 400 ficou porque os
"(opcional)" ao lado dos rótulos de campo usam Archivo 400 para parecerem mais
leves que o rótulo. O 500 saiu: nenhuma página usa. O texto corrido segue em
Helvetica, por decisão do Wesley.

**(e) O erro de digitação `#34424849`.** Corrigido — mas tirar o "49" sozinho
não bastava: a cor opaca dá 1,78:1, ainda abaixo dos 3:1 exigidos. Ver (f).

**(f) Borda de componente fraca demais.** Resolvido com a separação de papéis:
`--border-ui` para contorno de componente, `--border-strong` segue sendo o
divisor sutil. Campos no escuro: **1,89:1 → 4,62:1**. Botão contornado da home
no claro: **1,59:1 → 3,78:1**.

### Ainda abertas, para uma etapa posterior

**(d) O mesmo nome de cor com valores diferentes.** `--border-strong` ainda vale
`#C3CFD3` na home e `#6E8795` nas páginas internas. A separação feita em (f)
resolveu o caso que causava problema de acessibilidade, mas a inconsistência de
nome continua.

**(g) Oito pontos de quebra:** 600, 720, 760, 860, 900, 1080, 1279 e 1699px.
Funciona; encarece mudança futura.

**(h) Nomes de cor que enganam.** `--gold` é `#4F6F80`, um azul-acinzentado.
`--petrol-tint` é `#E4E4E4`, cinza neutro. Atrapalha quem mexe no código, não o
visitante. Renomear quando mexermos nesses trechos.

### Achadas depois, pela revisão do designer, e já resolvidas

**(i) Um botão da home era invisível no tema claro.** "Ver o que entra na
conta": texto e borda brancos sobre cartão branco, **1,00:1**. Introduzido por
mim no commit `5f334c0`, ao reaproveitar no cartão uma classe feita para o
fundo petróleo. Corrigido com a classe `.btn-outline-petrol`: **9,14:1**.

**(j) A política de privacidade rolava 128px para o lado no celular.** Tabela de
4 colunas com 487px numa tela de 375px. Abaixo de 600px cada linha virou bloco
empilhado. **128px → 0px.**

**(k) A classe `.sr-only` era usada e não existia no CSS.** A legenda da tabela,
que era só para leitor de tela, aparecia na página. Classe definida.

---

## 8. Como usar este arquivo

Depois de aprovado, ele é a régua. Mudança de visual que contrarie o que está
aqui precisa primeiro mudar este arquivo — com a sua aprovação.

Quem mexe no visual do site sempre: lê isto, prototipa, mostra print de antes e
depois em 375px e 1280px, e espera o seu "pode".
