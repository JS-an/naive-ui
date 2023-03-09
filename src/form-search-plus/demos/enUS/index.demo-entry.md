# 查询表单 Form Search Plus

<!--single-column-->

Form Search Plus 拥有 Form 的 Props，请参考<n-a href="form#API">Form</n-a>。

## 模板

### 基础模板

```html
<div v-cloak id="nPlus">
  <n-form-search-plus :model="model" :form-items="formItems" @@plus:search="search"></n-form-search-plus>
</div>

<script type="module">
  import NPlus from '~/Scripts/NPlusScript/index.js'
  const { createApp, h } = Vue
  const app = createApp({
    components: NPlus,
    data() {
      return {
        // 表单数据 (key 为 formItems 的 path, 两者要一致)
        model: {
          text: 'text',
          date: null,
        },
        // 表单项配置 (path 为 model 的 key, 两者要一致)
        formItems: [
          {label: '文本', path: 'text'},
          {label: '时间范围', path: 'date', type: 'datePicker', props: {type: 'daterange'}}
        ]
      }
    },
    methods: {
      // 查询事件
      search(data, refs) {}
    }
  }).use(naive).mount('#nPlus')
</script>
```

## API

### FormSearchPlus Props

<n-alert type="warning" title="注意" style="margin-bottom: 16px;" :bordered="false">
  Plus 组件属性除特殊标明外，统一写在 <n-text code>plus-props</n-text> 上
</n-alert>

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| cardProps | `object` | `{}` | 表格卡片的配置，参考 <n-a href="card#API">Card Props</n-a> |  |
| formTitle | `string` | `查询` | 查询表单标题(不显示可传空) |  |
| searchShow | `boolean` | `true` | 查询按钮的显隐 |  |
| searchProps | `object` | `{}` | 查询按钮的属性，参考 <n-a href="button#API">Button Props</n-a> |  |
| resetShow | `boolean` | `false` | 重置按钮的显隐 |  |
| resetProps | `object` | `{}` | 重置按钮的属性，参考 <n-a href="button#API">Button Props</n-a> |  |
| showGridCollapsed | `boolean` | `false` | 是否显示展开/收起按钮 |  |
| gridCollapsedRows | `number` | `1` | 收起时显示的行数 |  |
| form-items | `FormItems` | `{}` | 表单项配置<strong>(\*直接写在表单上)</strong> |  |
| plus:search | `(model, refs) => void` | `undefined` | 查询表单点击查询时触发<strong>(\*直接写在表单上)</strong> |  |

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
    | 'divider'
    | 'slot'
  props: {} // 渲染的组件类型的属性, 参考naive各个组件
  // 其他属性参考 FormItem Props
}
```

### FormSearchPlus Slots

| 名称   | 参数 | 说明                  |
| ------ | ---- | --------------------- |
| before | `()` | 重置/查询/展开按钮前的部分 |
| after | `()` | 重置/查询/展开按钮后的部分 |
