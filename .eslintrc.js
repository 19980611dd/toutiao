module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    // 解决打开文件 eslint第一行报错问题
    requireConfigFile: false
  },
  rules: {
    'space-before-function-paren': 'off',
    // 解决eslint某行报错
    'vue/no-mutating-props': 'off',
    'vue/multi-word-component-names': 'off',
    'no-unused-expressions': 'off',
    'no-sequences': 'off',
    'vue/no-parsing-error': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/comment-directive': 'off'
  }
}
