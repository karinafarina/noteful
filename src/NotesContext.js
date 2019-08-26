import React from 'react'

const NotesContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  getNotesForFolder: () => {},
  findNote: () => {},
})

export default NotesContext