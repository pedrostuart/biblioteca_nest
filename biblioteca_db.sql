create database biblioteca_db;
use biblioteca_db;
create table livro(
	id int auto_increment primary key,
    titulo varchar(150) not null,
    autor varchar(100) not null,
    ano int not null,
    disponivel boolean not null default true
)

create table `autor`(
	id int auto_increment primary key,
    nome varchar(100) not null,
    nacionalidade varchar(100) not null,
    ano_nascimento int(4) not null
)

create table `usuario`(
	id int auto_increment primary key,
    nome varchar(200) not null,
    email varchar(200) not null,
    senha varchar(255) not null
)