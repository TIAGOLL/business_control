import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RequestsCard from "../../components/RequestsCard";
import stylesRequestCard from "../../components/RequestsCard/styles.css";
import { ChangePage } from "../../redux/features/activePage";
import { container } from "../../styles/global.css";
import Header from './../../components/Header/index';
import SideBar from './../../components/SideBar';


// ToDo
// [  ] - ID do pedido
// [  ] - Plataforma da compra
// [  ] - Conta do pedido
// [  ] - Id do rastreamento
// [  ] - Quantidade de items
// [  ] - Valor total
// [  ] - Dia da compra
// [  ] -



function Requests() {

  const dispatch = useDispatch()

  const [requests, setRequests] = useState([])

  async function loadProducts() {
    await axios.get('http://localhost:3030/requests')
      .then((response) => {
        console.log(response.data)
        setRequests(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function sortTable(column) {
    return
  }

  useEffect(() => {
    dispatch(ChangePage('requests'))
    loadProducts()
  }, [])

  return (
    <div className={container.main}>
      <SideBar />
      <div className="w-full items-center justify-center flex flex-col">
        <Header />
        <section className={stylesRequestCard.container}>
          <div className={stylesRequestCard.headTable}>
            <button onClick={() => sortTable('id')} className={stylesRequestCard.cellHead}>
              ID
            </button>
            <button onClick={() => sortTable('plataforma')} className={stylesRequestCard.cellHead}>
              Conta do pedido
            </button>
            <button onClick={() => sortTable('plataforma')} className={stylesRequestCard.cellHead}>
              Plataforma
            </button>
            <button onClick={() => sortTable('conta')} className={stylesRequestCard.cellHead}>
              Loja do pedido
            </button>
            <button onClick={() => sortTable('codigorastreio')} className={stylesRequestCard.cellHead}>
              Código de rastreio
            </button>
            <button onClick={() => sortTable('datapedido')} className={stylesRequestCard.cellHead}>
              Data pedido
            </button>
            <button onClick={() => sortTable('status')} className={stylesRequestCard.cellHead}>
              Status
            </button>
          </div>
          {
            requests.map((item) => (
              <RequestsCard key={item.id} {...item} />
            ))
          }
        </section>
      </div>
    </div >
  );
}

export default Requests;
