const nextConfig = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
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
      {
        source: '/api/login/auth2/github',
        destination: `https://github.com/login/oauth/authorize`,
      },
    ];
  },
};

module.exports = nextConfig;
