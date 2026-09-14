/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGODB_URI: 'mongodb+srv://prayxistechnologies_db_user:1234asdfG@prayxis-web.w2cyjti.mongodb.net/prayxis_db?retryWrites=true&w=majority&appName=Prayxis-web',
    JWT_SECRET: 'prayxis_cyber_secret_key_2026_prod_jwt_secure',
  },
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    return config;
  }
};

export default nextConfig;
