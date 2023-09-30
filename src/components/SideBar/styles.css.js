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

export { sideBar };
