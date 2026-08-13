import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto'; 
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from 'src/database/database.service';
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
}