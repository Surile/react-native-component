import { attachPropertiesToComponent } from '../../helpers';
import Loading from './loading';
import LoadingSpinner from './loading-spinner';

export default attachPropertiesToComponent(Loading, {
  Spinner: LoadingSpinner,
});
