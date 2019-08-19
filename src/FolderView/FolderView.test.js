import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import FolderView from './FolderView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <FolderView />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
