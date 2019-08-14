import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MainMain from './MainMain';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <MainMain />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});