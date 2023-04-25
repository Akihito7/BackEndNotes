DATA DEFINITON LANGUAGE (ALTER TABLE COMANDS)

ADD
DROP
RENAME TO

FUNCIONA PARA TABELA E PARA AS COLUNAS

EXEMPLOS:

ALTER TABLE users RENAME TO client;(mudando nome da tabela)

ALTER TABLE users RENAME COLUMN Id To cpf;(mudando nome de uma coluna)

ALTER TABLE users DROP COLUMN name;(deletando uma coluna, dropando)

ALTER TABLE users ADD age VARCHAR NOT NULL;(adicionando uma coluna na tabela)

--------------------------------------------------------------------------------------
  

Data Manipulation Language (CRUD)

C - CREATE IN SQL INSERT INTO
R - READ IN SQL SELECT 
U - UPDATE IN SQL UPDATE
D - DELETE IN SQL DELETE

exemplos:

SELECT * FROM users; (vai selecionar todas informações de users, * = all)

SELECT name,email FROM users; (aqui você seleciona algo especifico)

UPDATE users SET name = 'Xamazin' WHERE id = 3;(Mudando o valor d uma coluna, mas precisa especificar onde é se nao vai alterar para todos users)

INSERT INTO users (name,email,password) VALUES ('neymar','ney@gmail.com'...); (inserindo valores em uma tabela)

DELETE FROM users WHERE id = 3 (aqui estamos deletando uma linha inteira do banco de dados)

