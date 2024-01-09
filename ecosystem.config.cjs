module.exports = {
  apps: [
    {
      name: 'ledsak-api',
      cwd: '/var/www/ledsak-api',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
