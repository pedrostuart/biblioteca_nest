//Controller vai falar quando o service vai ser executado
import { Controller, Body, Post, Get, Param,/*Param é o que a gente coloca na url*/ ParseIntPipe, /*ParseIntPipe define que o id tem que ser um numero inteiro*/ 
Put,
Delete} from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { LivrosService } from './livros.service';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { ApiTags/*Pra definir secções*/ , ApiResponse/*A resposta(statur)*/ , ApiOperation,/*Explicação do endpoint*/ 
ApiBearerAuth} from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';//Pra eu poder usar a proteção de rota
import { AuthGuard } from 'src/auth/auth.guard';

//Api tags é cada module(autores e livros)
@ApiTags('Livros')//Coloca uma tag chamada "Livros", ele delimita essas seções ele ja fez isso automaticamento é mais um reforço

//cada endpoint é cada um desses @POST, @DELETE, @GET, @PUT (os que tem uma rota com o controller e um service)

@Controller('livros')
export class LivrosController {
    //injetamos o livro service como dependencia
    constructor (private readonly livrosService: LivrosService){}//construcutor aceesa outra classe pela class que eu estou
    @Post()

    //Sempre coloca a descrição desses endpoint Entre o metodo http(GET, PUT, DELETE etc...) e a função
    @ApiOperation({
        /*O proposito do end point*/summary: 'cadastra um novo livro'
    })
    @ApiResponse({//resposta que o endpoint dá, no caso essa resposta e se caso tudo ocorrer certo
        status: 201,
        description: 'Livro Cadastrado com sucesso'
    })
    @ApiResponse({//resposta caso der errado
        status: 404,
        description: 'Não foi possivel cadastrar o livro'
    })
    @UseGuards(AuthGuard)//Use Guarde e dentro do () qual guard eu quero usar
    @ApiBearerAuth()
    criar(@Body() createLivroDto: CreateLivroDto){//puxando a função criar || no service e no controller eu estou aplicando as regras com o CreateLivroDto, é uma regra que tem que ser seguida(tipar essas coisas), mas da pra entender melhor se pensar que no service eu jogo no banco e aqui eu aplico as regras
        //O body captura os dados enviados no corpo da requisição
        //O DTO define como esses dados deverão ser validadedos
        return this.livrosService.criar(createLivroDto) // esta mandando executar o criar dentro do service
    }
    

    @Get()
    @ApiOperation({
        summary: 'Exibe todos os livros cadastrados'
    })
    @ApiResponse({
        status: 201,
        description: 'Lista de livros retornada com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possivel retornar a lista de livros'
    })
    listarTodos(){
        return this.livrosService.listarTodos()//estou esxecutando uma função(listarTodos() ) do livrosService
    }
    @Get(':id')
    @ApiOperation({
        summary: 'Exibe o livro cadastrado conforme o id selecionado'
    })
    @ApiResponse({
        status: 201,
        description: 'Livro retornado com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possivel retornar o livro'
    })
    buscaPorID(
        @Param('id', ParseIntPipe) id: number //definindo que no 'id' que agente escrever tem que ser inteiro(ParseIntPipe faz isso), o id: number está servindo pra tipar o que vai retornar da função, diferente do id: 'number' da função buscaPorId, que eesta tipando a função
    ){
        return this.livrosService.buscaPorId(id)
    }
    @Put(':id')
    @ApiOperation({
        summary: 'Atualiza informações do livro'
    })
    @ApiResponse({
        status: 201,
        description: 'Dados do livro atualziado com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possivel atualizar os dados dos livros'
    })
    atualizar(@Param('id', ParseIntPipe) id: number, @Body() dados:UpdateLivroDto){ //lá no service estamos tipando e adicionando no banco aqui, estamos tipando o valores recebidos do @Body e do @Param (preenchendo eles)
        return this.livrosService.atulizar(id, dados)
    }
    @Delete(':id')
    @ApiOperation({
        summary: 'Deleta livros'
    })
    @ApiResponse({
        status: 201,
        description: 'Livro deletado com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possivel deletar o livro'
        
    })
    remover(@Param('id', ParseIntPipe) id:number){//o id esta em '' dentro do Param poruqe o param é o que esta dentro da url, ou seja, pega o valor(numero) que esta dentro da variavel id da url e definie como numero inteiro com ParseIntPipe
        return this.livrosService.remover(id)
    }
}