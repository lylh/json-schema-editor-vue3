/*
 * @Author       : luh1 luh1@xiaopeng.com
 * @Date         : 2024-01-31 10:22:23
 * @LastEditors  : luh1 luh1@xiaopeng.com
 * @LastEditTime : 2024-02-05 18:50:53
 * @FilePath     : /json-schema-editor-vue3/examples/main.js
 * @Description  : 
 */
import { createApp } from 'vue'
import App from './App.vue'
import JsonSchemaEditor from '../packages/index'
import { Modal} from 'ant-design-vue'

createApp(App).use(JsonSchemaEditor).use(Modal).mount('#app')
