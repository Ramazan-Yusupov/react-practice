// .eslintrc.js
module.exports = {
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@components", "./src/components"],
          ["@utils", "./src/utils"],
          // ... остальные алиасы
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
