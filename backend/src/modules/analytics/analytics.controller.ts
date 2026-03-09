import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  @Get('month')
  monthSummary() {
    return {
      month: '2026-03',
      income: 2500,
      expense: 1400,
      savings: 1100,
      categoryBreakdown: [
        { category: 'Food', total: 300 },
        { category: 'Travel', total: 250 },
      ],
    };
  }
}
