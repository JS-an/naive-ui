# 展示表格 Data Table View Plus

<!--single-column-->

<div>展示表格 Plus 用来显示一些格式化信息。 Data Table View Plus 拥有 Data Table 的 Props，请参考<n-a href="data-table#API">Data Table</n-a>。</div>
<n-alert type="warning" title="注意" style="margin-top: 16px;" :bordered="false">
  展示表格 Plus 请勿使用分页、排序功能;
</n-alert>

## 模板

### 基础模板
```html
<div v-cloak id="nPlus">
  <n-data-table-view-plus :columns="columns" :data="data"></n-data-table-view-plus>
</div>

<script type="module">
  import NPlus from '/Scripts/NPlusScript/index.js'
  const { createApp, h } = Vue
  const app = createApp({
    components: NPlus,
    data() {
      return {
        data: [ {id: 1, name: '名字'} ], // 表格数据
        columns: [ {title: 'ID', key: 'id'}, {title: '名字', key: 'name'} ] // 表格列
      }
    }
  }).use(naive).mount('#nPlus')
</script>
```

## API

### DataTableViewPlus Props

<n-alert type="warning" title="注意" style="margin-bottom: 16px;" :bordered="false">
  Plus 组件属性除特殊标明外，统一写在 <n-text code>plus-props</n-text> 上
</n-alert>

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| id | `string` | `NDataTableViewPlus` | 展示表格的id，如果同页面有两个展示表格，请至少修改一个id为不同名字 |  |
| cardProps | `object` | `{}` | 表格卡片的配置，参考 <n-a href="card#API">Card Props</n-a> |  |
| tableTitle | `string` | `展示表格` | 表格标题(不显示可传空) |  |
| excelTitle | `string` | `excel` | 导出的 excel 标题 |  |
| exportOptions | `Array<object>` | `[{ label: "导出Excel", key: "excel" }]` | 导出按钮设置(不显示可传空) |  |
| plus:export | `(key) => void` | `undefine` | 除key为`excel`(excel调用plus封装的导出)时, 点击导出组选项时触发<strong>(\*直接写在表格上)</strong> |  |

### DataTableViewPlus Slots

| 名称    | 参数 | 说明           | 版本 |
| ------- | ---- | -------------- | ---- |
| toolbar | `()` | 表格左上工具栏 |      |
