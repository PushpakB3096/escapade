/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'res.cloudinary.com'
    ]
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /\/__tests__\// }),
      new webpack.IgnorePlugin({ resourceRegExp: /\/test\// })
    );
    return config;
  }
};

module.exports = nextConfig;
