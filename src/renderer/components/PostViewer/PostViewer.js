import React from 'react';
import PT from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';

import Styled from './PostViewerStyled';

const PostViewer = ({
    post,
    handleOpenBlogEntityUpsertForm,
    handelRemoveBlogPost,
    handleRemoveBlogComments
}) => {

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
          <a className="post-viewer-toolbox__icon" onClick={() => handleOpenBlogEntityUpsertForm('post', 'edit', post)}>
            <FaEdit size="20px"/>
          </a>
          <a className="post-viewer-toolbox__icon" onClick={() => confirm('Remove this post?') && handelRemoveBlogPost(post.id)}>
            <FaTrash size="20px"/>
          </a>
        </div>
      </div>
      <div className="post-viewer-content">
        <div className="post-viewer-content__body">{ post.body }</div>
        <div className="post-viewer-content__comments">
          <p className="post-viewer-content__comments-count">{ post.comments.length } comments</p>
          <button
            color="info"
            className="post-viewer-content__comments-create"
            onClick={() => handleOpenBlogEntityUpsertForm('comment', 'create', null)}
          >
            <FaPlus size="16px"/> Add comment
          </button>

          { post.comments.map(comment => (
            <div className="post-viewer-content__comments-item" key={comment.id}>
              <Toast>
                <ToastHeader>
                  <div className="post-viewer-content__comments-title">
                    { comment.email }
                  </div>
                  <div className="post-viewer-content__comments-icons">
                    <a onClick={() => handleOpenBlogEntityUpsertForm('comment', 'edit', comment)}>
                      <FaEdit size="16px"/>
                    </a>
                    <a onClick={() => confirm('Remove this comments?') && handleRemoveBlogComments(comment.id)}>
                      <FaTrash size="16px"/>
                    </a>
                  </div>
                </ToastHeader>
                <ToastBody>
                  { comment.body }
                </ToastBody>
              </Toast>
            </div>
          )) }

        </div>
      </div>
    </Styled>
  )
};

PostViewer.propTypes = {
  post: PT.object,

  handleOpenBlogEntityUpsertForm: PT.func,
  handelRemoveBlogPost: PT.func,
  handleRemoveBlogComments: PT.func
};

export default PostViewer;