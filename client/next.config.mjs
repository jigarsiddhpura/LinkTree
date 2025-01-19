/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'build',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mfe-onboarding.production.linktr.ee',
                pathname: '/images/**',
            },
        ],
    },
};

export default nextConfig;
