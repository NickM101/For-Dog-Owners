module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          '@app': './src',
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/components',
          '@features': './src/features',
          '@layouts': './src/layouts',
          '@pages': './src/pages',
          '@router': './src/router',
          '@services': './src/services',
        },
      },
    ],
    // 'transform-remove-console',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
