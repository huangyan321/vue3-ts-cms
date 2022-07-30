import {
  ElButton,
  ElRow,
  ElIcon,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElCheckbox
} from 'element-plus'
import { App } from 'vue'
const components = [ElButton, ElRow, ElIcon, ElTabs, ElTabPane, ElForm, ElFormItem, ElCheckbox]
export function registerElement(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
