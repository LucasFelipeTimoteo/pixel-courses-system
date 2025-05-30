# 🎓 Pixel Courses

Sistema full stack que permite visualizar e se cadastrar em cursos de tecnologia

## ✨ Funcionalidades

**Backend:** Permite realizar diversas operações, como:
- registro
- login
- obter novo access token a partir do refresh token
- editar e deletar um usuário autenticado
- ver cursos disponíves
- dar uma nota para um curso
- deixar um comentário em um curso
- obter os cursos de um usuário autenticado
- obter um relatório com informações sobre um curso e a relação dos usuários com ele

**🚧Frontend:** ainda está em desenvolvimento, portanto, não faz uso de todos os recursos que o backend oferece. Todavia, podemos fazer algumas operações, como:
  - fazer login
  - registrar
  - ver cursos
  - obter relatório de um curso com gráficos

## 🛠️ Tecnologias E conceitos Utilizados

- **Node.js** & **TypeScript**
- **Express.js** 
- **modo de produção** com minificação de código e otimizações para código em produção
- **Jest** para testes automatizados
- **MongoDB** e **Mongoose** para armazenamento de dados
- **jsonWebToken** para auth
- **zod** para validações (apenas validações que não são parte das regras de negócio)
- **Biome**, **jest** e *supertest* para garantir padronização e bom funcionamento da aplicação
- **React** para crontrução do frontend

## 📦 Instalação

Clone o repositório:
```sh
git@github.com:LucasFelipeTimoteo/pixel-courses-system.git
cd pixel-courses-system
```
Instale as dependências
```sh
cd frontend
npm install

cd ../
cd backend
npm install
```
Configure as variáveis de ambiente no backend
- crie um arquivo **.env** no raiz da pasta backend
- se quiser, use como exemplo as envs do arquivo `example_env.txt`

## ▶️ Como Rodar
Frontend
```sh
npm run dev
```
Backend
```sh
npm run start:dev
```
## Testes (Backend)
os principais comandos de teste são
(ver lista completa em package.json)

```sh
npm run test
```
```sh
npm run test:watch
```
```sh
npm run test:e2e
```
```sh
npm run test:e2e:watch
```
## Documentação
Postman: A docuemntação da api (Backend) pode ser encontrada em backend/docs/postman/pixel-courses.postman_collection.json

basta abrir o postman e apertar em **importar**, então selecione ou arraste esse arquivo

## TODO (Coisas que não deu tempo de implementar ou resolver)
- o frontend não está completo, ainda há funcionalidades do backend que ele não implementa
- os tokens de acesso no front estão sendo salvos no localStorage. O ideal seria o backend enviar por cookies http-only
- rodar backend com docker e docker-compose para amior compatibilidade entre sistemas
