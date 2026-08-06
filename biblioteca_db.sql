create database biblioteca_db;
use biblioteca_db;
create table livro(
	id int auto_increment primary key,
    titulo varchar(150) not null,
    autor varchar(100) not null,
    ano int not null,
    disponivel boolean not null default true
)