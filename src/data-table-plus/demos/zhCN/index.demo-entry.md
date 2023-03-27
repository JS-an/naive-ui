# 数据表格 Data Table Plus

数据表格 Plus 用来显示一些格式化信息。 Data Table Plus 拥有 Data Table 的 Props，请参考<n-a href="data-table#API">Data Table</n-a>。

## 模板

### 基础

```html
<div v-cloak id="nPlus">
  <n-data-table-plus :columns="columns" :data="data"></n-data-table-plus>
</div>

<script type="module">
  import NPlus from '../Scripts/NPlusScript/index.js'
  const { createApp, h } = Vue
  const app = createApp({
    components: NPlus,
    data() {
      return {
        data: [{ id: 1, name: '名字' }], // 表格数据
        columns: [
          { title: 'ID', key: 'id' },
          { title: '名字', key: 'name' }
        ] // 表格列
      }
    }
  })
    .use(naive)
    .mount('#nPlus')
</script>
```

### 真分页（后端分页）

```html
<div id="nPlus">
  <n-data-table-plus
    :remote="true"
    @@plus:remote="handleRemote"
    :pagination="pagination"
    :sorter="sorter"
    :columns="columns"
    :data="data"
  ></n-data-table-plus>
</div>

<script type="module">
  import NPlus from '../Scripts/NPlusScript/index.js'
  const { createApp, h } = Vue
  const app = createApp({
    components: NPlus,
    data() {
      return {
        data: [{id: 1, name: '名字'}], // 表格数据
        columns: [{title: 'ID', key: 'id'}, {title: '名字', key: 'name'}] // 表格列
        pagination: {page: 1, pageSize: 10, pageCount: 0, itemCount: 0}, // 分页
        sorter: {}, // 排序
      }
    },
    methods:{
      handleRemote(type, op) {
        switch (type) {
          // 页码事件
          case 'page':
            // 例子: 请求后修改数据和页码(记得替换)
            query().then((res) => {
              this.data = res.data
              this.pagination.pageCount = res.pageCount
              this.pagination.itemCount = res.total
            })
            break;
          // 条目(x条/页)事件
          case 'pageSize':
            // 例子: 请求后修改数据和页码(记得替换)
            query().then((res) => {
              this.data = res.data
              this.pagination.page = 1
              this.pagination.pageCount = res.pageCount
              this.pagination.itemCount = res.total
            })
            break;
          // 排序事件
          case 'sorter':
            // 例子: 请求后修改数据和页码(记得替换)
            query().then((res) => {
              this.sorter = op.sorter
              this.data = res.data
              this.pagination.pageCount = res.pageCount
              this.pagination.itemCount = res.total
            })
            break;
          default:
            break;
        }
      },
    }
  }).use(naive).mount('#nPlus')
</script>
```

### 选择框功能（清空所有、反选）

```js
// 注意 checkedRowKeys 命名
{
  type: "selection",
  options: [
    {label: "清空所有", key: "clearAll", onSelect: () => { this.checkedRowKeys = [] }},
    {
      label: "反选",
      key: "reverse",
      onSelect: (pageData) => {
        const getPageRowKeys = (arr, key = 'key') => {
          return arr.map(item => {
            return item.children ? [item[key], getPageRowKeys(item.children, key)] : item[key]
          })
        }
        const pageRowKeys = getPageRowKeys(pageData, 'key').flat(Infinity)
        let unRowKeys = []
        pageRowKeys.forEach(key => {
          const index = this.checkedRowKeys.indexOf(key)
          if (index >= 0) {
            this.checkedRowKeys.splice(index, 1)
          } else {
            unRowKeys.push(key)
          }
        });
        this.checkedRowKeys = [...new Set([...this.checkedRowKeys, ...unRowKeys])]
      }
    }
  ],
}
```

## API

### DataTablePlus Props

<n-alert type="warning" title="注意" style="margin-bottom: 16px;" :bordered="false">
  Plus 组件属性除特殊标明外，统一写在 <n-text code>plus-props</n-text> 上
</n-alert>

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| cardProps | `object` | `{}` | 表格卡片的配置，参考 <n-a href="card#API">Card Props</n-a> |  |
| tableTitle | `string` | `表格` | 表格标题(不显示可传空) |  |
| clearFilter | `boolean` | `false` | 查询后/数据修改后是否清空右上筛选值 |  |
| showSummary | `boolean` | `false` | 是否展示合计行 | 未完成 |
| excelTitle | `string` | `excel` | 导出的 excel 标题 |  |
| exportOptions | `Array<object>` | `[{ label: "导出Excel", key: "excel" }]` | 导出按钮设置(不显示可传空) |  |
| localStorageKey | `string` | `table` | 列设置时 localStorage 缓存的 key (有值开启缓存,无值不开启) |  |
| columns | `Array<DataTableColumn>` | `[]` | Plus 列属性<strong>(\*直接写在表格上)</strong> |  |
| plus:remote | `(type, { page, pageSize, sorter }) => void` | `undefine` | 表格`remote`时, 分页、页码、排序时触发<strong>(\*直接写在表格上)</strong> |  |
| plus:export | `(key) => void` | `undefine` | 除 key 为`excel`(excel 调用 plus 封装的导出)时, 点击导出组选项时触发<strong>(\*直接写在表格上)</strong> |  |

### DataTablePlusColumn Properties

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| sum | `boolean \| (data) => any` | `undefined` | 该列合计方法 | 未完成 |
| excelWidth | `number` | `undefined` | 设定导出表格列宽 |  |
| excelHidden | `boolean` | `undefined` | 导出时隐藏该列 |  |
| excelRender | `boolean \| (row) => any` | `undefined` | 导出时转换该列 (key 优先级低,render 优先级中,excelRender 优先级高,excelRender 为 false 导出 key 原始值) |  |

### DataTablePlus Slots

| 名称    | 参数 | 说明           | 版本 |
| ------- | ---- | -------------- | ---- |
| toolbar | `()` | 表格左上工具栏 |      |
