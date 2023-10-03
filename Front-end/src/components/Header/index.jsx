import { header } from './styles.css'

function Header() {
  return (
    <section className={header.container}>
      <div className={header.content}>
        <a href='/dashboard/products/create' className={header.button}>Cadastrar Produto</a>
        <input className={header.input} type="text" />
      </div>
    </section>
  );
}

export default Header;
