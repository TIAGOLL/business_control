//imports icones
import { HandMetal, Lock, User } from 'lucide-react';

//imports react
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formStyle } from '../../../styles/global.css';
import { AuthContext } from '../../../contexts/auth';
import { useContext } from 'react';
import googleIcon from '../../../icons/googleIcon.png'
import { Oval } from 'svg-loaders-react';

function SignIn() {

  const dispatch = useDispatch()
  const { signInWithEmail, signInWithGoogle } = useContext(AuthContext);

  //hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true)

  async function handleSubmit(e) {
    if (e == 'withemail') {
      // acionada quando aperto o botão de login
      setLoading(true)
      await signInWithEmail(email, password)
      setLoading(false)
    } else if (e == 'withgoogle') {
      // acionada quando aperto o botão de login com o google
      setLoading(true)
      await signInWithGoogle()

      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[url('/images/armazen1.png')] bg-cover bg-no-repeat">
      <section className='flex flex-col h-max items-center bg-zinc-100 w-4/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
<<<<<<< HEAD
        <form className="w-full gap-8 pt-10 flex-col flex">
=======
        <img src='/images/logo.png' alt='Logo' width={125} height={100} />
        <form className="w-full gap-8 flex-col flex">
>>>>>>> 47974382efdaad48d2939a038e2b7628c69b500d
          <div className='flex w-full flex-col px-14 justify-center items-center gap-8'>
            <div className='flex flex-row gap-4 justify-center items-center w-full'>
              <User strokeWidth={2} width={30} height={30} />
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setEmail(e.target.value)} value={email} id='email' className={formStyle.input} type='text' />
                <label htmlFor='email' className={formStyle.label}>Email</label>
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
            <button onClick={() => handleSubmit('withemail')} className='bg-green-600 flex justify-center font-semibold py-1 border border-zinc-500 text-lg w-6/12 text-center items-center rounded-lg hover:border-black hover:bg-green-700 text-white' >
              {loading ? <p className='flex flex-row items-center'>Carregando...<span className='ml-4 animate-spin'><Oval width={30} /></span></p> : <p>Entrar</p>}
            </button>
            <p className='text-gray-500 text-sm font-semibold'>Ou</p>
            <button onClick={() => handleSubmit('withgoogle')}>
              <img src={googleIcon} width={50} alt="Fazer login com o Google" />
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
      </section>
    </div>
  )
}


export default SignIn;
