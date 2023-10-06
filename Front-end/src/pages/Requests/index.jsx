import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ChangePage } from "../../redux/slices/activePage";
import SideBar from './../../components/SideBar';
import requestCard from "../../components/RequestsCard/styles.css";
import Header from './../../components/Header/index';
import { container } from "../../styles/global.css";


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

  async function loadProducts() {
    await axios.get('http://localhost:3030/requests')
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  function sortTable() {

  }


  useEffect(() => {
    dispatch(ChangePage('requests'))
  }, [])

  return (
    <div className={container.main}>
      <SideBar />
      <div className="w-full items-center justify-center flex flex-col">
        <Header />
        <section className={requestCard.container}>
          <div className={requestCard.headTable}>
            <button onClick={() => sortTable('id')} className={requestCard.cellHead}>
              ID
            </button>
            <button onClick={() => sortTable('plataforma')} className={requestCard.cellHead}>
              Plataforma
            </button>
            <button onClick={() => sortTable('conta')} className={requestCard.cellHead}>
              Conta
            </button>
            <button onClick={() => sortTable('codigorastreio')} className={requestCard.cellHead}>
              Código rastreio
            </button>
            <button onClick={() => sortTable('precototal')} className={requestCard.cellHead}>
              Preço total
            </button>
            <button onClick={() => sortTable('datapedido')} className={requestCard.cellHead}>
              Data pedido
            </button>
            <button onClick={() => sortTable('status')} className={requestCard.cellHead}>
              Status
            </button>
          </div>
          {
            a.map((id) => (
              <a href="/dashboard/requests/${id}" key={id} className={requestCard.tableLines}>
                <button className={requestCard.cellLine}>
                  {id}
                </button>
                <button className={requestCard.cellLine}>
                  Shopee
                </button>
                <button className={requestCard.cellLine}>
                  tinnyimports
                </button>
                <button className={requestCard.cellLine}>
                  BR0328423948
                </button>
                <button className={requestCard.cellLine}>
                  R$ 245,00
                </button>
                <button className={requestCard.cellLine}>
                  10/09/2023
                </button>
                <button className={requestCard.cellLine}>
                  <span className="bg-yellow-700 p-1 rounded-lg">Em trânsito</span>
                </button>
              </a>
            ))
          }
        </section>
      </div>
    </div>
  );
}

export default Requests;
