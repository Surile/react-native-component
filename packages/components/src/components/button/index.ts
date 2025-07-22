
import { attachPropertiesToComponent } from '../../helpers'
import Button from './button'
import ButtonOption from './button-option'
import ButtonOptionGroup from './button-option-group'

export default attachPropertiesToComponent(Button, {
  Option: ButtonOption,
  OptionGroup: ButtonOptionGroup,
})
