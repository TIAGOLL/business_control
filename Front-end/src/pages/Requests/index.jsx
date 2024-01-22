import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RequestsCard from "../../components/RequestsCard";
import stylesRequestCard from "../../components/RequestsCard/styles.css";
import { ChangePage } from "../../redux/features/activePage";
import { container, formStyle } from "../../styles/global.css";
import Header from './../../components/Header/index';
import SideBar from './../../components/SideBar';
import { Oval } from 'svg-loaders-react';
import { header } from "../../components/Header/styles.css";
import { Search } from "lucide-react";
import moment from "moment";


function Requests() {
  const dispatch = useDispatch()
  dispatch(ChangePage('requests'))

  let currentDate = new Date();
  currentDate = moment(currentDate).format('YYYY-MM-DD');

  let initialDate = new Date();
  initialDate = moment(initialDate).add(-30, 'days').format('YYYY-MM-DD');

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('intransit')
  const [date1, setDate1] = useState(initialDate)
  const [date2, setDate2] = useState(currentDate)

  async function loadData() {
    setLoading(true)
    await axios.get(`http://localhost:3030/api/requests/load/${filter}`,
      {
        params: {
          date1: date1,
          date2: date2
        }
      }
    )
      .then((res) => {
        setData(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
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

  function handleDate(e, type) {
    e.preventDefault()
    if (type == 'all') {
      setDate1('2010-01-01')
      setDate2('2030-01-01')
    }
    if (type == 'lastThirtiethDays') {
      let currentDate = new Date();
      currentDate = moment(currentDate).format('YYYY-MM-DD');

      let initialDate = new Date();
      initialDate = moment(initialDate).add(-30, 'days').format('YYYY-MM-DD');

      setDate1(initialDate)
      setDate2(currentDate)
    }
  }

  useEffect(() => {
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
      <section className="w-full h-screen items-center justify-center flex flex-col">
        <Header />
        <fieldset className="w-11/12 border-2 bg-zinc-200 p-4 shadow-md rounded-xl border-zinc-500 flex flex-row justify-center items-center gap-8 font-semibold text-md">
          <div className="w-4/12 flex flex-col justify-center items-center gap-2">
            <div className="w-full flex flex-row justify-center items-center gap-2">
              <input type="date" className={header.input + " !w-5/12"} value={date1} onChange={(e) => setDate1(e.target.value)} />
              <p className="font-semibold text-md">Até</p>
              <input type="date" className={header.input + " !w-5/12"} value={date2} onChange={(e) => setDate2(e.target.value)} />
            </div>
            <div className="w-11/12 flex flex-row gap-8 items-center justify-center">
              <button className={formStyle.blueButton + " !p-0"} onClick={(e) => handleDate(e, "all")}>Todas as datas</button>
              <button className={formStyle.blueButton + " !p-0"} onClick={(e) => handleDate(e, "lastThirtiethDays")}>Últimos 30 dias</button>
            </div>
          </div>
          <div className="gap-2 flex">
            <input type="radio" name="filter" checked={filter == 'actives'} id="filterActive" value='actives' onChange={(e) => setFilter(e.target.value)} />
            <label htmlFor="filterActive">Ativos</label>
          </div>
          <div className="gap-2 flex">
            <input type="radio" name="filter" checked={filter == 'intransit'} id="filterInTransit" value='intransit' onChange={(e) => setFilter(e.target.value)} />
            <label htmlFor="filterInTransit">Em trânsito</label>
          </div>
          <div className="gap-2 flex">
            <input type="radio" name="filter" id="filterwaitingForRefund" value='waitingforrefund' onChange={(e) => setFilter(e.target.value)} />
            <label htmlFor="filterwaitingForRefund">Esperando reembolso</label>
          </div>
          <div className="gap-2 flex">
            <input type="radio" name="filter" id="filterRefunded" value='refunded' onChange={(e) => setFilter(e.target.value)} />
            <label htmlFor="filterRefunded">Reembolsados</label>
          </div>
          <div className="gap-2 flex">
            <input type="radio" name="filter" id="filterCanceleds" value='canceled' onChange={(e) => setFilter(e.target.value)} />
            <label htmlFor="filterCanceleds">Deletados</label>
          </div>
          <div className="gap-2 w-36 h-10 flex justify-center items-center">
            <button onClick={() => loadData()} className={formStyle.blueButton}><Search width={20} /></button>
          </div>
        </fieldset>

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
      </section>
    </div >
  );
}

export default Requests;
