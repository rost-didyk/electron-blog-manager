import React from 'react';
import PT from 'prop-types';
import { FaThLarge } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';

import Styled from './PostListStyled';

const PostList = ({ posts, activePostId, handleSelectBlogPost, handleBlogPostSearch }) => {
  return (
    <Styled>

      <div className="post-list_search">
        <Form inline onSubmit={e => e.preventDefault()}>
          <MdSearch
            size="24px"
          />
          <Input
            className="post-list_search-input"
            type="search"
            placeholder="Search..."
            onChange={e => handleBlogPostSearch(e.currentTarget.value)}
          />
        </Form>
      </div>

      <div className="post-list_items">

        { posts.map(post => (
          <a
            key={post.id}
            className={`post-list_item ${activePostId === post.id && 'post-list_item--active'}`}
            onClick={() => handleSelectBlogPost(post.id)}>
            <span className="post-list_item-icon">
              <FaThLarge color="#537a98" size="16px" />
            </span>
            <span className="post-list_item-title">{ post.title }</span>
            <span className="post-list_item-date">UserID: { post.userId }</span>
          </a>
        )) }

      </div>

    </Styled>
  )
};

PostList.propTypes = {
  posts: PT.array,
  handleSelectBlogPost: PT.func,
  handleBlogPostSearch: PT.func,
};

export default PostList;