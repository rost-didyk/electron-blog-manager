import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import { Container } from 'reactstrap';

import Providers from './redux/Provider';

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

const App = () => {
  return (
    <StyledMain>
      <Sidebar />
      <StyledContainer fluid>
        <div className="app-position">
          <PostList />
        </div>
        <div className="app-position app-position--grow">
          <PostViewer />
        </div>
      </StyledContainer>
    </StyledMain>
  )
};

App.propTypes = {};

export default () => {
  return (
    <Providers>
      <App />
    </Providers>
  );
};