const DEVELOP_API = process.env.DEVELOP_API;

module.exports = {
  reactStrictMode: true,
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  experimental: {
    appDir: false,
    fontLoaders: [{ loader: '@next/font/google' }],
  },
  async rewrites() {
    return [
      {
        source: `/api/contents`,
        destination: `${DEVELOP_API}/contents`,
      },
      {
        source: '/api/contents/mock',
        destination: `${DEVELOP_API}/contents/mock`,
      },
      {
        source: '/api/login/auth2/github',
        destination: `https://github.com/login/oauth/authorize`,
      },
    ];
  },
};
