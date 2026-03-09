import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TransactionsService } from './transactions.service';

class CreateTransactionDto {
  @IsIn(['income', 'expense'])
  type!: 'income' | 'expense';

  @IsNumber()
  amount!: number;

  @IsString()
  category!: string;

  @IsString()
  description!: string;
}

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async list(@Query() query: Record<string, string>) {
    return this.transactionsService.findAll('demo-user', query);
  }

  @Post()
  async create(@Body() dto: CreateTransactionDto) {
    return this.transactionsService.create({ ...dto, userId: 'demo-user', source: 'manual' });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<CreateTransactionDto>) {
    return this.transactionsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
