module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@routes': './src/routes',
          '@views': './src/views',
          '@components': './src/components',
          '@colors': './src/components/colors',
          '@api': './src/config/api',
          '@redux': './src/redux',
          '@reducers': './src/redux/reducers',
          '@actions': './src/redux/actions',
          '@images': './src/assets/images',
        },
      },
    ],
  ],
};
