import { Controller, Body, Post, ParseIntPipe, Param, Put, Delete } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { AutoresService } from './autores.service';
import { Get } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { updateAutorDto } from './dto/update-autor.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('autores')

@Controller('autores')
export class AutoresController {
    constructor (private readonly autoresService: AutoresService){}
    @Post()
    @ApiOperation({
        summary: 'Inserir um autor'
    })
    @ApiResponse({
        status: 201,
        description: 'Autor cadastrado com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possivel cadastra o autor'
    })
    criarAutor(@Body() createAutorDto: CreateAutorDto){
        return this.autoresService.criarAutor(createAutorDto)
    }


    @Get()
    @ApiOperation({
        summary: 'Exibir autores'
    })
    @ApiResponse({
        status: 200,
        description: 'Autores exibidos com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possivel exibir os autores'
    })
    exibir(){
        return this.autoresService.exibir()
    }


    @Get(':id')
    @ApiOperation({
        summary: 'Exibir autores por id'
    })
    @ApiResponse({
        status: 200,
        description: 'Autores exibidos por id com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possivel exibir o autor por id'
    })
    exibirPorId(@Param('id', ParseIntPipe) id: number){
        return this.autoresService.exibirPorId(id)
    }


    @Put(':id')
    @ApiOperation({
        summary: 'Atualizar informações do autor'
    })
    @ApiResponse({
        status: 201,
        description: 'Autor atualizado com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possivel atualizar o autor'
    })
    atualizar(@Param('id', ParseIntPipe) id: number, @Body() dados: updateAutorDto){
        return this.autoresService.atualizar(id, dados)
    }


    @Delete(':id')
    @ApiOperation({
        summary: 'Deletar autores por id'
    })
    @ApiResponse({
        status: 200,
        description: 'Autor deletado com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possivel deletar o autor'
    })
    deletar(@Param('id', ParseIntPipe)id:number){
        return this.autoresService.deletar(id)
    }


}
