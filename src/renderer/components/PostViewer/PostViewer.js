import React from 'react';
import PT from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';

import Styled from './PostViewerStyled';

const PostViewer = ({ post }) => {

  if(!post) return (
    <Styled>
    <div className="post-viewer-toolbox">

      <h2 className="post-viewer-toolbox__title">Empty viewer</h2>

      <div className="post-viewer-toolbox__left">
        <span className="post-viewer-toolbox__date">Please select blog post or change search criteria</span>
      </div>
    </div>
    </Styled>
  );

  return (
    <Styled>
      <div className="post-viewer-toolbox">

        <h2 className="post-viewer-toolbox__title">{ post.title }</h2>

        <div className="post-viewer-toolbox__left">
          <span className="post-viewer-toolbox__date">UserId: { post.userId }</span>
        </div>

        <div className="post-viewer-toolbox__right">
          <a className="post-viewer-toolbox__icon">
            <FaEdit size="20px"/>
          </a>
          <a className="post-viewer-toolbox__icon">
            <FaTrash size="20px"/>
          </a>
        </div>
      </div>

      <div className="post-viewer-content">
        { post.body }
      </div>
    </Styled>
  )
};

PostViewer.propTypes = {
  post: PT.object,
  selectBlogPost: PT.func
};

export default PostViewer;