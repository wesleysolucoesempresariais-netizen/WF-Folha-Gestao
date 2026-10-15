# Testes do protótipo — site folhaegestao.com.br

**Data:** 14/10/2026 · **Alvo:** `prototipos/site-2026-10/` em `http://localhost:8789`
**Ferramenta:** playwright-cli 0.1.22 com o Chrome do Mac · **Produção não foi tocada.**

## Resultado

**6 páginas, 0 falhas em aberto.** Três defeitos foram encontrados durante a bateria
e corrigidos; estão registrados abaixo com a correção aplicada.

## Estrutura e acessibilidade

| Verificação | index | questionário | rescisão (form) | demonstração | rescisão (página) | prévia e-mail |
|---|---|---|---|---|---|---|
| `<!DOCTYPE html>` | ok | ok | ok | ok | ok | ok |
| `<html lang="pt-BR">` | ok | ok | ok | ok | ok | ok |
| `<title>` | ok | ok | ok | ok | ok | ok |
| Um só `<h1>` | ok | ok | ok | ok | ok | — |
| `<main>` | ok | ok | ok | ok | ok | — |
| Link "pular para o conteúdo" | ok | ok | ok | ok | ok | — |
| Saltos de nível de título | 0 | 0 | 0 | 0 | 0 | — |
| Campo sem rótulo associado | 0 | 0 | 0 | 0 | — | — |
| SVG decorativo exposto a leitor de tela | 0 | — | — | — | — | — |
| Link para lugar nenhum (`href="#"`) | 0 | 0 | 0 | 0 | 0 | — |

## Responsivo

Overflow horizontal medido em 375px, 768px e 1280px: **0 em todas as páginas**.
Alvo de toque abaixo de 44px: **0** nas três larguras, depois da correção T-1.
Fonte de campo abaixo de 16px, que faria o iPhone dar zoom: **0**.
Largura da coluna de leitura em 1280px: 590px, dentro dos 65 caracteres.

## Contraste (WCAG 2.1)

| Combinação | Razão | Mínimo | Situação |
|---|---|---|---|
| Rótulo `#1A1A1A` sobre branco | 17,40:1 | 4,5 | AAA |
| Botão primário: branco sobre petróleo | 9,14:1 | 4,5 | AAA |
| Botão secundário: petróleo sobre branco | 9,14:1 | 4,5 | AAA |
| Bloco sensível `#6B4B00` sobre `#FDF6E7` | 7,41:1 | 4,5 | AAA |
| Texto do topo `#DCE6EC` sobre petróleo | 7,21:1 | 4,5 | AAA |
| Texto de apoio `#4C5A61` sobre branco | 7,14:1 | 4,5 | AAA |
| Mensagem de erro `#B3261E` sobre branco | 6,54:1 | 4,5 | AA |
| Texto de ajuda `#646E73` sobre branco | 5,22:1 | 4,5 | AA |
| Borda de campo `#6E8795` sobre branco | 3,78:1 | 3,0 (1.4.11) | passa |

## Comportamento dos formulários

Testado nos três, com envio real simulado:

- Envio vazio marca todos os campos obrigatórios e põe o foco no primeiro
  (rescisão: 11 campos; demonstração: 8).
- WhatsApp com menos de 10 dígitos é recusado.
- **Trava do bloco sensível:** marcar "gestante" sem a autorização específica
  bloqueia o envio, exibe a mensagem e move o foco para a caixa de autorização.
  Autorizando, o envio conclui. É o que a LGPD art. 11, I exige.
- Confirmação substitui o formulário, recebe `role="status"` e o foco.
- Campo-isca `site` fica fora da validação e é descartado pelo Apps Script.

## Teclado

Em navegador real, com a janela em foco: o primeiro **Tab** revela o link
"Pular para o conteúdo" com contorno de 3px visível (print
`prints/teclado-1-pular.png`). O hambúrguer do item *d* alterna
`aria-expanded` entre `false` e `true` e fecha com **Esc**.

## Console e rede

Nenhum erro de console nas seis páginas. Nenhum link interno quebrado
(verificação arquivo a arquivo). Nenhuma requisição a terceiro: o protótipo não
carrega fonte externa nem script de fora.

## Defeitos encontrados e corrigidos durante a bateria

**T-1 · Alvo de toque de 43,5px** — os links "Política de Privacidade" e "Seus
direitos" dentro do parágrafo final mediam 16px e 36px. Corrigido com
`padding-block:15px`, que aumenta a área de toque sem alterar o texto. Agora 44px
e 64px. *Arquivo: `base.css`, regra `.form-wf .politica a`.*

**T-2 · Borda de campo com 1,59:1** — a variável `--border-strong: #C3CFD3`,
herdada do site em produção, não alcança os 3:1 que a WCAG 1.4.11 pede para
contorno de componente. Trocada por `#6E8795`, que dá 3,78:1 e permanece na
família de cor da marca. *Arquivo: `base.css`, `:root`.* **Vale corrigir também
no site**, onde o problema existe nos formulários de `/ponto/` e
`/calculo-rescisao/`.

**T-3 · Campo-isca entrando na validação** — o campo anti-robô `site` é exigido
pelo laço que valida todos os campos, o que travaria o envio. Passou a ser
ignorado. *Arquivo: `form.js`, função `valida`.*

## Limites deste teste

- O envio por e-mail **não foi testado de ponta a ponta**: o Apps Script ainda
  não foi publicado, porque isso acontece na conta Google do dono. O código está
  em `apps-script/Codigo.gs` e a prévia do e-mail foi gerada rodando as funções
  reais desse arquivo.
- Não houve teste com leitor de tela real (VoiceOver). As verificações de
  rótulo, marco e foco são estruturais.
- Desempenho não foi medido com Lighthouse: o protótipo não tem as imagens nem o
  conteúdo completo do site, então o número não seria comparável.
