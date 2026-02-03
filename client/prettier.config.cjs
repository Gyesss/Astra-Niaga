// prettier.config.js

// /** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
// export default {
//   plugins: ["prettier-plugin-tailwindcss"],
// }

// /** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
// module.exports = {
//   plugins: ["prettier-plugin-tailwindcss"],
// };

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
  htmlWhitespaceSensitivity: "ignore", // optional, agar whitespace HTML di PHP tidak masalah
  overrides: [
    {
      files: "*.php",
      options: {
        parser: "html",
      },
    },
  ],
};
