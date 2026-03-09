import { Controller, Get, Header, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('export')
@UseGuards(JwtAuthGuard)
export class ExportController {
  @Get('csv')
  @Header('Content-Type', 'text/csv')
  csv() {
    return 'date,type,amount,category,description\n2026-03-01,expense,120,Food,lunch';
  }
}
