export const PACKAGE_JSON = `
{
  "name": "{{name}}",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "axios": "^0.18.0",
    "core-js": "^3.6.5",
    "element-ui": "^2.15.0",
    "vue": "^2.6.11",
    "vue-router": "^3.2.0",
    "vuex": "^3.4.0"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-plugin-router": "~4.5.0",
    "@vue/cli-plugin-vuex": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^6.2.2",
    "node-sass": "^5.0.0",
    "sass-loader": "^10.1.1",
    "vue-cli-plugin-axios": "~0.0.4",
    "vue-template-compiler": "^2.6.11"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {}
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}
 
`;
export const ENV = `
VUE_APP_OUTPUT_DIR = dist
VUE_APP_HOST = {{host}}
VUE_APP_PORT = 9000
VUE_APP_PROXY = {{proxy}}
VUE_APP_TITLE = 京东科技
`;
