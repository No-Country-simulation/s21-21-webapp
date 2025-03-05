import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationType } from '@prisma/client';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async sendNotification(
    @Body() { userId, message, type }: { userId: string; message: string; type: NotificationType },
  ) {
    return this.notificationsService.sendNotification(userId, message, type);
  }

  @Get(':userId')
  async getUserNotifications(@Param('userId') userId: string) {
    return this.notificationsService.getUserNotifications(userId);
  }

  @Patch(':id')
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }
}
