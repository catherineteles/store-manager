# Projeto Store Manager! 

### Sobre a Aplicação

  Primeira API utilizando a arquitetura MSC (model-service-controller)!

  A API a é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Utilizando o banco de dados MySQL para a gestão de dados. Além disso, a API deve ser RESTful.


#### Tabelas

  O banco tem três tabelas: 
  - A tabela `products`, com os atributos `id` e `name`;
  - A tabela `sales`, com os atributos `id` e `date`;
  - A tabela `sales_products`, com os atributos `sale_id`, `product_id` e `quantity`;
  - O script de criação do banco de dados pode ser visto [aqui](migration.sql);
  - O script que popula o banco de dados pode ser visto [aqui](seed.sql);

  
#### Dicas de scripts prontos

  - Criar o banco de dados e gerar as tabelas:
  ```sh
    npm run migration
  ```

  - Limpar e popular o banco de dados:
  ```sh
    npm run seed
  ```

  - Iniciar o servidor Node:
  ```sh
    npm start
  ```
  - Executar os testes avaliativos da Trybe:
  ```sh
    npm test
  ```

  - Executar os testes de unidade:
  ```sh
    npm run test:mocha
  ```

  - Executar o linter:
  ```sh
    npm run lint
  ```
#### Rodando a aplicação com o Docker

Para rodar a aplicação com o Docker basta utilizar o comando ```sh
    docker-compose up
  ```  
