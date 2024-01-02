import { useDispatch } from "react-redux";
import { container, formStyle } from "../../styles/global.css";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import { ChangePage } from "../../redux/features/activePage";
import { Oval } from 'svg-loaders-react';
import axios from "axios";
import stylesRequestCard from './../../components/RequestsCard/styles.css';
import { header } from "../../components/Header/styles.css";
import { Search } from "lucide-react";
import RequestsCard from './../../components/RequestsCard/index';
import SalesCard from "../../components/SalesCard";



function Sales() {

  let currentDate = new Date();
  let initialDate = new Date();
  initialDate.setDate(currentDate.getDate() - 30); // Adiciona 3 dias
  const dispatch = useDispatch()
  dispatch(ChangePage('sales'))

  const [salesData, setSalesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('actives')
  const [date1, setDate1] = useState(initialDate)
  const [date2, setDate2] = useState(currentDate)

  async function loadData() {
    await axios.get(`http://localhost:3030/api/sales/load/${filter}`,
      {
        params: {
          date1: date1,
          date2: date2
        }
      }
    )
      .then((res) => {
        setSalesData(res.data.sales)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function sortTable(field) {
  }


  useEffect(() => {
    loadData()
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
      <section className="w-full items-center justify-center flex flex-col">
        <Header />

        <fieldset className="w-10/12 border-2 bg-zinc-200 p-4 shadow-md rounded-xl border-zinc-500 flex flex-row justify-center items-center gap-10 font-semibold text-md">
          <input type="date" className={header.input + " !w-2/12"} value={date1} onChange={(e) => setDate1(e.target.value)} />
          <p className="font-semibold text-md">Até</p>
          <input type="date" className={header.input + " !w-2/12"} value={date2} onChange={(e) => setDate2(e.target.value)} />
          <div className="gap-2 flex">
            <input type="radio" name="filter" checked={filter == 'actives'} id="filterActive" value='actives' onChange={(e) => setFilter(e.target.value)} />
            <label htmlFor="filterActive">Ativos</label>
          </div>
          <div className="gap-2 flex">
            <input type="radio" name="filter" checked={filter == 'notpaid'} id="filterNotPaid" value='notpaid' onChange={(e) => setFilter(e.target.value)} />
            <label htmlFor="filterNotPaid">Não pagos</label>
          </div>
          <div className="gap-2 w-20 h-10 flex">
            <button onClick={() => loadData()} className={formStyle.blueButton}><Search width={20} height={20} /></button>
          </div>
        </fieldset>

        <section className={stylesRequestCard.container}>
          <div className={stylesRequestCard.headTable}>
            <button onClick={() => sortTable('id')} className={stylesRequestCard.cellHead}>
              ID
            </button>
            <button onClick={() => sortTable('conta')} className={stylesRequestCard.cellHead}>
              Cliente
            </button>
            <button onClick={() => sortTable('plataforma')} className={stylesRequestCard.cellHead}>
              Funcionário
            </button>
            <button onClick={() => sortTable('loja')} className={stylesRequestCard.cellHead}>
              Data
            </button>
            <button className={stylesRequestCard.cellHead}>
              Pago?
            </button>
          </div>
          {
            salesData.map((item) => (
              <SalesCard key={item.id} {...item} />
            ))
          }
        </section>
      </section>
    </div >
  );
}


export default Sales;
