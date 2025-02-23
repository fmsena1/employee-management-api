# Dass Employee Management

Gerencie o cadastro de funcionários para distribuição de brindes.

## 🛠️ Tecnologias
- Vue.js (Frontend)
- Node.js + Express + Sequelize (Backend)
- MySQL (Banco de Dados)
- Docker + Docker Compose

## 🚀 Como rodar
1. Clone o repositório.
2. Execute: docker-compose up --build

## Adicionar bagde


## Estrutura de pastas 
/dass-employee-management
├── server
│   ├── src
│   │   ├── config
│   │   │   ├── database.js
│   │   │   ├── logger.js
│   │   │   └── swagger.js
│   │   ├── domain
│   │   │   ├── entities
│   │   │   │   ├── Employee.js
│   │   │   │   └── User.js
│   │   │   ├── repositories
│   │   │   │   ├── EmployeeRepository.js
│   │   │   │   └── UserRepository.js
│   │   │   └── usecases
│   │   │       ├── CreateEmployee.js
│   │   │       └── AuthenticateUser.js
│   │   ├── infrastructure
│   │   │   ├── orm
│   │   │   │   ├── SequelizeEmployeeRepository.js
│   │   │   │   └── SequelizeUserRepository.js
│   │   │   ├── services
│   │   │   │   └── SendEmailService.js
│   │   │   └── web
│   │   │       ├── controllers
│   │   │       │   ├── AuthController.js
│   │   │       │   └── EmployeeController.js
│   │   │       ├── middleware
│   │   │       │   └── AuthMiddleware.js
│   │   │       └── routes
│   │   │           └── index.js
│   │   ├── app.js
│   │   └── server.js
├── client
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── layouts
│   │   ├── pages
│   │   ├── router
│   │   ├── stores
│   │   ├── App.vue
│   │   └── main.js
├── .env
├── package.json
└── README.md