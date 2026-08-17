import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { ApiResponse, ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @ApiOperation({
        summary: "Cadastrar usuario"
    })
    @ApiResponse({
        status: 201,
        description: "Usuario cadastrado com sucesso"
    })
    @ApiResponse({
        status: 404,
        description: "Não foi possivel cadastrar o usuario"
    })
    @Post('cadastro')//Define que o endpoint(URL) vai ser auth/cadastro
    cadastrar(@Body() createUsuarioDto: CreateUsuarioDto){
        return this.authService.cadastrar(createUsuarioDto)
    }
}
