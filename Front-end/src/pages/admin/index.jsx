import { useDispatch } from "react-redux";
import { container, formStyle } from "../../styles/global.css";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import { ChangePage } from "../../redux/features/activePage";
import { Lock, User } from "lucide-react";
import { Oval } from 'svg-loaders-react';
import googleIcon from '../../icons/googleIcon.png'
import { toast } from "react-toastify";



function Sales() {

  const dispatch = useDispatch()
  const [login, setLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)


  async function handleSubmit() {

    if (!email || !password) return toast.error('Preencha todos os campos')

    setLoading(true)
    if (email == 'admin' && password == 'admin') {
      return setTimeout(() => {
        setLoading(false)
        setLogin(true)
        toast.success('Logado com sucesso')
      }, 2000)
    }

    setTimeout(() => {
      setLoading(false)
      toast.error('Usuário ou senha incorretos')
    }, 2000);
  }

  useEffect(() => {
    dispatch(ChangePage('admin'))
  }, [])

  if (!login) return (
    <div className={container.main}>
      <SideBar />
      <div className="w-full h-screen items-center justify-center flex flex-col">
        <section className='flex flex-col h-max items-center bg-zinc-100 w-4/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
          <h1 className="font-semibold">Admin</h1>
          <form className="w-full gap-8 flex-col flex">
            <div className='flex w-full flex-col px-14 justify-center items-center gap-8'>
              <div className='flex flex-row gap-4 justify-center items-center w-full'>
                <User strokeWidth={2} width={30} height={30} />
                <div className='flex relative w-full space-x-2 items-center justify-center'>
                  <input required onChange={e => setEmail(e.target.value)} value={email} id='email' className={formStyle.input} type='text' />
                  <label htmlFor='email' className={formStyle.label}>Usuário</label>
                </div>
              </div>
              <div className='flex flex-row gap-4 justify-center items-center w-full'>
                <Lock strokeWidth={2} width={30} height={30} />
                <div className='flex relative w-full space-x-2 items-center justify-center'>
                  <input required onChange={e => setPassword(e.target.value)} value={password} id='password' className={formStyle.input} type='password' />
                  <label htmlFor='password' className={formStyle.label}>Senha</label>
                </div>
              </div>
            </div>
          </form>
          <div className='flex w-full flex-col justify-center gap-2 items-center'>
            <button onClick={() => handleSubmit()} className='bg-green-600 flex justify-center font-semibold py-1 border border-zinc-500 text-lg w-6/12 text-center items-center rounded-lg hover:border-black hover:bg-green-700 text-white' >
              {loading ? <p className='flex flex-row items-center'>Carregando...<span className='ml-4 animate-spin'><Oval width={30} /></span></p> : <p>Entrar</p>}
            </button>
          </div>
        </section>
      </div>
    </div>
  )

  return (
    <div className={container.main}>
      <SideBar />
      <div className="w-full items-center justify-center flex flex-col">
        <Header />
        <section className="px-24 mt-10 items-start justify-center flex w-full gap-8 flex-wrap">
          <div className="flex w-3/12 p-2 h-16 items-center text-center gap-12 justify-center flex-col bg-white rounded-xl shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
            <p className="font-semibold text-lg">Gerenciar funcionários</p>
          </div>
          <div className="flex w-3/12 p-2 h-16 items-center text-center gap-12 justify-center flex-col bg-white rounded-xl shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
            <p className="font-semibold text-lg">Gerar CSV dos produtos ativos</p>
          </div>
          <div className="flex w-3/12 p-2 h-16 items-center text-center gap-12 justify-center flex-col bg-white rounded-xl shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
            <p className="font-semibold text-lg">Pedidos de reembolso do cliente final</p>
          </div>
          <div className="flex w-3/12 p-2 h-16 items-center text-center gap-12 justify-center flex-col bg-white rounded-xl shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
            <p className="font-semibold text-lg">Fornecedores</p>
          </div>
          <div className="flex w-3/12 p-2 h-16 items-center text-center gap-12 justify-center flex-col bg-white rounded-xl shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
            <p className="font-semibold text-lg">Transportadoras</p>
          </div>
          <div className="flex w-3/12 p-2 h-16 items-center text-center gap-12 justify-center flex-col bg-white rounded-xl shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
            <p className="font-semibold text-lg">Filiais</p>
          </div>
          <div className="flex w-3/12 p-2 h-16 items-center text-center gap-12 justify-center flex-col bg-white rounded-xl shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
            <p className="font-semibold text-lg">Impostos</p>
          </div>
          <div className="flex w-3/12 p-2 h-16 items-center text-center gap-12 justify-center flex-col bg-white rounded-xl shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
            <p className="font-semibold text-lg">Metas</p>
          </div>
        </section>
      </div>
    </div >
  );
}

export default Sales;
