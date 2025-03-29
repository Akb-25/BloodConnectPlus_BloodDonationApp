module.exports = {
  presets: ["module:metro-react-native-babel-preset", "@babel/preset-react"],
  plugins: [
    ["@babel/plugin-transform-private-methods", { loose: false }],
    ["@babel/plugin-transform-class-properties", { loose: false }],
    ["@babel/plugin-transform-private-property-in-object", { loose: false }]
  ],
};