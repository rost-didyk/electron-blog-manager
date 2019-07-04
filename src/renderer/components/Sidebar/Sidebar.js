import React from 'react';
import PT from 'prop-types';
import { FaSmileBeam, FaThLarge, FaInfo, FaCode, FaPlus } from 'react-icons/fa';
import { Button } from 'reactstrap';

import Styled from './SidebarStyled';

const Sidebar = ({ handleCreate }) => {
  return (
    <Styled>
      <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <FaSmileBeam  size="75px" color="#ccc"/>
          </div>
      </div>

      <div className="sidebar-menu">
        <a className="sidebar-menu-item sidebar-menu-item-active">
          <FaThLarge size="24px" color="#fff"/>
        </a>

        <a className="sidebar-menu-item">
          <FaInfo size="24px" color="#fff"/>
        </a>

        <a className="sidebar-menu-item">
          <FaCode size="24px" color="#fff"/>
        </a>

      </div>

      <div className="sidebar-create-post">
        <Button color="info" onClick={() => handleCreate('post', 'create')}>
          <FaPlus size="24px"/>
        </Button>
      </div>

    </Styled>
  )
};

Sidebar.propTypes = {
  handleCreate: PT.func
};

export default Sidebar;