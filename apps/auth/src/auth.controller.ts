import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Post, UseGuards } from '@nestjs/common';
import { auth } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { API_SERVICE } from './constants';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtGuard, RefreshJwtGuard, GetUser, UtilsService } from '@app/common';
import type { User } from '@prisma/client';
import { LoginUserDto, RefreshTokenDto } from './dto/loginUser.dto';


@ApiTags('auth')
@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private auth: auth, private utilService: UtilsService) { }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'register agents' })
  @Post("register")
  async register(@Body() dto: RegisterUserDto) {
    return this.utilService.createResponse("success", {
      status: HttpStatus.CREATED,
      data: await this.auth.registerUser(dto)
    })
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ApiOperation({ summary: 'login agents' })
  async login(@Body() dto: LoginUserDto) {
    return this.utilService.createResponse("success", {
      status: HttpStatus.OK,
      data: await this.auth.loginUser(dto)
    })
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RefreshJwtGuard)
  @ApiOperation({ summary: 'refresh agent token' })
  @Post('refresh-token')
  async refreshToken(@GetUser() user: User, @Body() dto: RefreshTokenDto) {
    return this.utilService.createResponse("success", {
      status: HttpStatus.CREATED,
      data: await this.auth.refreshToken(user)
    })
  }

  @MessagePattern({ cmd: 'create_agent' })
  registerAgent(@Payload() data: any): string {
    this.logger.log(`${API_SERVICE}: ${data}`)
    return this.auth.registerAgent(data)
  }
}
