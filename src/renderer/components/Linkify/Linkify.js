import React from 'react';
import PT from 'prop-types';
import Linkifier from 'react-linkifier';

import { shell } from 'electron';

const LinkOpenExternalRenderer = ({href, children}) => (
  <a
    href="javascript:;"
    onClick={() => shell.openExternal(href)}
  >
    {children}
  </a>
);

LinkOpenExternalRenderer.propTypes = {
  children: PT.node,
  href: PT.string
};

const Linkify = ({ children }) => <Linkifier renderer={LinkOpenExternalRenderer}>{ children }</Linkifier>;

Linkify.propTypes = {
  children: PT.node
};

export default Linkify;