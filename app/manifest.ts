import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mircadoz - Multi-vendor Platform',
    short_name: 'Mircadoz',
    description: 'منصة متعددة البائعين - اطلب من أي متجر واحصل على نقاط ولاء',
    start_url: '/',
    display: 'standalone',
    background_color: '#F6F7F2',
    theme_color: '#0F2A20',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}