//Controller vai falar quando o service vai ser executado
import { Controller, Body, Post, Get, Param,/*Param é o que a gente coloca na ur*/ ParseIntPipe /*ParseIntPipe define que o id tem que ser um numero inteiro*/ } from '@nestjs/common';
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

    @Get()
    listarTodos(){
        return this.livrosService.listarTodos()//estou esxecutando uma função(listarTodos() ) do livrosService
    }
    @Get(':id')
    buscaPorID(
        @Param('id', ParseIntPipe) id: number //definindo que no 'id' que agente escrever tem que ser inteiro(ParseIntPipe faz isso), o id: number está servindo pra tipar o que vai retornar da função, diferente do id: 'number' da função buscaPorId, que eesta tipando a função
    ){
        return this.livrosService.buscaPorId(id)
    }

    

}
