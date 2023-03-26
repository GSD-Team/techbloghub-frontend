const nextConfig = {
  experimental: {
    appDir: false,
    fontLoaders: [{ loader: '@next/font/google' }],
  },
  rewrites: () => {
    return [
      {
        source: '/api/contents',
        destination: `${process.env.DEVELOPE_API}/contents`,
      },
      {
        source: '/api/contents/mock',
        destination: `${process.env.DEVELOPE_API}/contents/mock`,
      },
    ];
  },
};

module.exports = nextConfig;
