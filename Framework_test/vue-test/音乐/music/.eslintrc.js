// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // 规定了参数是否需要圆括号包围
    'arrow-parens': 0,
    // 规定generator函数中星号前后的空白
    'generator-star-spacing': 0,
    // 禁止使用debugger语句
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 默认配置always，要求在行末加上分号。
    'semi': ['error','always'],
    // 统一代码缩进方式，默认值是4 spaces.
    'indent': 0,
    // 函数定义时，function关键字后面的小括号前是否需要加空格
    'space-before-function-paren': 0,
    // //该规则规定文件最后强制换行，仅需留一空行
    'eol-last': 0
  }
}
