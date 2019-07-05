import React, { useEffect } from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import flowRight from 'lodash/flowRight';

import Providers from './redux/Provider';
import withBlogModule from './containers/withBlogModule';

import Sidebar from './components/Sidebar/Sidebar';
import PostList from './components/PostList/PostList';
import PostViewer from './components/PostViewer/PostViewer';
import PostUpsertForm from './components/PostUpsertForm/PostUpsertForm';
import CommentsUpsertForm from './components/CommentsUpsertForm/CommentsUpsertForm';
import Loader from './components/Loader/Loader';

const StyledMain = styled.main`
  max-height: 100vh;
  overflow: hidden;
`;

const StyledContainer = styled(Container)`
  display: flex;
  margin: 0 0 0 110px;
  width: calc(100% - 110px);
  padding: 0;
  .app-position {
    margin: 0;
  }
  .app-position--grow {
    flex-grow: 1;
  }
`;

const App = ({
  blogPosts,
  blogComments,
  selectedPost,
  upsertEntityFormMetadata,

  fetchBlogEntity,
  selectBlogPost,
  searchInBlogEntity,
  openBlogEntityUpsertForm,
  closeBlogEntityUpsertForm,
  upsertBlogPost,
  removeBlogPost,
  upsertBlogComment,
  removeBlogComment,
  isLoading,
}) => {

  useEffect(() => { fetchBlogEntity() }, []);

  return (
    <StyledMain>
      <Sidebar handleCreate={openBlogEntityUpsertForm}/>
      <StyledContainer fluid>
        <div className="app-position">
          <PostList
            posts={blogPosts}
            activePostId={selectedPost && selectedPost.id}
            handleSelectBlogPost={selectBlogPost}
            handleBlogPostSearch={searchInBlogEntity}
          />
        </div>
        <div className="app-position app-position--grow">
          <PostViewer
            post={selectedPost}
            handleOpenBlogEntityUpsertForm={openBlogEntityUpsertForm}
            handelRemoveBlogPost={removeBlogPost}
            handleRemoveBlogComments={removeBlogComment}
          />
        </div>
      </StyledContainer>

      { upsertEntityFormMetadata && upsertEntityFormMetadata.type === 'post' && (
        <PostUpsertForm
          mode={upsertEntityFormMetadata.mode}
          post={upsertEntityFormMetadata.entity}
          handleSuccess={upsertBlogPost}
          handleClose={closeBlogEntityUpsertForm}
        />
      ) }

      { upsertEntityFormMetadata && upsertEntityFormMetadata.type === 'comment' && (
        <CommentsUpsertForm
          mode={upsertEntityFormMetadata.mode}
          comment={upsertEntityFormMetadata.entity}
          currentPostId={selectedPost && selectedPost.id}
          handleSuccess={upsertBlogComment}
          handleClose={closeBlogEntityUpsertForm}
        />
      ) }

      { isLoading && <Loader /> }

    </StyledMain>
  )
};

App.propTypes = {
  blogPosts: PT.array.isRequired,
  blogComments: PT.array.isRequired,
  selectedPost: PT.object,
  upsertEntityFormMetadata: PT.object,
  isLoading: PT.bool,

  fetchBlogEntity: PT.func,
  selectBlogPost: PT.func,
  searchInBlogEntity: PT.func,
  openBlogEntityUpsertForm: PT.func,
  closeBlogEntityUpsertForm: PT.func,
  upsertBlogPost: PT.func,
  removeBlogPost: PT.func,
  upsertBlogComment: PT.func,
  removeBlogComment: PT.func
};

const EnchApp = flowRight([withBlogModule()])(App);

export default () => {
  return (
    <Providers>
      <EnchApp />
    </Providers>
  );
};