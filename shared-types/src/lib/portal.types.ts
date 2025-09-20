export interface PortalTemplate {
  id: string;
  name: string;
  description: string;
  serviceType: ServiceType;
  htmlContent: string;
  cssContent: string;
  jsContent: string;
  config: PortalConfig;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PortalConfig {
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  logo?: string;
  companyName: string;
  welcomeMessage: string;
  termsAndConditions: string;
  socialLogin: SocialLoginConfig;
  formFields: FormField[];
}

export interface SocialLoginConfig {
  facebook: boolean;
  google: boolean;
  twitter: boolean;
}

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'password' | 'phone' | 'select' | 'checkbox';
  label: string;
  required: boolean;
  options?: string[];
}

export enum ServiceType {
  WIPO = 'wipo',
  PUBLIFI = 'publifi',
  LEER_TE_CONECTA = 'leer-te-conecta',
  WIHOT = 'wihot',
  PORTEXA = 'portexa',
  ENTRENATECH = 'entrenatech'
}

export interface RouterDevice {
  id: string;
  name: string;
  ipAddress: string;
  macAddress: string;
  model: string;
  location: string;
  isOnline: boolean;
  lastSeen: Date;
  portalTemplateId?: string;
}

export interface HotspotSession {
  id: string;
  routerId: string;
  userMac: string;
  ipAddress: string;
  startTime: Date;
  endTime?: Date;
  bytesUploaded: number;
  bytesDownloaded: number;
  status: 'active' | 'expired' | 'terminated';
}