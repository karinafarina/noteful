import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import FolderMain from './FolderMain';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <FolderMain />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
