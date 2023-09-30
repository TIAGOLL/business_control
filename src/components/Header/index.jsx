import { header } from './styles.css'

function Header() {
  return (
    <section className={header.container}>
      <div className={header.content}>
        <button className={header.button}>Cadastrar Produto</button>
        <input className={header.input} type="text"  />
      </div>
    </section>
  );
}

export default Header;
