const formStyle = {

  container: 'w-full h-full flex items-center justify-center bg-zinc-400 min-h-screen',

  label: 'cursor-text absolute left-3 top-1 bottom-0 font-normal text-gray-600 text-lg transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-zinc-800 peer-focus:text-lg peer-focus:m-0 peer-focus:font-semibold peer-read-only:-top-7 peer-read-only:text-zinc-800 peer-read-only:font-semibold peer-read-only:text-lg peer-read-only:m-0 peer-valid:-top-7 peer-valid:text-zinc-800 peer-valid:font-semibold peer-valid:text-lg peer-valid:m-0 pointer-events-none',

  input: 'pl-4 rounded-xl peer h-10 w-full border-b-2 border-gray-300 text-zinc-800 focus:outline-none focus:border-blue-500',

  textArea: 'p-2 rounded-xl peer h-20 max-h-36 w-full border-b-2 border-gray-300 text-zinc-800 placeholder-transparent focus:outline-none focus:border-blue-500',

  greenButton: 'bg-green-700 flex justify-center font-semibold py-1 border border-zinc-500 text-lg w-6/12 text-center items-center rounded-lg hover:border-black hover:bg-green-600 text-white',

  redButton: 'bg-red-700 flex justify-center font-semibold py-1 border border-zinc-500 text-lg w-6/12 text-center items-center rounded-lg hover:border-black hover:bg-red-600 text-white',

  blueButton: 'bg-blue-700 flex justify-center font-semibold py-1 border border-zinc-500 text-lg w-6/12 text-center items-center rounded-lg hover:border-black hover:bg-blue-500 text-white',
}




const container = {
  main: 'flex w-full h-full bg-zinc-400 items-start justify-start',
}

export { formStyle, container };
