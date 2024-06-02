import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { PaymentserviceService } from './paymentservice.service';
import { GetUser, JwtGuard, Roles, RolesGuard, UtilsService } from '@app/common';
import { Role, User } from '@prisma/client';
import { DataBundleQueryDto, GetAirTimeDto, GetDataDto, PayForUtilityDto, ValidateUtilityDto } from './dto/payment.dto';


@Controller("bills")
export class PaymentserviceController {
  constructor(
    private paymentserviceService: PaymentserviceService,
    private utilService: UtilsService
  ) { }

  //ACCESSIBLE TO ONLY AGENTS
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  @Roles(Role.AGENT)
  async getBills(@GetUser() user: User): Promise<any> {
    return this.utilService.createResponse("success", {
      status: HttpStatus.OK,
      data: await this.paymentserviceService.getBills(user)
    })
  }


  @HttpCode(HttpStatus.OK)
  @Get('networks')
  getAllAvailableNetworks() {
    const networks = [
      { name: 'MTN', code: 'MTN', id: 1 },
      { name: 'AIRTEL', code: 'AIRTEL', id: 2 },
      { name: 'GLO', code: 'GLO', id: 3 },
      { name: '9MOBILE', code: '9MOBILE', id: 4 },
    ]
    return this.utilService.createResponse('success', {
      status: HttpStatus.OK,
      data: networks
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('utility')
  getUtilityBills() {
    return this.utilService.createResponse('success', {
      status: HttpStatus.OK,
      data: ['PREPAID', 'POSTPAID']
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('get-utility-billers')
  async getUtilityServices() {
    return this.utilService.createResponse('success', {
      status: HttpStatus.OK,
      data: await this.paymentserviceService.getUtilityServices(),
    });
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.AGENT)
  @Post('validate-utility')
  async validateUtility(
    @GetUser() user: User,
    @Body() dto: ValidateUtilityDto,
  ) {
    return this.utilService.createResponse('success', {
      status: HttpStatus.OK,
      data: await this.paymentserviceService.validateUtility(user, dto),
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('get-data-bundle')
  async getDataBundle(@Query() query: DataBundleQueryDto) {
    return this.utilService.createResponse('success', {
      status: HttpStatus.OK,
      data: await this.paymentserviceService.getDataBundle(query),
    });
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Post('get-airtime')
  @Roles(Role.AGENT)
  async getAirTime(@GetUser() user: User, @Body() dto: GetAirTimeDto) {
    return this.utilService.createResponse('success', {
      status: HttpStatus.OK,
      data: await this.paymentserviceService.getAirTime(user, dto),
    });
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.AGENT)
  @Post('get-data')
  async getData(@GetUser() user: User, @Body() dto: GetDataDto) {
    return this.utilService.createResponse('success', {
      status: HttpStatus.OK,
      data: await this.paymentserviceService.getData(user, dto),
    });
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('pay')
  async payForUtility(@GetUser() user: User, @Body() dto: PayForUtilityDto) {
    return this.utilService.createResponse('success', {
      status: HttpStatus.OK,
      data: await this.paymentserviceService.payForUtility(user, dto),
    });
  }




}

