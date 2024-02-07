const NoteCard = () => {
  return (
    <button className='rounded-md text-left outline-none bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
      <span className='text-sm font-medium text-slate-300'>há 2 dias</span>
      <p className='text-slate-400 text-sm leading-6'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel voluptatibus a porro unde sit temporibus? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus eum quam eveniet aut doloremque, expedita numquam et eos laudantium tenetur voluptas possimus dolores? Dolores nisi vero minus illo laboriosam doloribus. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem mollitia earum repellendus. Blanditiis provident, saepe, ipsum neque similique laborum nesciunt doloremque repudiandae delectus fugit in vero, minus temporibus numquam beatae?</p>
      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none' />
    </button>
  )
}

export default NoteCard;