import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, selectors } from '../redux/modules/skeletonModule/duck';

export default () => connect(
  state => ({
    data: selectors.getData(state),
  }),
  dispatch => bindActionCreators(actions, dispatch)
);