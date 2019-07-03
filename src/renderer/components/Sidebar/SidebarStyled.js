import React from 'react';
import styled from 'styled-components'

const Styled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 5;
    width: 110px;
    background-color: #5b76b8;
    padding-top: 30px;
    
    .sidebar-logo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: #fff;
      .sidebar-logo-icon {
        text-align: center;
        line-height: 77px;
      }
    }
    
    .sidebar-menu {
      margin-top: 40px;
      width: 100%;
      .sidebar-menu-item {
        display: block;
        width: 100%;
        text-align: center;
        line-height: 50px;
        position: relative;
        margin-bottom: 10px;
        cursor: pointer;
        &.sidebar-menu-item-active, &:hover {
          background: #475e94;
          cursor: default;
          &:before {
            content: '';
            position: absolute;
            display: block;
            width: 5px;
            height: 100%;
            background-color: #86bae7;
          }
        }
      }
    }
    
    .sidebar-create-post {
      margin-top: 20px;
      .btn-info {
        width: 95px;
        height: 65px;
        background-color: #97a9d2;
        border-color: #97a9d2;
      }
    }
`;

export default Styled;