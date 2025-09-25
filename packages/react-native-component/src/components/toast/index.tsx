import { attachPropertiesToComponent } from '../../helpers';
import {
  fail,
  Instance,
  loading,
  resetDefaultOptions,
  setDefaultOptions,
  success,
  warn,
} from './toast-instance';

export default attachPropertiesToComponent(Instance, {
  loading,
  success,
  fail,
  warn,
  setDefaultOptions,
  resetDefaultOptions,
});
