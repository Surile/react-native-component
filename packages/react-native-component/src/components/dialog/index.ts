
import { attachPropertiesToComponent } from '../../helpers'
import {
  Instance,
  confirm,
  input,
  Component,
  DialogComponent,
  Keyboard,
  KeyboardComponent,
} from './dialog-instance'

export default attachPropertiesToComponent(Instance, {
  confirm,
  input,
  Component,
  DialogComponent,
  Keyboard,
  KeyboardComponent,
})
