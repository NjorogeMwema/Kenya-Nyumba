/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized: true,
      domains: ['tlreprljaabibqyvkcvt.supabase.co', 'img.clerk.com']
    },
    
    env: {
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS,
    }
  };
  
  export default nextConfig;