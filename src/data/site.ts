// Fonte única de dados de contato e identificação.
// Altere aqui e o site inteiro é atualizado.

const whatsappNumber = '5561998663105';
const whatsappMessage =
  'Olá, gostaria de agendar uma consulta nutricional com a Luana Genaro.';

export const site = {
  url: 'https://luanagenaro.com.br',
  name: 'Luana Genaro',
  title: 'Nutricionista',
  tagline: 'Nutrição de Precisão e Saúde',
  crn: 'CRN 24244/P',
  location: 'Lago Sul, Brasília (DF)',
  locality: 'Brasília',
  neighborhood: 'Lago Sul',
  region: 'DF',
  phoneDisplay: '+55 61 99866-3105',
  phoneE164: '+5561998663105',
  instagramHandle: '@luanagenaro',
  instagramUrl: 'https://www.instagram.com/luanagenaro/',
  whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  education:
    'Pós-graduações em Reprogramação Epigenética, Saúde Integrativa e Fitoterapia',
} as const;
