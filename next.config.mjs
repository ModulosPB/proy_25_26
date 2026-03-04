/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next’s new Turbopack build aggressively bundles server code; database
  // drivers like `sequelize`, `mysql2` or `mongoose` often need to stay
  // external so they can be required at runtime. Vercel’s error showed
  // missing `mysql2` during SSR, which means the package wasn’t available
  // inside the webpack bundle. Mark them as external to prevent bundling.
  serverExternalPackages: ['sequelize', 'mysql2', 'mongoose'],
};

export default nextConfig;
