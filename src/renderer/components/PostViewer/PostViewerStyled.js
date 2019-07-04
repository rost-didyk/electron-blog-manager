import React from 'react';
import styled from 'styled-components';

const Styled = styled.div`
   min-width: 500px;
 
  .post-viewer-toolbox {
      border-bottom: 2px solid #ececec;
     padding: 9px 20px;
     .post-viewer-toolbox__title {
        font-size: 30px;
        padding: 0;
        margin: 0;
      }
      
      .post-viewer-toolbox__date {
        color: #888;
      }
      
      .post-viewer-toolbox__icon {
        cursor: pointer;
        margin-left: 10px;
      }
      
     .post-viewer-toolbox__left {
        display: inline-block;
     }
     
     .post-viewer-toolbox__right {
        display: inline-block;
        float: right;
        text-align: right;
     }
  }
  .post-viewer-content {
     height: 100vh;
     overflow: scroll;
     padding: 20px 20px 80px 20px;
     
     .post-viewer-content__comments {
       margin-top: 30px;
       .post-viewer-content__comments-count {
          color: #888;
          border-top: 1px solid #888;
       }
       .post-viewer-content__comments-create {
          margin-bottom: 20px;
       }
       .post-viewer-content__comments-item {
          margin-bottom: 20px;
          .toast {
              max-width: 100%;
              box-shadow: none;
          }
          .mr-auto {
            width: 100%;
          }
          .post-viewer-content__comments-title {
            display: inline-block;
          }
          .post-viewer-content__comments-icons {
            display: inline-block;
            float: right;
            > a {
              margin-left: 10px;
              cursor: pointer;
            }
          }
       }
     }
  }
  
`;

export default Styled;