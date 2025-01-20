/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
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
