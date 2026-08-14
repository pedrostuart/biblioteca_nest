import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto'; 
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from 'src/database/database.service';
import { updateAutorDto } from './dto/update-autor.dto';
@Injectable()
export class AutoresService {
    
    constructor (private readonly databaseService: DatabaseService){}
    async criarAutor(createAutorDto: CreateAutorDto){
        const {nome, nacionalidade, ano_nascimento} = createAutorDto

        const sql = `
        INSERT INTO autor(
        nome, nacionalidade, ano_nascimento)
        VALUES(?,?,?)
        `
        const resultado = await this.databaseService.query(sql, [nome, nacionalidade, ano_nascimento]) as ResultSetHeader //mostra uma previa do que voce espera
        return{
            mensagem: "Autor cadastrado com sucesso",
            autor:{
                id: resultado.insertId,
                nome,
                nacionalidade,
                ano_nascimento
            }
        }
    }
    async exibir(){
        // o await serve pra dar um tempo para ele buscar essas informações
        const resultado = await this.databaseService.query(
        'SELECT * FROM autor'
        )
        return resultado
    }
    async exibirPorId(id:number){
        const resultado = await this.databaseService.query('SELECT * FROM autor WHERE id = ?', [id]) as RowDataPacket[]

        if (resultado.length === 0){
            throw new NotFoundException('Id não encontrado')
        }

        return resultado[0]
    }

    async atualizar(id:number, dados: updateAutorDto){
        const {nome, nacionalidade, ano_nascimento} = dados
        await this.exibirPorId(id)
        const resultado = await this.databaseService.query('UPDATE autor SET nome = ?, nacionalidade = ?, ano_nascimento = ? WHERE id = ?', [nome, nacionalidade, ano_nascimento, id])
        return{
            mensagem: 'Atualizado com sucesso',
            livro:{
                id: id,
                nome: nome,
                nacionalidade: nacionalidade,
                ano_nascimento: ano_nascimento
            }
        }
    }

    async deletar(id: number){
        await this.exibirPorId(id)
        const resultado = await this.databaseService.query('DELETE FROM autor WHERE id = ?', [id])
        return {
            mensagem: `autor do id: ${id} deletado`
        }
    }
}