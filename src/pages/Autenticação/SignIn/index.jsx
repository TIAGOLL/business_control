//imports icones 
import { Lock, User } from 'lucide-react';

//imports react/next
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import IfLoading from '../../../icons/IfLoading';
import { HanddleLoading } from '../../../redux/slices/loading';
import { inputStyle, labelStyle } from './../../../styles/index.css';

function SignIn() {
 
  const dispatch = useDispatch()
  //hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(useSelector(state => state.loading.loading))

  useEffect(() => {
    dispatch(HanddleLoading(true))
    setTimeout(() => {
      dispatch(HanddleLoading(false))
    }, 3000);
  }, [])

  return (
    <>
      <div className="flex h-screen justify-center items-center bg-zinc-400 bg-cover bg-no-repeat">
        <section className='flex flex-col items-center bg-zinc-100 w-4/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
          <img src='/images/Logo.png' alt='Logo' width={125} height={100} />
          <form className="w-full gap-8 flex-col flex">
            <div className='flex w-full flex-col px-14 justify-center items-center gap-8'>
              <div className='flex flex-col w-full'>
                <div className='flex relative w-full space-x-2 items-center justify-center'>
                  <User strokeWidth={2} width={30} height={30} />
                  <input required onChange={e => setEmail(e.target.value)} value={email} id='email' className={inputStyle} type='text' />
                  <label htmlFor='email' className={labelStyle}>Email</label>
                </div>
              </div>
              <div className='flex flex-col w-full'>
                <div className='flex relative w-full space-x-2 items-center justify-center'>
                  <Lock strokeWidth={2} width={30} height={30} />
                  <input required onChange={e => setPassword(e.target.value)} value={password} id='password' className={inputStyle} type='password' />
                  <label htmlFor='password' className={labelStyle}>Senha</label>
                </div>
              </div>
            </div>
            <div className='flex w-full flex-col justify-center items-center'>
              <button type='submit' className='bg-green-600 flex justify-center font-semibold py-1 border border-zinc-500 text-lg w-6/12 text-center items-center rounded-lg hover:border-black hover:bg-green-700' >
                {loading ? <IfLoading /> : 'Entrar'}
              </button>
            </div>
            <div className="flex w-full flex-row px-4">
              <div className="justify-start flex items-left w-6/12">
                <a href='/register' className='text-green-700 font-semibold hover:underline'>Cadastre-se</a>
              </div>
              <div className="justify-end flex w-6/12">
                <a href='/rpassword' className='text-green-700 font-semibold hover:underline'>Esqueci a senha</a>
              </div>
            </div>
          </form>
        </section>
      </div>

    </>
  )
}


export default SignIn;
