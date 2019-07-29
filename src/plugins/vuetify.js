import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5',
    secondary: '#9c27b0',
    accent: '#009688',
    error: '#ff5722',
    warning: '#ffc107',
    info: '#00bcd4',
    success: '#8bc34a'
  },
  iconfont: 'fa',
})
