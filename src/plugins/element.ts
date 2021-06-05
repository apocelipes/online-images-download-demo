import lang from 'element-plus/lib/locale/lang/ja'
import locale from 'element-plus/lib/locale'
import {App} from 'vue'

import { 
  ElButton,
  ElContainer,
  ElFooter,
  ElProgress,
  ElMain,
  ElAside,
  ElHeader,
  ElSkeleton,
  ElSkeletonItem
} from 'element-plus'

const components = [
  ElButton,
  ElContainer,
  ElFooter,
  ElProgress,
  ElMain,
  ElAside,
  ElHeader,
  ElSkeleton,
  ElSkeletonItem
]

export default (app: App) => {
  locale.use(lang)
  for (const component of components) {
    app.component(component.name, component)
  }
}
