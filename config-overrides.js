const webpack = require ("webpack");

module.exports = function override(config){
    const fallback = config.resolve.fallback || {};

    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "buffer": require.resolve("buffer/"),
        "stream": require.resolve("stream-browserify"),
        "vm": require.resolve("vm-browserify"),
        // "nth-check": require.resolve("$nth-check"),
        fs: false,
        net: false,

    });
    config.resolve.fallback = fallback
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ]);
    return config;
};