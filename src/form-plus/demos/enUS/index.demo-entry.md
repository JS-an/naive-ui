# 表单 Form Plus

<!--single-column-->

Form Plus 拥有 Form 的 Props，请参考<n-a href="form#API">Form</n-a>。

## API

### Form Plus Props

<n-alert type="warning" title="注意" style="margin-bottom: 16px;" :bordered="false">
  Plus 组件属性除特殊标明外,统一写在 <n-text code>plus-props</n-text> 上
</n-alert>


| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| plus:submit | `(model, refs) => void` | `undefine` | 表单点击提交时触发 |  |
| plus:reset | `() => void` | `undefine` | 表单点击重置时触发 |  |
| btnPlacement | `'top' \| 'bottom' \| 'top-left' \| 'bottom-left' \| ''` | `top` | 表单按钮位置(`''`则隐藏) |  |
| submitProps | `object` | `{}` | 提交按钮的属性，参考 <n-a href="button#API">Button Props</n-a> |  |
| resetProps | `object` | `{}` | 重置按钮的属性，参考 <n-a href="button#API">Button Props</n-a> |  |
| submitShow | `boolean` | `true` | 提交按钮的显隐 |  |
| resetShow | `boolean` | `false` | 重置按钮的显隐 |  |
| form-items | `FormItems` | `{}` | 表单项配置<strong>(*直接写在表单上)</strong> |  |

### FormItems Type

  其他属性参考 <n-a href="form#FormItem-Props">FormItem Props</n-a>
```ts
type FormItems = {
  type: 'input' | 'datePicker' | 'select' | 'inputNumber' | 'radio' | 'checkbox' | 'switch' | 'cascader' | 'transfer' | 'upload' | 'colorPicker' | 'divider' | 'slot' | 'button' // 渲染的组件类型
  props: {} // 渲染的组件类型的属性, 参考naive各个组件
  // 其他属性参考 FormItem Props
}
```

### Form Plus Methods

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| setResetValues | `(values) => Void` | 设置重置时的数据，未设置则清空所有数据，一般配合重置按钮使用 |

### Form Plus Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| before | `()` | 重置/提交按钮前的部分 |
