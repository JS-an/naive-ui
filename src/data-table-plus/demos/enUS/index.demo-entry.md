# 数据表格 Data Table Plus

<!--single-column-->

数据表格 Plus 用来显示一些格式化信息。 Data Table Plus 拥有 Data Table 的 Props，请参考<n-a href="data-table#API">Data Table</n-a>。

## API

### DataTable Props

<n-alert type="warning" title="注意" style="margin-bottom: 16px;" :bordered="false">
  Plus 组件属性除特殊标明外,统一写在 <n-text code>plus-props</n-text> 上
</n-alert>

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| tableTitle | `string` | `表格` | 表格标题(不显示可传空) |  |
| showSummary | `boolean` | `false` | 是否展示合计行 |  |
| excelTitle | `string` | `excel` | 导出的 excel 标题 |  |
| exportOptions | `Array<object>` | `[{ label: "导出Excel", key: "excel" }]` | 导出按钮设置 | 未完成 |
| columns | `Array<DataTableColumn>` | `[]` | Plus 列属性 |  |
| localStorageKey | `string` | `null` | 列设置时 localStorage 缓存的 key (有值开启缓存,无值不开启) |  |
| plus:remote | `('type', { page, pageSize, sorter }) => void` | `undefine` | 表格`remote`时, 分页、页码、排序时触发 |  |

### DataTableColumn Properties

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| sum | `boolean \| (data) => any` | `undefined` | 该列合计方法 |  |
| excelWidth | `number` | `undefined` | 设定导出表格列宽 |  |
| excelHidden | `boolean` | `undefined` | 导出时隐藏该列 |  |
| excelWidth | `boolean \| (r) => any` | `undefined` | 导出时转换该列 (key 优先级低,render 优先级中,excelRender 优先级高,excelRender 为 false 导出 key 原始值) |  |

### DataTable Slots

| 名称    | 参数 | 说明           | 版本 |
| ------- | ---- | -------------- | ---- |
| toolbar | `()` | 表格左上工具栏 |      |
