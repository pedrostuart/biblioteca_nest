// A logica do que vai acontecer (service)
import { Injectable, NotFoundException } from '@nestjs/common';
import { ResultSetHeader } from 'mysql2';//retorno de resultado do banco de dados, 
import { DatabaseService } from 'src/database/database.service';
import { CreateLivroDto } from './dto/create-livro.dto'; // importando o DTO (regras)
import { create } from 'domain';
import { RowDataPacket } from 'mysql2'; // para fazer busca por id, com isso eu trago os dados do banco e consigo explorar um por um
import { updateLivroDto } from './dto/update-livro.dto';

@Injectable()
export class LivrosService {
    // a logica quando cadastrar um livro
    //vamos puxar o database service e colocar aqui, pra colocar os livrs dentro do banco de dados
    constructor (private readonly databaseService: DatabaseService){}//aqui ja injetamos o databseservice dentro do livrosService
        async criar (createLivroDto : CreateLivroDto){//a gente passa o "CreateLivroDto" para o parametro("createLivroDto") para nao modificar o "CreateLivroDto"
            //aqui estamos desestruturando o dto para que a gente receba os valores
            const { titulo, autor, ano, disponivel } = createLivroDto;//Dto recebe o que a gente escreve e aqui esta passando pro banco
            
            const sql = //aqui a gente vai inserir no nosso banco de dados
            ` 
            INSERT INTO livro(
            titulo, autor, ano, disponivel)
            VALUES(?,?,?,?)
            `
            //o que esta sendo mandado pro resultado é a previa do que a geten espera(no caso a tabela preenchida), e la em baixo o "id:" ta pegando essa variavel e inserindo um id que vai ser auto incrementado
            //Executa o insert e informa para nós o tipo esperado do resultado
            const resultado = await this.databaseService.query(sql, [ // para conseguir verificar o resultado, como se fosse um status é um padrão
                titulo, autor, ano, disponivel
            ]) as ResultSetHeader // confirmação do que deveria acontecer

            return { 
                mensagem: 'Livro cadastrado com sucesso',
                livro:{ // isso aqui é só pra pessoa ter um retorno visual do que ela colocou no POST, o que ela colocou vai ser exibido aqui no return
                    id: resultado.insertId, //pegando o id do banco (o id que o banco gerou)
                    titulo,
                    autor,
                    ano,
                    disponivel
                }
            }
        }
        //Exibir todas as buscas (GET)
        async listarTodos(){
            //A constante resultado rerá armazenada todos os livros cadastrados na atbela 'livro' do banco de dados
            const resultado = await this.databaseService.query( //estou executando dentro do databaseService uma query com o insert
                'SELECT * FROM livro'
            )
            return resultado
        }
        //Exibir as buscas pelo id
        async buscaPorId(id:number){ // o parametro "id" recebendo um número
            //Executa uma consulta no banco de dados, buscando o livro que o ID informado
            const resultado = await this.databaseService.query(
                'SELECT * FROM livro WHERE id = ?', [id] //ele ([id]) ta substitundo o "?"
            ) as RowDataPacket[] // ele traz um banco de dados como se fosse um json, ficando posivel de conseguir encontrar o id, diferente do ResultSetHeader
            // o RowDataPacket[] informa ao TypeScript que o resultado da consulta será tratado como uma lista de registros retornados pelo banco de dados
            //O RowDataPacket tem colchetes([]) pois como ele vem como modelo json, a gente adiciona ele em um array pra ficar facil para retornar caso vim algum erro


            //Essa codição irá verificar se a consulta não encontra nenhum livro
            //Se a lista estiver vazia, seu tamanho (length) 
            if(resultado.length === 0 ){
                throw new NotFoundException('Livro não encotrado') //ao inves de usar um mensagem: 'Livro não encotrado', a geten usa o NotFoundException que seue boas praticas e é mais certeiro para esse erros poruqe ele tambem traz o statuscode automaticamente
            }

            return resultado[0]
        }
        //Atualizar Dados
        async atulizar(id: number, dados: updateLivroDto){//eu coloco update dentro de dados pra conseguir trazer o update.dto para aqui, e id:number é porque vamos atualizar por id
            //Antes de realizar a atualização buscamos o livro por ID e caso o livro não exista o método 'BuscarPorId' já lança a exceção do NotFound e tambem usamos pra procurar o id ele não vai exibir o id porque lá no controller a função atualizar nao vai liberar isso. no final utilizaremos a buscar por id só pra buscar o id e exibir o erro
            await this.buscaPorId(id)//eu

            //esse "[dados.titulo, dados.autor, dados.ano, dados.disponivel, id]" é mesma coisa do POST lá em cima "const { titulo, autor, ano, disponivel } = createLivroDto" a diferencia é que aqui não estamos passando os valores do DTO para uma variavel e sim direto para o codigo sql 
            await this.databaseService.query('UPDATE livro SET titulo = ?, autor = ?, ano = ?, disponivel = ? WHERE id = ?', [dados.titulo, dados.autor, dados.ano, dados.disponivel, id])
            
            //Se a atualizção for bem sucessida o usuario recebera uma mensagem
            return{
                mensagem: 'livro atualizado com sucesso',
                livro:{
                    id: id,
                    titulo: dados.titulo,
                    autor: dados.autor,
                    ano: dados.ano,
                    disponivel: dados.disponivel
                }
            }
        }

        //Deletar Dados

        async remover(id: number){
            await this.buscaPorId(id)
            await this.databaseService.query('DELETE FROM livro WHERE id = ?', [id])
            return {
                mensagem: `livro do ${id} excluido com sucesso`
            }
        }
}
