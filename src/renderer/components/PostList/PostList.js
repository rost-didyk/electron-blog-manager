import React from 'react';
import PT from 'prop-types';
import { FaThLarge } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';

import Styled from './PostListStyled';


const PostList = () => {
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
          />
        </Form>
      </div>

      <div className="post-list_items">

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">start01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">01.12.11</span>
        </a>

        <a className="post-list_item">
          <span className="post-list_item-icon">
            <FaThLarge color="#537a98" size="16px" />
          </span>
          <span className="post-list_item-title">Name of posts</span>
          <span className="post-list_item-date">end01.12.11</span>
        </a>

      </div>

    </Styled>
  )
};

export default PostList;