import FormTemplate from './components/FormTemplate.js'
const { createDiscreteApi, zhCN, dateZhCN } = window.naive;
// 脱离上下文的组件使用
const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ["message", "dialog", "notification", "loadingBar"]
  // { configProviderProps: configProviderPropsRef }
);

// 默认 plus 参数
const defaultPlusProps = {
  btnPlacement: 'top', // 表单按钮位置或显隐 'top' | 'bottom | 'top-left' | 'bottom-left' | ''
  submitProps: {}, // 提交按钮的属性
  submitShow: true, // 提交按钮显隐
  resetProps: {}, // 重置按钮的属性
  resetShow: false, // 重置按钮显隐
};

// 默认 plus 事件
const defaultPlusEmit = ['plus:submit', 'plus:reset']

export default {
  name: "NFormPlus", // 在引用自身的时候是必须的
  components: { FormTemplate },
  props: {
    model: { type: Object, default: () => ({}) }, // 表单数据
    formItems: { type: Object, default: () => ({}) }, // 表单项配置
    plusProps: { type: Object, default: () => ({}) } // 组件配置
  },
  data() {
    return {
      zhCN,
      dateZhCN,
      resetModel: {}, // 重置时的数据
      ref: 'NFormPlus'
    };
  },
  computed: {
    plus() {
      return Object.assign({}, defaultPlusProps, this.plusProps);
    },
  },
  // watch: {
  //   formItems: {
  //     // deep: true,
  //     handler(val) {
  //       console.log(val)
  //     }
  //   }
  // },
  methods: {
    /**plus 事件 */
    plusEmit(event, ...arg) {
      if (defaultPlusEmit.includes(event)) {
        this.$emit(event, ...arg)
      } else {
        console.warn(`该组件无 ${event} 事件`)
      }
    },
    /**提交 */
    handleSubmit() {
      this.$refs[this.ref].validate((errors) => {
        if (!errors) {
          // message.success('Success')
          const data = JSON.parse(JSON.stringify(this.model))
          this.plusEmit('plus:submit', data, this.$refs)
        } else {
        }
      })
    },
    /**重置 */
    handleReset() {
      const reset = (model, resetModel) => {
        for (const key in model) {
          const type = Object.prototype.toString.call(model[key])
          if (type === '[object Object]') {
            resetModel[key] ? model[key] = _.cloneDeep(resetModel[key]) : model[key] = {}
          } else if (type === '[object Array]') {
            resetModel[key] ? model[key] = _.cloneDeep(resetModel[key]) : model[key] = []
          } else {
            resetModel[key] ? model[key] = resetModel[key] : model[key] = null
          }
        }
      }
      reset(this.model, this.resetModel)
      this.plusEmit('plus:reset')
    },
    /**设定重置值 */
    setResetValues(values) {
      this.resetModel = _.cloneDeep(values)
    }
  },
  template: `
<n-config-provider :locale="zhCN" :date-locale="dateZhCN">
  <n-card size="small" :bordered="false">
    <n-form size="small" v-bind="$attrs" :model="model" :ref="ref">
      <n-space
        v-if="plus.btnPlacement === 'top' || plus.btnPlacement === 'top-left'"
        :justify="plus.btnPlacement === 'top' ? 'end' : 'start'"
        style="
          position: sticky;
          top: 0;
          border-bottom: 1px solid #efeff5;
          margin-bottom: 8px;
          background-color: white;
          z-index: 1;
          padding: 8px 0;
        "
      >
        <slot name="before"></slot>
        <n-button v-if="plus.resetShow" @click="handleReset"  v-bind="plus.resetProps"> 重置 </n-button>
        <n-button v-if="plus.submitShow" type="success" @click="handleSubmit" v-bind="plus.submitProps"> 提交 </n-button>
      </n-space>
      <form-template :model="model" :form-items="formItems">
        <template v-for="(item, key) in $slots" :key="key" #[key]>
          <slot :name="key" :model="model"></slot>
        </template>
      </form-template>
      <n-space
        v-if="plus.btnPlacement === 'bottom' || plus.btnPlacement === 'bottom-left'"
        :justify="plus.btnPlacement === 'bottom' ? 'end' : 'start'"
        style="
          position: sticky;
          bottom: 0;
          border-top: 1px solid #efeff5;
          margin-top: 8px;
          background-color: white;
          z-index: 1;
          padding: 8px 0;
        "
      >
        <slot name="before"></slot>
        <n-button v-if="plus.resetShow" @click="handleReset" v-bind="plus.resetProps"> 重置 </n-button>
        <n-button v-if="plus.submitShow" type="success" @click="handleSubmit" v-bind="plus.submitProps"> 提交 </n-button>
      </n-space>
    </n-form>
  </n-card>
</n-config-provider>
  `
};
