//Controller vai falar quando o service vai ser executado
import { Controller, Body, Post } from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { LivrosService } from './livros.service';

@Controller('livros')
export class LivrosController {
    //injetamos o livro service como dependencia
    constructor (private readonly livrosService: LivrosService){}//construcutor aceesa outra classe pela class que eu estou
    @Post()
    criar(@Body() CreateLivroDto: CreateLivroDto){//puxando a função criar || aqui eu estou de verdade aplicando as regras do dto, no service eu so jogo no banco
        //O body captura os dados enviados no corpo da requisição
        //O DTO define como esses dados deverão ser validadedos
        return this.livrosService.criar(CreateLivroDto) // esta mandando executar o criar dentro do service
    }
}
