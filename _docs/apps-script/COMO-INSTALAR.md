# Como ligar o envio por e-mail

Cinco passos, uma vez só. Quem faz é você — é a sua conta Google.

1. Abra <https://script.google.com> e clique em **Novo projeto**.
2. Apague o conteúdo do `Código.gs` e cole o arquivo `Codigo.gs` desta pasta.
3. Dê um nome ao projeto, por exemplo **Formulários do site**.
4. **Implantar → Nova implantação → Tipo: App da Web**:
   - *Executar como:* **Eu**
   - *Quem pode acessar:* **Qualquer pessoa**
   - Clique em **Implantar** e autorize quando o Google pedir.
5. Copie o endereço que termina em `/exec` e me mande. Eu coloco nos três
   formulários e confiro o envio.

## O que conferir depois

- O primeiro envio precisa chegar em `comercial@folhaegestao.com.br`.
- Se não chegar, olhe o spam: a mensagem sai da sua conta Google, não do Titan.
- O remetente aparece como **Site WF Folha & Gestão**, e o *responder para* já
  volta para comercial@.

## O que este código faz e não faz

- **Não guarda nada** por padrão. Só monta e envia a mensagem. Se quiser uma
  cópia em planilha, mude `GUARDAR_NA_PLANILHA` para `true` e preencha o ID.
- **Não registra dado pessoal no log.** Em caso de erro grava só o tipo do erro,
  seguindo a mesma regra de privacidade do app.
- **Descarta robô em silêncio** pelo campo-isca `site`, invisível na página, e
  aceita no máximo 5 envios por minuto.
- Campo vazio não aparece no e-mail, e as caixas de consentimento não entram no
  corpo — ficam registradas pelo próprio envio.

## Quando a Política de Privacidade for publicada

Ela precisa dizer que os formulários são processados pelo Google (Apps Script) e
entregues por e-mail na caixa comercial. É o achado L-6 da auditoria.
