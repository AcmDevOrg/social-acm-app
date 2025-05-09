/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {      
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.clerk.com',
        },
        {
          protocol: 'https',
          hostname: 'social-acm-app.firebaseapp.com',
        },
        {
          protocol: 'https',
          hostname: 'social-acm-app.firebasestorage.app',
        },
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
        },
      ],
    },
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            { key: '', value: '' },
          ],
        },
      ]
    },
  };
  
  export default nextConfig;
  