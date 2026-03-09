import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, JwtAuthGuard],
  exports: [TransactionsService],
})
export class TransactionsModule {}
