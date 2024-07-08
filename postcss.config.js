module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
  process(css) {
    return css.process().then(result => {
      result.css;
    });
  }
};