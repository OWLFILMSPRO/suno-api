/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [
    'pino',
    'pino-pretty', 
    'rebrowser-playwright-core',
    'electron',
    'tree-sitter',
  ],
};

export default nextConfig;
