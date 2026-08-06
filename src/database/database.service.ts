import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPool, Pool } from 'mysql2/promise'; //decorators para a criação do banco de dados
@Injectable()

export class DatabaseService {
    // O Pool gerencia um conjunto de conexões com o banco
    private readonly pool : Pool
//estamos pegando pegando os dados do ConfigService(.env) e colocando dentro do configService do constructor
    constructor (private readonly configService: ConfigService){ 
        this.pool = createPool({
            //pegando os dados do .env
            //estamos inserindo os dados para a criação do banco de dados com base nas vatiaveis que criamos no .env atraves do configService
            host: this.configService.get<string>('DB_HOST'),
            //Usamos o "Number" neste caso, pois todas as variaveis do .env são lidas como texto, assim, transformamos a porta em número
            port: Number(this.configService.get<string>('DB_PORT')), //trazendo string e transformando em numero
            user: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME')
        })
    }
    // Método genérico que podera ser utilizado pelos services para executar comandos SQL (como INSERT, DELETE, etc)
    async query(sql: string, valores: any[] = []){// para conseguir executar códigos mysql
        //Executa o comando SQL com os valores recebidos
        const [resultado] = await this.pool.execute(sql, valores)
        //Retorna o resultado da consulta
        return resultado
    }
}
