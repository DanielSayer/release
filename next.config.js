/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/sign-in', destination: '/api/auth/login', permanent: true },
      {
        source: '/sign-out',
        destination: '/api/auth/logout',
        permanent: true,
      },
    ]
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding1 = false
    return config
  },
}

module.exports = nextConfig
