# 表单 Form Plus

<!--single-column-->

Form Plus 拥有 Form 的 Props，请参考<n-a href="form#API">Form</n-a>。

## API

### Form Plus Props

<n-alert type="warning" title="注意" style="margin-bottom: 16px;" :bordered="false">
  Plus 组件属性除特殊标明外，统一写在 <n-text code>plus-props</n-text> 上
</n-alert>

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| plus:submit | `(model, refs) => void` | `undefined` | 表单点击提交时触发 |  |
| plus:reset | `() => void` | `undefined` | 表单点击重置时触发 |  |
| btnPlacement | `'top' \| 'bottom' \| 'top-left' \| 'bottom-left' \| ''` | `top` | 表单按钮位置(`''`则隐藏) |  |
| submitProps | `object` | `{}` | 提交按钮的属性，参考 <n-a href="button#API">Button Props</n-a> |  |
| resetProps | `object` | `{}` | 重置按钮的属性，参考 <n-a href="button#API">Button Props</n-a> |  |
| submitShow | `boolean` | `true` | 提交按钮的显隐 |  |
| resetShow | `boolean` | `false` | 重置按钮的显隐 |  |
| form-items | `FormItems` | `{}` | 表单项配置<strong>(\*直接写在表单上)</strong> |  |

### FormItems Type

其他属性参考 <n-a href="form#FormItem-Props">FormItem Props</n-a>

```ts
type FormItems = {
  type: 'input' | 'datePicker' | 'select' | 'inputNumber' | 'radio' | 'checkbox' | 'switch' | 'cascader' | 'transfer' | 'upload' | 'colorPicker' | 'divider' | 'slot' | 'button' | 'table' | 'grid' // 渲染的组件类型
  hidden: true | false // 是否隐藏该表单项
  drag: true | false // 动态表单项是否可拖拽（只在 type: 'grid' 下使用，且拖拽按钮占 span: 1）
  props: {} // 渲染的组件类型的属性, 参考naive各个组件
  // 其他属性参考 FormItem Props
}
```

### Form Plus Methods

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| setResetValues | `(values) => Void` | 设置重置时的数据，未设置则清空所有数据，一般配合重置按钮使用 |

### Form Plus Slots

| 名称   | 参数 | 说明                  |
| ------ | ---- | --------------------- |
| before | `()` | 重置/提交按钮前的部分 |

## 模板
```html
<div id="nPlus">
  <n-form-plus
    ref="form"
    :model="model"
    :form-items="formItems"
    @plus:submit="submit"
    :plus-props="{btnPlacement: 'bottom'}"
  >
    <template #before>
      <n-button @click="model.arr.push({ aa: null, dates: null })"
        >添加</n-button
      >
      <n-button
        @click="formItems.number1 = { label: '数字', type: 'inputNumber' }"
        >增加</n-button
      >
    </template>
    <template #kkk="{ model }">
      <n-input v-model:value="model.slot" />
    </template>
  </n-form-plus>
</div>

<script type="module">
  import NPlus from '~/Scripts/NPlusScript/index.js'
  const { createApp, h } = Vue
  const app = createApp({
    components: NPlus,
    data() {
      return {
        model: {
          slot: 'slot',
          text: 'text',
          date: 1662480000000,
          select: 1,
          arr: [{ aa: 111, dates: null }],
          table: [{ key: 1, name: '黄狗', age: 11 }]
        },
        formItems: {
          slot: {
            label: '插槽',
            span: 8,
            type: 'slot',
            props: { name: 'kkk' }
          },
          text: {
            label: '文本',
            rule: [
              {
                required: true,
                message: '请输入',
                trigger: ['blur', 'input']
              }
            ]
          },
          date: {
            label: '日期',
            type: 'datePicker',
            rule: [
              {
                required: true,
                type: 'number',
                message: '请输入date',
                trigger: ['blur', 'change']
              }
            ]
          },
          select: { label: '选择', type: 'select', props: { options: [] } },
          number: { label: '数字', type: 'inputNumber' },
          radio: {
            label: '单选',
            type: 'radio',
            props: {
              options: [
                { label: '单选1', value: 1 },
                { label: '单选2', value: 2 }
              ]
            }
          },
          checkbox: {
            label: '多选',
            type: 'checkbox',
            props: {
              options: [
                { label: '多选1', value: 1 },
                { label: '多选2', value: 2 }
              ]
            }
          },
          switch: { label: '开关', type: 'switch' },
          button: {
            label: ' ',
            type: 'button',
            props: {
              label: '隐藏选择栏',
              onclick: (r, i) => {
                this.formItems['select'].hidden = true
              }
            }
          },
          divider: {
            span: 24,
            type: 'divider',
            props: { label: '我是分割线' }
          },
          cascader: {
            label: '级联',
            type: 'cascader',
            props: {
              options: [
                {
                  label: '级联1',
                  value: 1,
                  children: [
                    { label: '级联1-1', value: 11 },
                    { label: '级联1-2', value: 12 }
                  ]
                },
                { label: '级联2', value: 2 }
              ]
            }
          },
          transfer: {
            label: '穿梭框',
            type: 'transfer',
            props: {
              options: [
                { label: '穿梭框1', value: 1 },
                { label: '穿梭框2', value: 2 }
              ]
            }
          },
          table: {
            label: '表格',
            type: 'table',
            props: {
              columns: [
                {
                  title: '序号',
                  key: 'key',
                  render: (r, i) =>
                    h(naive.NInputNumber, {
                      value: r.key,
                      onUpdateValue: (v) => {
                        this.model.table[i].key = v
                      }
                    })
                },
                {
                  title: '名字',
                  key: 'name',
                  render: (r, i) =>
                    h(naive.NInput, {
                      value: r.name,
                      onUpdateValue: (v) => {
                        this.model.table[i].name = v
                      }
                    })
                },
                {
                  title: '年龄',
                  key: 'age',
                  render: (r, i) =>
                    h(naive.NInputNumber, {
                      value: r.age,
                      onUpdateValue: (v) => {
                        this.model.table[i].age = v
                      }
                    })
                }
              ]
            }
          },
          divider1: {
            span: 24,
            type: 'divider',
            props: { label: '我是分割线' }
          },
          arr: {
            label: '动态元素',
            type: 'grid',
            drag: true,
            formItems: {
              aa: { span: 6, label: '动态1' },
              dates: {
                span: 6,
                label: '日期',
                type: 'datePicker',
                rule: [
                  {
                    required: true,
                    type: 'number',
                    message: 'dates',
                    trigger: ['blur', 'change']
                  }
                ]
              },
              button: {
                span: 3,
                label: ' ',
                type: 'button',
                props: {
                  label: '删除',
                  onclick: (r, i) => this.model.arr.splice(i, 1)
                }
              }
            }
          }
        }
      }
    },
    methods: {
      submit(data, refs) {
        console.log('submit', data)
      }
    }
  })
  app.use(naive).mount('#nPlus')
</script>
```
