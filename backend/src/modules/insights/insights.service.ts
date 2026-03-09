import { Injectable } from '@nestjs/common';

@Injectable()
export class InsightsService {
  generateWeeklyInsight(currentWeekExpense: number, previousWeekExpense: number): string {
    if (currentWeekExpense > previousWeekExpense * 1.2) {
      return 'Spending increased by more than 20% week-over-week.';
    }
    return 'Spending is stable. Great discipline!';
  }
}
