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

const App = ({ blogPosts, blogComments, selectedPost, fetchBlogEntity, selectBlogPost, searchInBlogEntity }) => {

  useEffect(() => { fetchBlogEntity() }, []);

  return (
    <StyledMain>
      <Sidebar />
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
          <PostViewer post={selectedPost}/>
        </div>
      </StyledContainer>
    </StyledMain>
  )
};

App.propTypes = {
  blogPosts: PT.array.isRequired,
  blogComments: PT.array.isRequired,
  selectedPost: PT.object,

  fetchBlogEntity: PT.func,
  selectBlogPost: PT.func,
  searchInBlogEntity: PT.func
};

const EnchApp = flowRight([withBlogModule()])(App);

export default () => {
  return (
    <Providers>
      <EnchApp />
    </Providers>
  );
};