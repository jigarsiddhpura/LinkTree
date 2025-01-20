/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    images: {
        domains: ['inflow.chat', 'web.d363nz7582ms7r.amplifyapp.com'], // Add your image domains here
        unoptimized: true // Try this for Amplify deployments
    }
};

export default nextConfig;
