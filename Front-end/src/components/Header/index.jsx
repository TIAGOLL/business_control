import { useSelector } from 'react-redux';
import { header } from './styles.css'
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

function Header() {

  const { page } = useSelector(state => state.page)
  const [textButton, setTextButton] = useState('')

  useEffect(() => {
    switch (page) {
      case 'products':
        setTextButton('Cadastrar produto')
        break;
      case 'requests':
        setTextButton('Cadastrar pedido')
        break;
      default:
        setTextButton('Cadastrar')
        break;
    }
  }, [page])

  return (
    <section className={header.container}>
      <div className={header.content}>
        {textButton == 'Cadastrar produto' && <a href='/dashboard/products/create' className={header.button}>{textButton}</a>}
        {textButton == 'Cadastrar pedido' && <a href='/dashboard/requests/create' className={header.button}>{textButton}</a>}
        <input placeholder='Search...' className={header.input} type="text" />
      </div>
    </section>
  );
}

export default Header;
