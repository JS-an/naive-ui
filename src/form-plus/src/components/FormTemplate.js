export default {
  name: 'FormTemplate',
  props: {
    index: { type: Number, default: 0 },
    path: { type: String, default: '' },
    model: { type: Object, default: () => ({}) },
    formItems: { type: Object, default: () => ({}) },
    isDrag: { type: Boolean, default: false },
  },
  data() {
    return {
      dragIndex: null,
    }
  },
  methods: {
    dragenter(index, list, e) {
      if (this.dragIndex === null) return false
      // 避免源对象触发自身的dragenter事件
      if (this.dragIndex !== index) {
        const source = list[this.dragIndex];
        list.splice(this.dragIndex, 1);
        list.splice(index, 0, source);
        // 排序变化后目标对象的索引变成源对象的索引
        this.dragIndex = index;
      }
    },
    dragover(e) {
      e.preventDefault()
      if (this.dragIndex === null) return false
    },
    // dragleave(index, list, e) {
    //   console.log('drag')
    // },
    // drag(index, list, e) {
    //   console.log('drag')
    // },
    dragstart(index, list, e) {
      if (e.target.id !== 'drag') return false
      this.dragIndex = index;
    },
    dragend() {
      if (this.dragIndex === null) return false
      this.dragIndex = null
    },
  },
  template: `
  <n-grid cols="8 800:16 1200:24" :x-gap="24">
    <template v-for="(item, key, i) in formItems">
    <n-gi v-if="isDrag && !i" :span="1" key="drag" style="display: flex; justify-content: center; align-items: center;">
      <i id="drag" class="fa fa-bars" style="cursor: grab; font-size: 18px;" draggable="true"></i>
    </n-gi>
    <template v-if="!item.hidden">
    <n-gi v-if="item.type === 'grid'" :span="24" :key="key" v-bind="item" draggable="false">
      <form-template 
        v-for="(val, j) of model[key]" 
        :key="j" 
        v-bind="item.props" 
        :index="j"
        :path="key"
        :model="val" 
        :form-items="item.formItems"
        :isDrag="item.drag"
        :class="[item.drag && j === dragIndex && 'plus-drag']"
        @dragenter.prevent="item.drag ? dragenter(j, model[key], $event) : undefined"
        @dragover.prevent="item.drag ? dragover($event) : undefined"
        @dragstart="item.drag ? dragstart(j, model[key], $event) : undefined"
        @dragend="item.drag ? dragend() : undefined"
      >
      </form-template>
    </n-gi>
    <n-gi v-else-if="item.type === 'table'" :span="24" :key="key" v-bind="item">
      <n-data-table :data="model[key]" v-bind="item.props"></n-data-table>
    </n-gi>
    <n-form-item-gi v-else :span="8" :key="key" :path="path ? path + '.' + index + '.' + key : key" v-bind="item">
      <n-date-picker
        v-if="item.type === 'datePicker'"
        style="width: 100%"
        v-model:value="model[key]"
        v-bind="item.props"
      ></n-date-picker>
      <n-select
        v-else-if="item.type === 'select'"
        v-model:value="model[key]"
        v-bind="item.props"
      ></n-select>
      <n-input-number
        v-else-if="item.type === 'inputNumber'"
        style="width: 100%"
        v-model:value="model[key]"
        v-bind="item.props"
      ></n-input-number>
      <n-radio-group
        v-else-if="item.type === 'radio'"
        v-model:value="model[key]"
        v-bind="item.props"
      >
        <n-space>
          <n-radio
            v-for="op in item.props.options"
            :key="op.value"
            v-bind="op"
          ></n-radio>
        </n-space>
      </n-radio-group>
      <n-checkbox-group
        v-else-if="item.type === 'checkbox'"
        v-model:value="model[key]">
        <n-space>
          <n-checkbox
            v-for="op in item.props.options"
            :key="op.value"
            v-bind="op"
          ></n-checkbox>
        </n-space>
      </n-checkbox-group>
      <n-switch
        v-else-if="item.type === 'switch'"
        v-model:value="model[key]"
        v-bind="item.props"
      ></n-switch>
      <n-cascader
        v-else-if="item.type === 'cascader'"
        v-model:value="model[key]"
        v-bind="item.props"
      ></n-cascader>
      <n-transfer
        v-else-if="item.type === 'transfer'"
        v-model:value="model[key]"
        v-bind="item.props"
      ></n-transfer>
      <n-upload
        v-else-if="item.type === 'upload'"
        v-model:file-list="model[key]"
        v-bind="item.props"
      >
        <n-button>上传文件</n-button>
      </n-upload>
      <n-color-picker
        v-else-if="item.type === 'colorPicker'"
        v-model:value="model[key]"
        v-bind="item.props"
      ></n-color-picker>
      <n-divider
        v-else-if="item.type === 'divider'"
        v-bind="item.props"
      >
        {{ item.props.label }}
      </n-divider>
      <slot
        v-else-if="item.type === 'slot'"
        :name="item.props.name"
      ></slot>
      <i
        v-else-if="item.type === 'icon'"
        v-bind="item.props"
        :onclick="(e) => item.props.onclick(model, index, e)"
      ></i>
      <n-button
        v-else-if="item.type === 'button'"
        v-bind="item.props"
        :onclick="(e) => item.props.onclick(model, index, e)"
      >
      {{ item.props.label }}
      </n-button>
      <n-input
        v-else
        v-model:value="model[key]"
        v-bind="item.props"
      ></n-input>
    </n-form-item-gi>
  </template>
    </template>
  </n-grid>
`
}