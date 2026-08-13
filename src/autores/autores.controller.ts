import { Controller, Body, Post, ParseIntPipe, Param } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { AutoresService } from './autores.service';
import { Get } from '@nestjs/common';

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
    
}
