import { Injectable } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto'; 
import { ResultSetHeader } from 'mysql2';
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
        const resultado = await this.databaseService.query(sql, [nome, nacionalidade, ano_nascimento]) as ResultSetHeader
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
    
}
