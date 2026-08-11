import { Controller, Body, Post } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { AutoresService } from './autores.service';

@Controller('autores')
export class AutoresController {
    constructor (private readonly autoresService: AutoresService){}
    @Post()
    criarAutor(@Body() createAutorDto: CreateAutorDto){
        return this.autoresService.criarAutor(createAutorDto)
    }

}
