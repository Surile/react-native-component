
import { attachPropertiesToComponent } from '../../helpers'
import ButtonBar from './button-bar'
import ButtonBarConfirm from './button-bar-confirm'

export default attachPropertiesToComponent(ButtonBar, {
  Confirm: ButtonBarConfirm,
})
