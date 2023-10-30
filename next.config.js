/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "media.graphassets.com"
        ],
        //unoptimized: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
