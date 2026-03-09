import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { WebhookService } from './webhook.service';

class IncomingWhatsAppDto {
  @IsString()
  @IsNotEmpty()
  from!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;
}

@Controller('webhook/whatsapp')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Get()
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
  ) {
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
    if (mode === 'subscribe' && token === verifyToken) {
      return challenge;
    }
    throw new BadRequestException('Invalid webhook verification request');
  }

  @Post()
  @HttpCode(200)
  async handleIncoming(
    @Body() payload: IncomingWhatsAppDto,
    @Headers('x-whatsapp-signature') signature?: string,
  ) {
    await this.webhookService.verifySignature(signature, payload);
    const result = await this.webhookService.enqueueInboundMessage(payload.from, payload.text);

    return {
      ok: true,
      message: 'Webhook accepted',
      jobId: result.jobId,
    };
  }
}
