import { Controller, Get, Post, Body, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }

  @Get('templates')
  getTemplates(@Query('service') service?: string) {
    return this.appService.getTemplates(service);
  }

  @Get('services/:service/info')
  getServiceInfo(@Param('service') service: string) {
    const info = this.appService.getServiceInfo(service);
    if (!info) {
      return { success: false, message: 'Service not found' };
    }
    return { success: true, data: info };
  }

  @Get('services/:service/templates')
  getServiceTemplates(@Param('service') service: string) {
    return this.appService.getTemplates(service);
  }

  @Get('templates/:id')
  getTemplate(@Param('id') id: string) {
    return this.appService.getTemplate(id);
  }

  @Post('templates')
  createTemplate(@Body() templateData: any) {
    return this.appService.createTemplate(templateData);
  }

  @Get('status')
  getServiceStatus() {
    return this.appService.getServiceStatus();
  }

  @Get('services/health')
  getServicesHealth() {
    return this.appService.getServicesHealth();
  }

  @Get('templates/:id/preview')
  getTemplatePreview(
    @Param('id') id: string,
    @Query() variables: any,
    @Res() res: Response
  ) {
    const result = this.appService.getTemplateHtml(id, variables);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.setHeader('Content-Type', 'text/html');
    return res.send(result.html);
  }

  @Post('templates/:id/render')
  renderTemplate(@Param('id') id: string, @Body() variables: any) {
    return this.appService.getTemplateHtml(id, variables);
  }

  @Get('dashboard/:service')
  getDashboard(@Param('service') service: string, @Res() res: Response) {
    const dashboardPath = this.appService.getDashboardPath(service);

    if (!dashboardPath.success) {
      return res.status(404).json(dashboardPath);
    }

    res.setHeader('Content-Type', 'text/html');
    return res.sendFile(dashboardPath.path);
  }
}
