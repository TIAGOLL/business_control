import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RequestsCard from "../../components/RequestsCard";
import stylesRequestCard from "../../components/RequestsCard/styles.css";
import { ChangePage } from "../../redux/features/activePage";
import { container } from "../../styles/global.css";
import Header from './../../components/Header/index';
import SideBar from './../../components/SideBar';
import { Oval } from 'svg-loaders-react';


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

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadData() {
    await axios.get('http://localhost:3030/api/requests/all')
      .then((response) => {
        console.log(response.data)
        setData(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function sortTable(column) {
    if (column == 'status') {
      let sorted = data.requests.sort((a, b) => {
        if (a.status_tracking.name < b.status_tracking.name) {
          return -1;
        }
        if (a.status_tracking.name > b.status_tracking.name) {
          return 1;
        }
        return 0;

      })
      setData({ requests: sorted })
    }
    if (column == 'id') {
      let sorted = data.requests.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;

      })
      setData({ requests: sorted })
    }
    if (column == 'plataforma') {
      let sorted = data.requests.sort((a, b) => {
        console.log(a)
        if (a.accounts.platforms.name < b.accounts.platforms.name) {
          return -1;
        }
        if (a.accounts.platforms.name > b.accounts.platforms.name) {
          return 1;
        }
        return 0;

      })
      setData({ requests: sorted })
    }
    if (column == 'conta') {
      let sorted = data.requests.sort((a, b) => {
        console.log(a)
        if (a.accounts.name < b.accounts.name) {
          return -1;
        }
        if (a.accounts.name > b.accounts.name) {
          return 1;
        }
        return 0;

      })
      setData({ requests: sorted })
    }
    
    if (column == 'datapedido') {

      let sorted = data.requests.sort((a, b) => {
        if (a.created_at < b.created_at) {
          return -1;
        }
        if (a.created_at > b.created_at) {
          return 1;
        }
        return 0;

      })
      setData({ requests: sorted })
    }
    if (column == 'loja') {
      let sorted = data.requests.sort((a, b) => {
        console.log(a)
        if (a.store_name < b.store_name) {
          return -1;
        }
        if (a.store_name > b.store_name) {
          return 1;
        }
        return 0;

      })
      setData({ requests: sorted })
    }
  }

  useEffect(() => {
    dispatch(ChangePage('requests'))
    loadData();
  }, [])

  if (loading) {
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
            <div className={stylesRequestCard.tableLines + " !p-10"}>
              <Oval width={50} height={50} />
            </div>
          </section>
        </div>
      </div >
    )
  }

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
            <button onClick={() => sortTable('conta')} className={stylesRequestCard.cellHead}>
              Conta do pedido
            </button>
            <button onClick={() => sortTable('plataforma')} className={stylesRequestCard.cellHead}>
              Plataforma
            </button>
            <button onClick={() => sortTable('loja')} className={stylesRequestCard.cellHead}>
              Loja do pedido
            </button>
            <button className={stylesRequestCard.cellHead}>
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
            data.requests.map((item) => (
              <RequestsCard key={item.id} {...item} />
            ))
          }
        </section>
      </div>
    </div >
  );
}

export default Requests;
