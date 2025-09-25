import { attachPropertiesToComponent } from '../../helpers';
import Checkbox from './checkbox';
import CheckboxGroup from './checkbox-group';
import CheckboxIcon from './checkbox-icon';

export default attachPropertiesToComponent(Checkbox, {
  Icon: CheckboxIcon,
  Group: CheckboxGroup,
});
