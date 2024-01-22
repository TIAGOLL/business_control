import { useDispatch } from "react-redux";
import { container, formStyle } from "../../styles/global.css";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import { ChangePage } from "../../redux/features/activePage";
import { Oval } from 'svg-loaders-react';
import axios from "axios";
import stylesSalesCard from './../../components/SalesCard/styles.css';
import { header } from "../../components/Header/styles.css";
import { Search } from "lucide-react";
import SalesCard from "../../components/SalesCard";
import moment from "moment";



function Sales() {
  const dispatch = useDispatch()
  dispatch(ChangePage('sales'))

  const [salesData, setSalesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('actives')
  const [date1, setDate1] = useState('2010-01-01')
  const [date2, setDate2] = useState('2030-01-01')
  const [search, setSearch] = useState('')
  const [searchData, setSearchData] = useState([])

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
        setSearchData(res.data.sales)
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
    loadData()
  }, [])

  useEffect(() => {
    if (!loading) {
      setSearchData(salesData.filter((item) =>
        item.clients.name.toLowerCase().includes(search.toLowerCase()) ||
        item.collaborators.name.toLowerCase().includes(search.toLowerCase())
      ))
    }
  }, [search])

  if (loading) {
    return (
      <div className={container.main}>
        <SideBar />
        <section className="w-full items-center justify-center flex flex-col">
          <Header />

          <fieldset className="w-10/12 border-2 bg-zinc-200 p-4 shadow-md rounded-xl border-zinc-500 flex flex-row justify-center items-center gap-10 font-semibold text-md">
            <div className="gap-2 flex">
              <input type="search" id="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className={formStyle.input} />
            </div>
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
              <input type="radio" name="filter" checked={filter == 'notpaid'} id="filterNotPaid" value='notpaid' onChange={(e) => setFilter(e.target.value)} />
              <label htmlFor="filterNotPaid">Não pagos</label>
            </div>
            <div className="gap-2 w-20 h-10 flex">
              <button onClick={() => loadData()} className={formStyle.blueButton}><Search width={20} height={20} /></button>
            </div>
          </fieldset>

          <section className={stylesSalesCard.container}>
            <div className={stylesSalesCard.headTable}>
              <button onClick={() => sortTable('id')} className={stylesSalesCard.cellHead}>
                ID
              </button>
              <button onClick={() => sortTable('conta')} className={stylesSalesCard.cellHead}>
                Cliente
              </button>
              <button onClick={() => sortTable('plataforma')} className={stylesSalesCard.cellHead}>
                Funcionário
              </button>
              <button onClick={() => sortTable('loja')} className={stylesSalesCard.cellHead}>
                Data
              </button>
              <button className={stylesSalesCard.cellHead}>
                Pago?
              </button>
            </div>
            <div className={stylesSalesCard.tableLines + " !p-10"}>
              <Oval width={50} height={50} />
            </div>
          </section>
        </section>
      </div >
    )
  }

  return (
    <div className={container.main}>
      <SideBar />
      <section className="w-full h-screen items-center justify-center flex flex-col">
        <Header />

        <fieldset className="w-11/12 border-2 bg-zinc-200 p-4 shadow-md rounded-xl border-zinc-500 flex flex-row justify-center items-center gap-8 font-semibold text-md">
          <div className="gap-2 flex">
            <input type="search" id="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className={formStyle.input} />
          </div>
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
            <input type="radio" name="filter" checked={filter == 'notpaid'} id="filterNotPaid" value='notpaid' onChange={(e) => setFilter(e.target.value)} />
            <label htmlFor="filterNotPaid">Não pagos</label>
          </div>
          <div className="gap-2 w-36 h-10 flex justify-center items-center">
            <button onClick={() => loadData()} className={formStyle.blueButton}><Search width={20} height={20} /></button>
          </div>
        </fieldset>

        <section className={stylesSalesCard.container}>
          <div className={stylesSalesCard.headTable}>
            <button onClick={() => sortTable('id')} className={stylesSalesCard.cellHead}>
              ID
            </button>
            <button onClick={() => sortTable('conta')} className={stylesSalesCard.cellHead}>
              Cliente
            </button>
            <button onClick={() => sortTable('plataforma')} className={stylesSalesCard.cellHead}>
              Funcionário
            </button>
            <button onClick={() => sortTable('loja')} className={stylesSalesCard.cellHead}>
              Data
            </button>
            <button className={stylesSalesCard.cellHead}>
              Status
            </button>
          </div>
          {
            searchData.map((item) => (
              <SalesCard key={item.id} {...item} />
            ))
          }
        </section>
      </section>
    </div >
  );
}


export default Sales;
