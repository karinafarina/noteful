import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NoteMain from './NoteMain';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NoteMain />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
