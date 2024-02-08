import { ChangeEvent, useState } from 'react'
import LogoNlw from './assets/logo-nlw.svg'
import NewNoteCard from './components/new-note-card'
import NoteCard from './components/note-card'
import { Toaster } from 'sonner'


interface Note {
  id: string,
  content: string,
  date: Date,
}

function App() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      const parsedNotes = JSON.parse(notesOnStorage) as Note[];
      parsedNotes.forEach(note => {
        note.date = new Date(note.date);
      });
      return parsedNotes;
    }

    return []
  })

  const onNoteCreated = (content: string) => {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }
    const notesArray = [newNote, ...notes];

    setNotes(notesArray);
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  const onNoteDeleted = (id: string) => {
    const newArray = notes.filter(note => {
      return note.id !== id
    })

    setNotes(newArray)
    localStorage.setItem('notes', JSON.stringify(newArray))
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value

    setSearch(query)
  }

  const filteredSearch = search !== ''
    ? notes.filter(note => note.content.includes(search.toLocaleLowerCase()))
    : notes

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5 '>
      <img src={LogoNlw} alt="NLW expert" />

      <form className='w-full'>
        <input
          type='text'
          placeholder='Busque em suas notas...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none'
          onChange={handleSearch}
        />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-col-1 md:grid-col-2 lg:grid-cols-3 auto-rows-[250px] gap-6'>
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredSearch.map(note => {
          return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
        })}
        <Toaster richColors />
      </div>
    </div>
  )
}

export default App
