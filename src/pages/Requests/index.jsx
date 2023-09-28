import { useEffect } from "react";
import { container } from "../../styles/styles.css";
import SideBar from './../../components/SideBar';
import { useDispatch } from "react-redux";
import { ChangePage } from "../../redux/slices/activePage";


// ToDo
// [ ] - Plataforma da compra
// [ ] - Conta do pedido
// [ ] - Id do rastreamento
// [ ] - Items
// [ ] - Quantidade de items
// [ ] - Valor unitário
// [ ] - Valor total
// [ ] - Dia da compra
// [ ] -



function Requests() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ChangePage('requests'))
  }, [])

  return (
    <div className={container.main}>
      <SideBar />

    </div>
  );
}

export default Requests;
