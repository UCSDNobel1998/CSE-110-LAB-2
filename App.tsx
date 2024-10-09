import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { Label, Note } from "./types";
import { dummyNotesList } from "./constants";
import { ThemeContext, themes } from "./themeContext";

function App() {
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);
  const [favorites, setFavorites] = useState<string[]>([]);
  const initialNote = { id: -1, title: "", content: "", label: Label.other };
  const [newNote, setNewNote] = useState<Note>(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === themes.light ? themes.dark : themes.light);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewNote(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNoteWithId: Note = {
      ...newNote,
      id: notes.length + 1
    };
    setNotes(prev => [...prev, newNoteWithId]);
    setNewNote(initialNote);
  };

  const toggleFavorite = (title: string) => {
    setFavorites(prev => 
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const deleteNote = (id: number) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const selectNoteForEdit = (note: Note) => {
    setSelectedNote(note);
  };

  const handleNoteEdit = (e: React.ChangeEvent<HTMLDivElement>, field: keyof Note) => {
    if (selectedNote) {
      setSelectedNote({
        ...selectedNote,
        [field]: e.currentTarget.textContent || ''
      });
    }
  };

  const saveEditedNote = () => {
    if (selectedNote) {
      setNotes(prev => prev.map(note => 
        note.id === selectedNote.id ? selectedNote : note
      ));
      setSelectedNote(null);
    }
  };

  useEffect(() => {
    console.log('Favorites updated:', favorites);
  }, [favorites]);

  return (
    <ThemeContext.Provider value={theme}>
      <div className='app-container' style={{ backgroundColor: theme.background, color: theme.foreground }}>
        <form className="note-form" onSubmit={handleSubmit}>
          <div>
            <input 
              name="title"
              value={newNote.title}
              onChange={handleInputChange}
              placeholder="Note Title" 
              required
            />
          </div>
          <div>
            <textarea 
              name="content"
              value={newNote.content}
              onChange={handleInputChange}
              placeholder="Note Content"
              required
            ></textarea>
          </div>
          <div>
            <select 
              name="label"
              value={newNote.label}
              onChange={handleInputChange}
              required
            >
              {Object.values(Label).map(label => (
                <option key={label} value={label}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit">Create Note</button>
          </div>
        </form>
        <div className="notes-grid">
         {notes.map((note) => (
           <div
             key={note.id}
             className="note-item">
             <div className="notes-header">
               <button onClick={() => deleteNote(note.id)}>x</button>
               <button onClick={() => toggleFavorite(note.title)}>
                 {favorites.includes(note.title) ? '❤️' : '🤍'}
               </button>
               <button onClick={() => selectNoteForEdit(note)}>Edit</button>
             </div>
             {selectedNote && selectedNote.id === note.id ? (
               <>
                 <h2 
                   contentEditable 
                   onBlur={(e) => handleNoteEdit(e, 'title')}
                   suppressContentEditableWarning={true}
                 >
                   {note.title}
                 </h2>
                 <p 
                   contentEditable 
                   onBlur={(e) => handleNoteEdit(e, 'content')}
                   suppressContentEditableWarning={true}
                 >
                   {note.content}
                 </p>
                 <select 
                   value={selectedNote.label} 
                   onChange={(e) => handleNoteEdit(e as any, 'label')}
                 >
                   {Object.values(Label).map(label => (
                     <option key={label} value={label}>{label}</option>
                   ))}
                 </select>
                 <button onClick={saveEditedNote}>Save</button>
               </>
             ) : (
               <>
                 <h2>{note.title}</h2>
                 <p>{note.content}</p>
                 <p>{note.label}</p>
               </>
             )}
           </div>
         ))}
        </div>
        <div className="favorites-list">
          <h3>List of favorites:</h3>
          <ul className="favorites-items">
            {favorites.map((title, index) => (
              <li key={index}>{title}</li>
            ))}
          </ul>
        </div>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;