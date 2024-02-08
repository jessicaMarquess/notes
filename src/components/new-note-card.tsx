import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

const NewNoteCard = () => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [content, setContent] = useState('');

  const handleStartEditor = () => {
    setShouldShowOnboarding(false)
  }

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = event;

    if (target.value === '') {
      setShouldShowOnboarding(true)
    }
  }

  const handleSaveNote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(content)
    toast.success('Nota criada com sucesso!')
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className='outline-none rounded-md bg-slate-700 p-5 flex flex-col text-left gap-3 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
        <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
        <p className='text-slate-400 text-sm leading-6'>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50' />
        <Dialog.Content
          className='fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] rounded-md flex 
                    flex-col bg-slate-700 outline-none'
        >
          <Dialog.Close className='absolute right-0 top-0 p-1.5 text-slate-600 bg-slate-800 hover:text-slate-100'>
            <X className='size-5' />
          </Dialog.Close>
          <form onSubmit={handleSaveNote} className='flex flex-col flex-1'>
            <div className='flex flex-1 flex-col gap-3 p-5'>
              <span className='text-sm font-medium text-slate-300'>Adicionar nota</span>

              {shouldShowOnboarding ? (
                <p className='text-slate-400 text-sm leading-6'>
                  Comece {' '}
                  <button className='text-lime-400 font-medium hover:underline'>gravando uma nota em áudio {' '}</button>
                  {' '}ou se preferir{' '}
                  <button className='text-lime-400 font-medium hover:underline' onClick={handleStartEditor}>
                    utilize apenas texto
                  </button>.
                </p>
              ) : (
                <textarea
                  className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                  autoFocus
                  onChange={handleContentChange}
                />
              )}
            </div>
            <button
              type='submit'
              className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'
            >
              Salvar nota
            </button>
          </form>
        </Dialog.Content >
      </Dialog.Portal >
    </Dialog.Root >
  )
}

export default NewNoteCard;