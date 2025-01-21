/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone', // change export -> standalone due to dynamic routing
    images: {
        domains: ['inflow.chat', 'web.d363nz7582ms7r.amplifyapp.com'], // Add your image domains here
        unoptimized: true // reqd. for static exports
    },
    experimental: {
        // Optimize trace generation (added for dynamic routing)
        turbotrace: {
            logLevel: 'error',
            logDetail: true,
        },
    },
};

export default nextConfig;
