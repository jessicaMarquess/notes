import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

interface NewNoteContentProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

const NewNoteCard = ({ onNoteCreated }: NewNoteContentProps) => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [content, setContent] = useState('');

  const handleStartEditor = () => {
    setShouldShowOnboarding(false);
  }

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = event;
    setContent(target.value);

    if (target.value === '') {
      setShouldShowOnboarding(true);
    }
  }

  const handleSaveNote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onNoteCreated(content);
    setContent('');
    setShouldShowOnboarding(true);
    toast.success('Nota criada com sucesso!');
  }

  const handleStartRecording = () => {
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window
      || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      toast.error('Navegador não suporta a API de gravação.')
      return
    }

    setIsRecording(true)
    setShouldShowOnboarding(false)

    const SpeechRecognitionApi = window.SpeechRecognition || window.webkitSpeechRecognition

    const speechRecognition = new SpeechRecognitionApi()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event)
    }

    speechRecognition.start()
  }

  const handleStopRecording = () => {
    setIsRecording(false)

    speechRecognition?.stop()
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
          className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 max-w-[640px] w-full md:h-[60vh] md:rounded-md flex flex-col bg-slate-700 outline-none'
        >
          <Dialog.Close className='absolute right-0 top-0 p-1.5 text-slate-600 bg-slate-800 hover:text-slate-100' onClick={() => setShouldShowOnboarding(true)}>
            <X className='size-5' />
          </Dialog.Close>
          <form onSubmit={handleSaveNote} className='flex flex-col flex-1'>
            <div className='flex flex-1 flex-col gap-3 p-5'>
              <span className='text-sm font-medium text-slate-300'>Adicionar nota</span>

              {shouldShowOnboarding ? (
                <p className='text-slate-400 text-sm leading-6'>
                  Comece {' '}
                  <button type='button' className='text-lime-400 font-medium hover:underline' onClick={handleStartRecording}>gravando uma nota em áudio {' '}</button>
                  {' '}ou se preferir{' '}
                  <button type='button' className='text-lime-400 font-medium hover:underline' onClick={handleStartEditor}>
                    utilize apenas texto
                  </button>.
                </p>
              ) : (
                <textarea
                  className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                  autoFocus
                  onChange={handleContentChange}
                  value={content}
                />
              )}
            </div>
            {isRecording ? (
              <button
                type='button'
                onClick={handleStopRecording}
                className='w-full flex items-center justify-center gap-x-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100 disabled:cursor-not-allowed'
              >
                <div className='size-3 rounded-full bg-red-500 animate-pulse' />
                Gravando! (Clique para interromper)
              </button>
            ) : (
              <button
                type='submit'
                className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500 disabled:cursor-not-allowed disabled:bg-lime-500'
                disabled={content === ''}
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content >
      </Dialog.Portal >
    </Dialog.Root >
  )
}

export default NewNoteCard;