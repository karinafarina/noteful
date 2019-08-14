import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import dummyStore from './dummy-store';
import Header from './Header/Header';
import './App.css';
import FolderMain from './FolderMain/FolderMain';
import FolderSidebar from './FolderSidebar/FolderSidebar';
import MainMain from './MainMain/MainMain';
import MainSidebar from './MainSidebar/MainSidebar';
import NoteMain from './NoteMain/NoteMain'
import NoteSidebar from './NoteSidebar/NoteSidebar';

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      folders: [],
      notes: []
    }
  };

  componentDidMount() {
    this.setState( {
      folders: dummyStore.folders,
      notes: dummyStore.notes,
    })
  }
  render() {
    return (
      <main className='App' >
        <Header />
        <Route exact path='/' component={MainSidebar} />
        <Route path='/folder' component={FolderSidebar} />
        <Route path='/note' component={NoteSidebar} />
        
        <Route exact path='/' render={(routerProps) => 
          <MainMain notes={this.state.notes}/>
          } />
        <Route path='/folder' component={FolderMain} />
        <Route path='/note' component={NoteMain} />
      </main>
    );
  }
}
  
 

export default App;