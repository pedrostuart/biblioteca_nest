//Controller vai falar quando o service vai ser executado
import { Controller, Body, Post, Get, Param,/*Param é o que a gente coloca na url*/ ParseIntPipe, /*ParseIntPipe define que o id tem que ser um numero inteiro*/ 
Put} from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { LivrosService } from './livros.service';
import { updateLivroDto } from './dto/update-livro.dto';

@Controller('livros')
export class LivrosController {
    //injetamos o livro service como dependencia
    constructor (private readonly livrosService: LivrosService){}//construcutor aceesa outra classe pela class que eu estou
    @Post()
    criar(@Body() createLivroDto: CreateLivroDto){//puxando a função criar || no service e no controller eu estou aplicando as regras com o CreateLivroDto, é uma regra que tem que ser seguida(tipar essas coisas), mas da pra entender melhor se pensar que no service eu jogo no banco e aqui eu aplico as regras
        //O body captura os dados enviados no corpo da requisição
        //O DTO define como esses dados deverão ser validadedos
        return this.livrosService.criar(createLivroDto) // esta mandando executar o criar dentro do service
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
    @Put(':id')
    atualizar(@Param('id', ParseIntPipe) id: number, @Body() dados:updateLivroDto){ //lá no service estamos tipando e adicionando no banco aqui, estamos tipando o valores recebidos do @Body e do @Param (preenchendo eles)
        return this.livrosService.atulizar(id, dados)
    }
}