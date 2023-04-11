# 表单 Form Plus

<!--single-column-->

Form Plus 拥有 Form 的 Props，请参考<n-a href="form#API">Form</n-a>。

## 模板

### 基础模板

```html
<div v-cloak id="nPlus">
  <n-form-plus :model="model" :form-items="formItems" @@plus:submit="submit">
    <template #slot>我是插槽</template>
  </n-form-plus>
</div>

<script type="module">
  import NPlus from '/Scripts/NPlusScript/index.js' // 插件引用路径
  const { createApp, h } = Vue // h函数为vue3的jsx函数（即创建元素的函数）
  const app = createApp({
    components: NPlus,
    data() {
      return {
        // 表单数据 (key 为 formItems 的 key, 两者要一致)
        model: {
          text: '文本', 
          arr: [{ aa: 111, dates: null }],
          table: [{ key: 1 }]
        },
        // 表单项配置 (key 为 model 的 key, 两者要一致)
        formItems: {
          text: {
            label: '文本', // 表单项的label
            rule: [ { required: true, message: '请输入', trigger: ['blur', 'input'] } ] // 验证规则
          },
          date: {
            label: '日期',
            type: 'datePicker', // 渲染类型
            rule: [ { required: true, type: 'number', message: '请输入date', trigger: ['blur', 'change'] } ]
          },
          slot: { label: '插槽', type: 'slot', props: { name: 'slot' } },
          select: { label: '选择框', type: 'select', props: { options: [{ label: '选项1', value: 1 }] } },
          number: { label: '数字', type: 'inputNumber' },
          radio: { label: '单选', type: 'radio', props: { options: [ { label: '单选1', value: 1 } ] } },
          checkbox: { label: '多选', type: 'checkbox', props: { options: [ { label: '多选1', value: 1 } ] } },
          switch: { label: '开关', type: 'switch' },
          button: {
            label: ' ',
            type: 'button',
            props: { label: '按钮', onclick: (r, i) => {  } }
          },
          divider: { span: 24, type: 'divider', props: { label: '我是分割线' } },
          cascader: {
            label: '级联',
            type: 'cascader',
            props: { options: [ { label: '级联1', value: 1, children: [ { label: '级联1-1', value: 11 } ] } ] }
          },
          transfer: { label: '穿梭框', type: 'transfer', props: { options: [ { label: '穿梭框1', value: 1 } ] } },
          table: {
            label: '表格',
            type: 'table',
            props: {
              columns: [
                {
                  title: '序号',
                  key: 'key',
                  render: (r, i) => h(naive.NInput, { value: r.key, onUpdateValue: (v) => { this.model.table[i].key = v } })
                }
              ]
            }
          },
          arr: {
            label: '动态元素',
            type: 'grid',
            drag: true, // 是否可拖拽 (开启时拖拽按钮占 span: 1)
            // formItems 为动态元素的表单项 (和外层表单项一致)
            formItems: {
              aa: { span: 6, label: '动态1' },
              dates: { span: 6, label: '日期', type: 'datePicker' },
              button: { span: 3, label: ' ', type: 'button', props: { label: '删除', onclick: (r, i) => this.model.arr.splice(i, 1) }
              }
            }
          }
        }
      }
    },
    methods: {
      // 提交事件
      submit(data, refs) { }
    }
  }).use(naive).mount('#nPlus')
</script>
```

## API

### FormPlus Props

<n-alert type="warning" title="注意" style="margin-bottom: 16px;" :bordered="false">
  Plus 组件属性除特殊标明外，统一写在 <n-text code>plus-props</n-text> 上
</n-alert>

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| cardProps | `object` | `{}` | 表格卡片的配置，参考 <n-a href="card#API">Card Props</n-a> |  |
| btnPlacement | `'top' \| 'bottom' \| 'top-left' \| 'bottom-left' \| ''` | `top` | 表单按钮位置(`''`则隐藏) |  |
| submitProps | `object` | `{}` | 提交按钮的属性，参考 <n-a href="button#API">Button Props</n-a> |  |
| resetProps | `object` | `{}` | 重置按钮的属性，参考 <n-a href="button#API">Button Props</n-a> |  |
| submitShow | `boolean` | `true` | 提交按钮的显隐 |  |
| resetShow | `boolean` | `false` | 重置按钮的显隐 |  |
| form-items | `FormItems` | `{}` | 表单项配置<strong>(\*直接写在表单上)</strong> |  |
| plus:submit | `(model, refs) => void` | `undefined` | 表单点击提交时触发<strong>(\*直接写在表单上)</strong> |  |
| plus:reset | `() => void` | `undefined` | 表单点击重置时触发<strong>(\*直接写在表单上)</strong> |  |

### FormItems Type

其他属性参考 <n-a href="form#FormItem-Props">FormItem Props</n-a>

```ts
type FormItems = {
  type:
    | 'input'
    | 'datePicker'
    | 'select'
    | 'inputNumber'
    | 'radio'
    | 'checkbox'
    | 'switch'
    | 'cascader'
    | 'transfer'
    | 'upload'
    | 'colorPicker'
    | 'divider'
    | 'slot'
    | 'button'
    | 'table'
    | 'grid' // 渲染的组件类型
  hidden: true | false // 是否隐藏该表单项
  drag: true | false // 动态表单项是否可拖拽（只在 type: 'grid' 下使用，且拖拽按钮占 span: 1）
  props: {} // 渲染的组件类型的属性, 参考naive各个组件
  // 其他属性参考 FormItem Props
}
```

### FormPlus Methods

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| setResetValues | `(values) => Void` | 设置重置时的数据，未设置则清空所有数据，一般配合重置按钮使用 |

### FormPlus Slots

| 名称   | 参数 | 说明                  |
| ------ | ---- | --------------------- |
| before | `()` | 重置/提交按钮前的部分 |
| after | `()` | 重置/提交按钮后的部分 |
