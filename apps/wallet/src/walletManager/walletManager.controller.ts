import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { wallet } from './walletManager.service';
import { CreateWalletDto, GetWalletDto, UpdateWalletBalanceDto, WalletToWalletTransferDto } from './dto/wallet.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { User } from '@prisma/client';
import { JwtGuard, GetUser, Roles, RolesGuard, UtilsService } from '@app/common';
import { Role } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FundWalletDto } from "./dto/wallet.dto"

@ApiTags('wallets')
@Controller('wallets')
export class WalletController {
  constructor(
    private readonly wallet: wallet,
    private utilService: UtilsService
  ) { }

  @EventPattern({ cmd: "create_wallet" })
  async createWallet(@Payload() data: CreateWalletDto): Promise<any> {
    return this.utilService.createResponse("success", {
      status: HttpStatus.OK,
      data: await this.wallet.createWallet(data)
    })
  }


  @MessagePattern({ cmd: "get_wallet" })
  async getWallet(@Payload() data: GetWalletDto): Promise<any> {
    return this.utilService.createResponse("success", {
      status: HttpStatus.OK,
      data: await this.wallet.getWallet(data)
    })
  }

  @EventPattern({ cmd: "charge_wallet_balance" })
  async chargeWalletBalance(@Payload() data: UpdateWalletBalanceDto): Promise<any> {
    return this.utilService.createResponse("success", {
      status: HttpStatus.OK,
      data: await this.wallet.chargeWalletBalance(data)
    })
  }



  @MessagePattern({ cmd: "fund_wallet" })
  async fundWallet(@Payload() data: FundWalletDto): Promise<any> {
    return this.utilService.createResponse("success", {
      status: HttpStatus.OK,
      data: await this.wallet.fundWallet(data)
    })
  }

  @MessagePattern({ cmd: "transfer_to_wallet" })
  async walletToWalletTransfer(@Payload() data: WalletToWalletTransferDto): Promise<any> {
    return this.utilService.createResponse("success", {
      status: HttpStatus.OK,
      data: await this.wallet.walletToWalletTransfer(data)
    })
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  @Roles(Role.AGENT)
  @ApiOperation({ summary: 'manually create wallet for agent if auto fails' })
  async manualWalletCreation(@GetUser() user: User): Promise<any> {
    return this.utilService.createResponse("success", {
      status: HttpStatus.CREATED,
      data: await this.wallet.manualWalletCreation(user)
    })
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Get("my-wallet")
  @Roles(Role.AGENT)
  @ApiOperation({ summary: 'get user wallet' })
  async myWallet(@GetUser() user: User) {
    return this.utilService.createResponse("success", {
      status: HttpStatus.OK,
      data: await this.wallet.myWallet(user)
    })
  }

  @Get(':id')
  @ApiOperation({ summary: 'get user wallet by wallet id' })
  async findOne(@Param('id') id: string) {
    return this.utilService.createResponse("success", {
      status: HttpStatus.OK,
      data: await this.wallet.findOne(+id)
    })
  }
}
