const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname);

// Tối ưu hóa Metro bundler cho development
config.resolver.platforms = ['ios', 'android', 'native', 'web'];
config.resolver.sourceExts.push('cjs');

// Enable hot reloading for web
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Enable hot reloading
      if (req.url === '/hot') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      }
      return middleware(req, res, next);
    };
  },
};

// Fix source map issues
config.transformer.enableBabelRCLookup = false;
config.transformer.enableBabelRuntime = false;

// Enable hot reloading
config.transformer.enableBabelRCLookup = true;
config.transformer.enableBabelRuntime = true;

// Fix for Metro bundler source map issues
config.serializer = {
  ...config.serializer,
  getModulesRunBeforeMainModule: () => [],
};
 
module.exports = withNativeWind(config, { input: './global.css' })