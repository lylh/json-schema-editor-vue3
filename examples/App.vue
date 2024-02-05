<template>
  <div id="app">
    <div class="title">   
      json-schema-editor-vue Preview
    </div>
    <div class="desc">
      <div>
        <a @click="showModal">JSON导入</a>
        <a-modal
          title="JSON Import"
          :visible="visible"
          @ok="handleOk"
          :confirmLoading="confirmLoading"
          @cancel="handleCancel"
        >
        <codemirror
            v-model="jsonStr"
            placeholder="Code goes here..."
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
            @ready="handleReady"
            @change="onChange"
          />
        </a-modal>
      </div>
    </div>
        <div class="container">
      <json-schema-editor class="schema" :value="code" disabledType lang="zh_CN" custom="true"/>
    </div>
      </div>
</template>

<script>
// import GenerateSchema from 'generate-schema'
import { ref, onMounted, onUnmounted,shallowRef,defineComponent } from "vue"
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
export default defineComponent({
  components: { Codemirror },
    setup() {
     
      const extensions = [json(), oneDark]

      // Codemirror EditorView instance ref
      const view = shallowRef()
      const handleReady = (payload) => {
        view.value = payload.view
      }

      const visible = ref(false);
      const _code = ref(`
      {
  "root": {
    "type": "object",
    "title": "条件",
    "properties": {
      "name": {
        "type": "string",
        "title": "名称"
      },
      "appId": {
        "type": "integer",
        "title": "应用ID"
      },
      "credate": {
        "type": "string",
        "title": "创建日期",
        "format": "date"
      }
    },
    "required": [
      "name",
      "appId",
      "credate"
    ]
  }
}`
      )
      const code = ref(JSON.parse(_code.value));
      const cmRef = ref()

      const onChange = (val) => {
        try {
          console.log('onChange:',val); // 查看输入的数据
          // 此处假设 val 是有有效 JSON 结构的字符串
          const properties = JSON.parse(val)['root']['properties']
          // const t = GenerateSchema.json(properties);
          console.log('parsed:', properties); // 查看解析后的数据
          console.log('brefore:', code.value); // 查看解析后的数据
          // delete t.$schema
          code.value.root.properties = properties;
          console.log('updated tree:', code.value); // 查看更新后的tree

        } catch (e) {
          // 处理解析错误
          console.error('Error parsing JSON:', e);
        }
      }
      const onInput = (val) => {
        console.log('onInput:',val); 
      }

      const onReady = (cm) => {
        console.log('onReady:',cm.focus()); 
      }

      onMounted(() => {
        setTimeout(() => {
          cmRef.value?.refresh()
        }, 1000)

        // setTimeout(() => {
        //   cmRef.value?.resize(300, 200)
        // }, 2000)

        setTimeout(() => {
          cmRef.value?.cminstance.isClean()
        }, 3000)
      })

      onUnmounted(() => {
        cmRef.value?.destroy()
      })

      return {
        visible,
        _code,
        code: code.value,
        cmRef,
        onChange,
        onInput,
        onReady,
        extensions,
        handleReady,
        log: console.log,
        importJson: '{}'
    }

      
  },
  computed: {
    jsonStr: {
      get: function () {
        return JSON.stringify(this.code, null, 2)
      },
      set: function (newVal) {
        this._code = newVal
        // this.code = JSON.parse(newVal);
      }
    }
  },
  methods: {
    handleInput(event) {
      this.importJson = event.target.innerText; // 使用innerText来获取最新的内容
    },
    handleImportJson () {
      try {
        const parsed = JSON.parse(this.importJson);
        console.log('JSON parse log:', parsed)
      } catch (err) {
        console.error('JSON parse error:', err)
      }
      this.handleOk();
    },
    showModal() {
      console.log('showModal method called');
      this.visible = true
    },
    handleOk() {
    this.visible = false
    },
    handleCancel() {
      console.log('Clicked cancel button');
      this.visible = false
    }
  }
})
</script>
<style>
*{
  padding:0;
  margin:0;
  box-sizing: border-box;
}
.title{
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  height:100px;
  line-height: 100px;
}
.desc{
  padding:20px;
  width:80vw;
  min-width:800px;
  margin:auto;
  padding: 0 3em;
  font-size: 1.2em;
}
.container{
  display: flex;
  padding:20px;
  width:40vw;
  min-width:800px;
  justify-content:center;
  height: calc(100vh - 150px);
  margin:auto;
}
.container pre {
  font-family: monospace;
  height: 100%;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 12px;
  width: 50%;
}
.code-container{
  max-height: 300px;
  overflow: auto;
}
.schema{
  margin-left: 5px;
  width:100%;
  height: 100%;
  overflow-y: auto;
  overflow-x:hidden;
  border:1px solid rgba(0,0,0,.1);
  border-radius: 8px;
  padding: 12px;
}
.CodeMirror {
  height: 100% !important;
}
.vue-codemirror{
  flex:1;
  margin: 0 24px;
  border: 1px solid rgba(0,0,0,.1);
  min-height:300px;
  overflow: auto;
  border-radius: 6px;
}
.code {
  font-family: monospace;
  height: 50%;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 12px;
}
</style>
