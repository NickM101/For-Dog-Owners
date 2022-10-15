module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin',
    // ['transform-remove-console', {exclude: ['log']}],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
