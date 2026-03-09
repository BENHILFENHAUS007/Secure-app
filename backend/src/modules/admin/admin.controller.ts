import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  @Get('users')
  users() {
    return [{ id: 'u1', phoneNumber: '+919876543210', transactions: 10 }];
  }

  @Get('webhook-logs')
  webhookLogs() {
    return [{ id: 'log1', status: 'processed', payload: '{...}' }];
  }
}
