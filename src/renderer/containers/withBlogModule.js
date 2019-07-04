import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, selectors } from '../redux/modules/blogModule/duck';

export default () => connect(
  state => ({
    blogPosts: selectors.getPosts(state),
    blogComments: selectors.getComments(state),
    selectedPost: selectors.getSelectedPost(state),
  }),
  dispatch => bindActionCreators(actions, dispatch)
);