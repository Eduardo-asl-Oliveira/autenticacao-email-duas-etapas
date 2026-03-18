.me# 🔐 Sistema de Autenticação de E-mail em Duas Etapas (2FA)

Um sistema completo (Full-Stack) de verificação de identidade em duas etapas. O projeto simula o fluxo real utilizado por bancos e grandes plataformas para confirmar a identidade de um usuário através do envio de um código temporário por e-mail.

## 🚀 Tecnologias Utilizadas

**Backend:**
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/) (Criação da API REST)
* [Nodemailer](https://nodemailer.com/) (Disparo de e-mails)
* [CORS](https://www.npmjs.com/package/cors) (Segurança de rotas)

**Frontend:**
* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/) (Build tool)
* CSS puro para estilização responsiva e moderna

## ✨ Funcionalidades

* **Validação de Formato:** O backend verifica via regras de negócio se o e-mail inserido possui um formato válido antes de processar a requisição.
* **Geração de Código Aleatório:** Criação de um token numérico de 6 dígitos.
* **Disparo de E-mail Real:** Integração com o serviço Ethereal para simular o envio real do e-mail para a caixa de entrada do usuário.
* **Gerenciamento de Memória Temporária:** Uso da estrutura `Map` do JavaScript para armazenar os códigos gerados.
* **Segurança de Tempo (Timeout):** Os códigos expiram e são apagados da memória automaticamente após 10 minutos.
* **Interface Dinâmica:** O frontend em React gerencia os estados da aplicação, trocando de tela suavemente entre a inserção do e-mail e a validação do código.

## 🛠️ Como rodar o projeto localmente

Para rodar este projeto na sua máquina, você precisará de dois terminais abertos: um para o Servidor (Backend) e outro para a Interface (Frontend).

### 1. Clonando o repositório
```bash
git clone https://github.com/Eduardo-asl-Oliveira/autenticacao-email-duas-etapas.git
cd autenticacao-email-duas-etapas