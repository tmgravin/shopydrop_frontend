/** @type {import('next').NextConfig} */
const hostnames = [
    'firebasestorage.googleapis.com',
    'www.merokirana.com',
    'via.placeholder.com',
    'encrypted-tbn0.gstatic.com',
    'static.vecteezy.com',
    'upload.wikimedia.org',
    'img.freepik.com',
    'blog.esewa.com.np',
    'm.media-amazon.com',




];

const nextConfig = {
    images: {
        remotePatterns: hostnames.map(hostname => ({
            protocol: 'https',   // Ensures HTTPS protocol for all domains
            hostname,            // Maps each hostname
            pathname: '/**',     // Allows any path on the hostname
            // port can be omitted if empty, default ports are used
        })),
    },
    typescript: {
        ignoreBuildErrors: true,  // Note: Ignoring TypeScript build errors can hide important issues
    },

};

export default nextConfig;
