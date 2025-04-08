/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // Only use this if you specifically need standalone
    trailingSlash: true,
    // Add these for better Vercel compatibility
    skipTrailingSlashRedirect: true,
    cleanDistDir: true,
};

export default nextConfig;
