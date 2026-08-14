import { Controller, Body, Post, ParseIntPipe, Param, Put, Delete } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { AutoresService } from './autores.service';
import { Get } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { updateAutorDto } from './dto/update-autor.dto';

@Controller('autores')
export class AutoresController {
    constructor (private readonly autoresService: AutoresService){}
    @Post()
    criarAutor(@Body() createAutorDto: CreateAutorDto){
        return this.autoresService.criarAutor(createAutorDto)
    }
    @Get()
    exibir(){
        return this.autoresService.exibir()
    }
    @Get(':id')
    exibirPorId(@Param('id', ParseIntPipe) id: number){
        return this.autoresService.exibirPorId(id)
    }
    @Put(':id')
    atualizar(@Param('id', ParseIntPipe) id: number, @Body() dados: updateAutorDto){
        return this.autoresService.atualizar(id, dados)
    }
    @Delete(':id')
    deletar(@Param('id', ParseIntPipe)id:number){
        return this.autoresService.deletar(id)
    }
}
