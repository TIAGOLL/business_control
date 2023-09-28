const formStyle = {
  label: 'cursor-text absolute left-10 top-1 bottom-0 font-normal text-gray-600 text-lg transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-zinc-800 peer-focus:text-lg peer-focus:m-0 peer-focus:font-semibold peer-read-only:-top-7 peer-read-only:text-zinc-800 peer-read-only:font-semibold peer-read-only:text-lg peer-read-only:m-0 peer-valid:-top-7 peer-valid:text-zinc-800 peer-valid:font-semibold peer-valid:text-lg peer-valid:m-0',

  input: 'pl-4 rounded-xl peer h-10 w-full border-b-2 border-gray-300 text-zinc-800 placeholder-transparent focus:outline-none focus:border-blue-500',

  greenButton: 'p-4 rounded bg-green-600 border-2 border-zinc-200 text-white font-semibold hover:bg-green-700 hover:border-zinc-800',

  redButton: 'p-4 rounded bg-red-600 border-2 border-zinc-200 text-white hover:bg-red-700 font-semibold hover:border-zinc-800'
}

const sideBar = {
  activeLink: {
    short: 'flex w-16 gap-7 font-semibold bg-zinc-300 border-2 border-zinc-500 border-r-0 py-4 justify-center rounded-3xl text-black group-hover:hidden',

    complete: 'gap-7 hidden font-semibold bg-zinc-300 border-2 border-zinc-500 border-r-0 py-4 pl-6 rounded-l-3xl text-black group-hover:flex'
  },

  inactiveLink: {
    short: 'flex w-16 gap-7 font-semibold py-4 justify-center rounded-3xl text-white group-hover:hidden',

    complete: 'hidden gap-7 font-semibold py-4 pl-6 group-hover:flex'
  }


}

const container = {
  main: 'flex w-screen h-screen bg-zinc-400 items-center justify-center',
}

export { formStyle, container, sideBar };
