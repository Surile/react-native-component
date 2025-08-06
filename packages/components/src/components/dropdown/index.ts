import { attachPropertiesToComponent } from '../../helpers';
import { useDropdownConfig } from './context';
import FilterTypeButton from './dropdown-filter-panel';
import DropdownItem from './dropdown-item';
import DropdownMenu from './dropdown-menu';
import DropdownMultiple from './dropdown-multiple';
import DropdownPopup from './dropdown-popup';
import DropdownText from './dropdown-text';
import DropdownTime from './dropdown-time';
import DropdownTypeItems from './dropdown-type-items';

export default attachPropertiesToComponent(DropdownMenu, {
  Item: DropdownItem,
  Multiple: DropdownMultiple,
  Text: DropdownText,
  Popup: DropdownPopup,
  Button: FilterTypeButton,
  Time: DropdownTime,
  useDropdownConfig,
  TypeItems: DropdownTypeItems,
});
