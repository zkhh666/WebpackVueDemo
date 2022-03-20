import vue from 'vue';
import app from './App.vue';

import './asstes/js/index';
import './asstes/index.css'

new vue({
  render: (h) => h(app),
}).$mount('#app');
