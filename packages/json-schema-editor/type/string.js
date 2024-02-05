/*
 * @Author       : luh1 luh1@xiaopeng.com
 * @Date         : 2024-01-31 10:22:23
 * @LastEditors  : luh1 luh1@xiaopeng.com
 * @LastEditTime : 2024-02-04 20:06:53
 * @FilePath     : /json-schema-editor-vue3/packages/json-schema-editor/type/string.js
 * @Description  : 
 */
const value = {
    default: null,
    maxLength: null,
    minLength: null,
    pattern: null,
    format:undefined,
    enum:undefined
}
const attr = {
    default: {
      name: '默认值',
      type: 'string',
    },
    maxLength:{
        name:'最大字符数',
        type:'integer'
    },
    minLength:{
        name:'最小字符数',
        type:'integer'
    },
    pattern: {
        name: '正则表达式',
        type:'string'
    },
    format: {
        name:'格式',
        type:'array',
        enums:['date','date-time','email','hostname','ipv4','ipv6','uri']
    },
    enum:{
        name:'枚举',
        type:'array'
    }
}
const wrapper = {value, attr}
export default wrapper