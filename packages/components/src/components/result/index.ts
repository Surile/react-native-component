
import { attachPropertiesToComponent } from '../../helpers'
import IconBox from './icons/result-icon-box'
import IconEmpty from './icons/result-icon-empty'
import IconError from './icons/result-icon-error'
import IconWarning from './icons/result-icon-warning'
import Result from './result'

export default attachPropertiesToComponent(Result, {
  IconBox: IconBox,
  IconEmpty: IconEmpty,
  IconError: IconError,
  IconWarning: IconWarning,
})
