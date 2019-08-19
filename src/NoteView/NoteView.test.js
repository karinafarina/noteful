import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NoteView from './NoteView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NoteView />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
