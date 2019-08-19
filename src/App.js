import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import dummyStore from './dummy-store';
import Header from './Header/Header';
import './App.css';
import FolderList from './FolderList/FolderList';
import NoteList from './NoteList/NoteList';
import NoteView from './NoteView/NoteView'
import FolderView from './FolderView/FolderView';

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      folders: [],
      notes: []
    }
  };

  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600);
  }

  

  render() {
    const { folders, notes } = this.state;
    // const getFolderForNote = (notes= [], noteId) => 
    //   {
    //     notes.forEach((note) => {
    //       if(note.id === noteId) {
    //         return note.folderId;
    //       }
    //     });
    //   }
    const findFolder = (folders = [], folderId) =>
      folders.find(folder => folder.id === folderId)

    const findNote = (notes = [], noteId) =>
      notes.find(note => note.id === noteId)

    const getNotesForFolder = (notes = [], folderId) => (
      (!folderId)
        ? notes
        : notes.filter(note => note.folderId === folderId)
    )

    const countNotesForFolder = (notes = [], folderId) =>
      notes.filter(note => note.folderId === folderId).length

    return (
      <main className='App' >
        <Header />
        {['/', '/folders/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              return(
                <FolderList
                  folders={folders}
                  notes={notes}
                  {...routeProps}
                />
              )
            }}
          />
        )
        )}
        
        <Route
          path='/notes/:noteId'
          render={routeProps => {

            const { noteId } = routeProps.match.params;
            console.log(noteId);
            const note = findNote(notes, noteId) || { content: '' };
            console.log(note);
            const folder = findFolder(folders, note.folderId);

            return (
              <FolderView
                {...routeProps}
                folder={folder}
                note={note}
              />
            )
          }}
        />
        
        <Route 
          path='/notes/:noteId'
          render={routeProps => {
            
            const { noteId } = routeProps.match.params;
            console.log(noteId);
            const note = findNote(notes, noteId) || {content: ''};
            console.log(note);
            const folder = findFolder(folders, note.folderId);
            
            return (
            <NoteView
              {...routeProps}
              folder={folder}
              note={note}
            />
            )
          }}
        />
        {/* Map through these two options, same for both */}
        {['/', '/folders/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params;
              console.log( 'folderid', folderId);
              const notesForFolder = getNotesForFolder(notes, folderId);
              return (
                <NoteList
                  {...routeProps}
                  notes={notesForFolder}
                />
              )
            }}
           />
        ))
        }
      </main>
    );
  }
}
  
 

export default App;