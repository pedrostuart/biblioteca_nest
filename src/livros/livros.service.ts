// A logica do que vai acontecer (service)
import { Injectable } from '@nestjs/common';
import { ResultSetHeader } from 'mysql2';//retorno de resultado do banco de dados, 
import { DatabaseService } from 'src/database/database.service';
import { CreateLivroDto } from './dto/create-livro.dto'; // importando o DTO (regras)
import { create } from 'domain';

@Injectable()
export class LivrosService {
    // a logica quando cadastrar um livro
    //vamos puxar o database service e colocar aqui, pra colocar os livrs dentro do banco de dados
    constructor (private readonly databaseService: DatabaseService){}//aqui ja injetamos o databseservice dentro do livrosService
        async criar (createLivroDto : CreateLivroDto){//a gente passa o "CreateLivroDto" para o parametro("createLivroDto") para nao modificar o "CreateLivroDto"
            //aqui estamos desestruturando o deto para que a gente receba os valores
            const { titulo, autor, ano, disponivel } = createLivroDto;//Dto recebe o que a gente escreve e aqui esta passando pro banco

            
            const sql = //aqui a gente vai inserir no nosso banco de dados
            ` 
            INSERT INTO livro(
            titulo, autor, ano, disponivel)
            VALUES(?,?,?,?)
            `
            //Executa o insert e informa para nós o tipo esperado do resultado
            const resultado = await this.databaseService.query(sql, [ // para conseguir verificar o resultado, como se fosse um status é um padrão
                titulo, autor, ano, disponivel
            ]) as ResultSetHeader // confirmação do que deveria acontecer

            return {
                meensagem: 'Livro cadastrado com sucesso',
                livro:{
                    id: resultado.insertId, //pegando o id do banco (o id que o banco gerou)
                    titulo,
                    autor,
                    ano,
                    disponivel
                }
            }
    }


}
