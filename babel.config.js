module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
          alias: {
            "@": "./",
            "@src": "./src",
            "@app": "./src/app",
            "@components": "./src/components",
            "@context": "./src/context",
            "@services": "./src/services",
          },
        },
      ],
    ],
  };
};
