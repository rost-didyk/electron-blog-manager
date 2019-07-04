import React from 'react';
import styled from 'styled-components';

const Styled = styled.div`
  background-color: #fafafa;
  width: 350px;
  
  .post-list_search {
    height: 80px;
    background-color: #ececec;
    padding: 20px;
    .post-list_search-input {
     margin-left: 10px;
     width: 275px;
    }
  }
  
  .post-list_items {
     height: 100vh;
     overflow: scroll;
     padding-bottom: 80px;
  }
  
  .post-list_item {
    display: flex;
    height: 50px;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
    &.post-list_item--active,
    &:hover {
      background-color: #dfe4f1;
    }
    .post-list_item-icon {
      padding-right: 20px;
    }
    .post-list_item-title {
      display: inline-block;
      font-size: 16px;
      font-weight: 500;
      max-width: 190px;
      white-space: nowrap;
      overflow: hidden;
      padding: 5px;
      text-overflow: ellipsis;
    }
    .post-list_item-date {
      text-align: right;
      flex: auto;
      color: #888;
    }
  }
  
`;

export default Styled;