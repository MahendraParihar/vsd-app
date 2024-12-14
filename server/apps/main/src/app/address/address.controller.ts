import { Controller, Get } from '@nestjs/common';
import { AddressService, Public } from '@server/common';
import { IAddressMaster } from '@vsd-common/lib';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {
  }

  @Public()
  @Get('master')
  async getMasterData(): Promise<IAddressMaster> {
    try {
      return await this.addressService.loadMasterData();
    } catch (e) {
      throw new Error(e);
    }
  }
}
