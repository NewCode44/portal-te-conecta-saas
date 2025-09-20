import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  private templates = [
    {
      id: '1',
      name: 'Portal Básico',
      category: 'basic',
      description: 'Template básico para portales cautivos',
      file: 'basic-portal.html',
      preview: '/api/templates/1/preview',
      services: ['entrenatech', 'wipo', 'publifi'], // Disponible para todos
      active: true
    },
    {
      id: '2',
      name: 'Portal Empresarial',
      category: 'business',
      description: 'Template para empresas',
      file: 'business-portal.html',
      preview: '/api/templates/2/preview',
      services: ['wipo', 'portexa'], // Solo empresariales
      active: true
    },
    {
      id: '3',
      name: 'Portal Hotspot',
      category: 'hotspot',
      description: 'Template para hotspots WiFi',
      file: 'hotspot-portal.html',
      preview: '/api/templates/3/preview',
      services: ['entrenatech', 'wihot'], // Para servicios de capacitación y hotspots
      active: true
    },
    {
      id: '4',
      name: 'Portal Educativo Entrenatech',
      category: 'education',
      description: 'Template especializado para capacitación y educación',
      file: 'entrenatech-portal.html',
      preview: '/api/templates/4/preview',
      services: ['entrenatech'], // Exclusivo para Entrenatech
      active: true
    },
    {
      id: '5',
      name: 'Entrenatech Gym Pro',
      category: 'premium',
      description: 'Template premium para gimnasios con seguimiento de ejercicios, música y comunidad',
      file: 'entrenatech-gym-pro.html',
      preview: '/api/templates/5/preview',
      services: ['entrenatech'], // Exclusivo para Entrenatech
      active: true
    },
    {
      id: '6',
      name: 'EducaFi - Portal Educativo',
      category: 'education',
      description: 'Portal especializado en educación y capacitación con acceso WiFi',
      file: 'entrenatech-educafi.html',
      preview: '/api/templates/6/preview',
      services: ['entrenatech'], // Exclusivo para Entrenatech
      active: true
    }
  ];

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  getHealth() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'template-service',
      version: '1.0.0'
    };
  }

  getTemplates(service?: string) {
    let filteredTemplates = this.templates.filter(t => t.active);

    if (service) {
      filteredTemplates = filteredTemplates.filter(t =>
        t.services.includes(service.toLowerCase())
      );
    }

    return {
      success: true,
      data: filteredTemplates,
      total: filteredTemplates.length,
      service: service || 'all'
    };
  }

  getServiceInfo(service: string) {
    const serviceInfo = {
      entrenatech: {
        name: 'Entrenatech',
        description: 'Plataforma de capacitación y entrenamiento',
        color: '#2196F3',
        logo: '🎓',
        dashboard_url: '/entrenatech/dashboard'
      },
      wipo: {
        name: 'WIPO',
        description: 'Soluciones empresariales WiFi',
        color: '#4CAF50',
        logo: '🏢',
        dashboard_url: '/wipo/dashboard'
      },
      publifi: {
        name: 'Publifi',
        description: 'WiFi para espacios públicos',
        color: '#FF9800',
        logo: '📶',
        dashboard_url: '/publifi/dashboard'
      },
      portexa: {
        name: 'Portexa',
        description: 'Portales ejecutivos',
        color: '#9C27B0',
        logo: '💼',
        dashboard_url: '/portexa/dashboard'
      },
      wihot: {
        name: 'WiHot',
        description: 'Hotspots WiFi premium',
        color: '#F44336',
        logo: '🔥',
        dashboard_url: '/wihot/dashboard'
      },
      'leer-te-conecta': {
        name: 'Leer Te Conecta',
        description: 'Bibliotecas y educación',
        color: '#795548',
        logo: '📚',
        dashboard_url: '/leer-te-conecta/dashboard'
      }
    };

    return serviceInfo[service.toLowerCase()] || null;
  }

  getTemplate(id: string) {
    const template = this.templates.find(t => t.id === id);
    if (!template) {
      return { success: false, message: 'Template not found' };
    }
    return { success: true, data: template };
  }

  createTemplate(templateData: any) {
    const newTemplate = {
      id: (this.templates.length + 1).toString(),
      ...templateData,
      createdAt: new Date().toISOString()
    };
    this.templates.push(newTemplate);
    return { success: true, data: newTemplate };
  }

  getServiceStatus() {
    return {
      service: 'template-service',
      status: 'running',
      port: process.env.PORT || 3005,
      database: 'connected',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      connections: {
        database: 'postgresql://localhost:5432/tu_portal_db',
        redis: 'redis://localhost:6379'
      }
    };
  }

  async getServicesHealth() {
    const services = [
      { name: 'wipo-service', url: 'http://localhost:3010/api' },
      { name: 'publifi-service', url: 'http://localhost:3011/api' },
      { name: 'leer-te-conecta-service', url: 'http://localhost:3012/api' },
      { name: 'wihot-service', url: 'http://localhost:3013/api' },
      { name: 'portexa-service', url: 'http://localhost:3014/api' },
      { name: 'entrenatech-service', url: 'http://localhost:3015/api' }
    ];

    const healthChecks = await Promise.allSettled(
      services.map(async (service) => {
        try {
          // Simulamos la verificación de salud
          return {
            name: service.name,
            status: 'healthy',
            url: service.url,
            timestamp: new Date().toISOString()
          };
        } catch (error) {
          return {
            name: service.name,
            status: 'unhealthy',
            url: service.url,
            error: error.message
          };
        }
      })
    );

    return {
      success: true,
      services: healthChecks.map(result =>
        result.status === 'fulfilled' ? result.value : result.reason
      ),
      total: services.length,
      healthy: healthChecks.filter(r => r.status === 'fulfilled').length
    };
  }

  getTemplateHtml(id: string, variables: any = {}) {
    const template = this.templates.find(t => t.id === id);
    if (!template) {
      return { success: false, message: 'Template not found' };
    }

    try {
      // En desarrollo, las templates están en src/templates
      // En producción, estarán en dist/templates
      const templatePath = path.join(process.cwd(), 'template-service', 'src', 'templates', template.file);
      let html = fs.readFileSync(templatePath, 'utf8');

      // Variables por defecto
      const defaultVars = {
        title: 'Portal WiFi',
        company_name: 'Mi Empresa',
        login_url: '/auth/login'
      };

      // Combinar variables por defecto con las proporcionadas
      const allVars = { ...defaultVars, ...variables };

      // Reemplazar variables en el template
      Object.keys(allVars).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, allVars[key]);
      });

      return {
        success: true,
        html,
        template: template.name,
        variables: allVars
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error loading template',
        error: error.message
      };
    }
  }

  getDashboardPath(service: string) {
    const serviceInfo = this.getServiceInfo(service);
    if (!serviceInfo) {
      return { success: false, message: 'Service not found' };
    }

    try {
      const dashboardPath = path.join(process.cwd(), 'template-service', 'src', 'web', `${service.toLowerCase()}-dashboard.html`);

      if (!fs.existsSync(dashboardPath)) {
        return { success: false, message: 'Dashboard not found for this service' };
      }

      return {
        success: true,
        path: dashboardPath,
        service: serviceInfo.name
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error loading dashboard',
        error: error.message
      };
    }
  }
}
