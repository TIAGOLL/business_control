import { useParams } from "react-router-dom";
import { container, formStyle } from "../../../styles/global.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBigLeft } from "lucide-react";
import { ChangePage } from "../../../redux/slices/activePage";


function RequestsById() {
  const { id } = useParams();
  const { page } = useSelector(state => state.page)
  const dispatch = useDispatch();


  const [idRequest, setIdRequest] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');
  const [storeName, setStoreName] = useState('');
  const [idTracking, setIdTracking] = useState('');
  const [date, setDate] = useState('');
  const [statusTracking, setStatusTracking] = useState('');
  const [lot, setLot] = useState('');
  const [accountId, setAccountId] = useState('');
  const [currentPlatform, setCurrentPlatform] = useState('');
  const [qtd_items, setQtd_items] = useState('');

  const [accountData, setAccountData] = useState([]);
  const [platformData, setPlatformData] = useState([]);

  async function loadRequest() {
    axios.get(`http://localhost:3030/requests/${id}`)
      .then(res => {
        console.log(res);
        setIdRequest(res.data.id);
        setCurrentAccount(res.data.account);
        setIdTracking(res.data.idTracking);
        setStoreName(res.data.storeName);
        setDate(res.data.date);
        setStatusTracking(res.data.statusTracking);
        setLot(res.data.lote);
        setCurrentPlatform(res.data.account.platform);
        setQtd_items(res.data.qtd_items);
      })
      .catch(err => {
        console.log(err);
      })
  }

  async function loadAccounts() {

    axios.get(`http://localhost:3030/accounts`)
      .then(res => {
        console.log(res);
        setAccountData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function loadPlatforms() {
    axios.get(`http://localhost:3030/platforms`)
      .then(res => {
        setPlatformData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }





  async function updateRequest() {
    axios.put(`http://localhost:3030/requests/${id}`, {
      where: {
        id: parseInt(id)
      },
      data: {
        accounts_id: accountId,
        accounts_platform_id: platformId,
        storeName: storeName,
        idTracking: idTracking,
        date: date,
        statusTracking: statusTracking,
        lote: lot,
        qtd_items: qtd_items,
      }
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function createRequest() {
    const list = {
      id: parseInt(id),
      accountName: accountName,
      platform: platform,
      storeName: storeName,
      idTracking: idTracking,
      date: date,
      statusTracking: statusTracking,
      lote: lot,
      qtd_items: qtd_items,
    }

    axios.post(`http://localhost:3030/requests`, list)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }


  async function handleSubmit(e) {
    e.preventDefault();
    if (page === 'createRequest') {
      createRequest()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    } else if (page === 'requestsById') {
      updateRequest()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    loadRequest();
    loadAccounts();
    loadPlatforms();

    if (id === 'create') {
      dispatch(ChangePage('createRequest'));
    }
    else {
      dispatch(ChangePage('requestsById'));
    }
  }, []);

  return (
    <div className={formStyle.container}>
      <div className='flex flex-col items-center bg-zinc-100 w-4/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
        <div className='relative top-5 left-14 flex items-start justify-start w-full' >
          <a href={'/dashboard/requests'}>
            <ArrowBigLeft width={30} height={30} />
          </a>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='p-0 m-0 font-semibold'>{page === 'createRequest' ? 'Cadastrar pedido' : 'Editar pedido'}</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full gap-8 flex-col flex">
          <div className='flex w-full flex-col px-14 justify-center items-center gap-8'>

            {/* ID */}
            {page === 'createRequest' ? null :
              <div className='flex flex-col w-full'>
                <div className='flex relative w-full space-x-2 items-center justify-center'>
                  <input readOnly required onChange={e => setIdRequest(e.target.value)} value={idRequest} id='id' className={formStyle.input} type='text' />
                  <label htmlFor='id' className={formStyle.label}>ID</label>
                </div>
              </div>
            }

            {/* palataforma */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <select id="accountName" onChange={e => setPlatform(e.target.value)} className={formStyle.input} >
                  <option htmlFor='platform' value={currentPlatform.id} onChange={e => setCurrentPlatform(e.target.value)}>{currentPlatform.name}</option>
                  {
                    platformData.map((item) => {
                      if (item.id == currentPlatform.id) return; // não exibe a plataforma atual
                      return (
                        <option htmlFor='platform' key={item.id} value={item.id} onChange={e => setCurrentPlatform(e.target.value)}>{item.name}</option>
                      )
                    })
                  }
                </select>
                <label htmlFor='platform' className={formStyle.label}>Plataforma</label>
              </div>
            </div>

            {/* Conta do pedido */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <select id="accountName" onChange={e => setAccountId(e.target.value)} className={formStyle.input} >
                  {
                    page == 'requestsById' &&
                    <option htmlFor='accountName' onChange={e => setAccountId(e.target.value)} value={currentAccount.id}>{currentAccount.name}</option>
                  }
                  {
                    accountData.map((item) => {
                      if (item.id == currentAccount.id) return; // não exibe a conta atual
                      return (
                        <option htmlFor='accountName' key={item.id} onChange={e => setAccountId(e.target.value)} value={item.id}>{item.name}</option>
                      )
                    })
                  }
                </select>
                <label htmlFor='accountName' className={formStyle.label}>Conta</label>
              </div>
            </div>


            {/* Quantidade de items */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setQtd_items(e.target.value)} value={qtd_items} id='qtditems' className={formStyle.input} type='text' />
                <label htmlFor='qtditems' className={formStyle.label}>Quantidade de items</label>
              </div>
            </div>

            {/* Loja do pedido */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setStoreName(e.target.value)} value={storeName} id='storeName' className={formStyle.input} type='text' />
                <label htmlFor='storeName' className={formStyle.label}>Loja</label>
              </div>
            </div>

            {/* Código de rastreio */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setIdTracking(e.target.value)} value={idTracking} id='idTracking' className={formStyle.input} type='text' />
                <label htmlFor='idTracking' className={formStyle.label}>Código de rastreio</label>
              </div>
            </div>

            {/* Data do pedido */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setDate(e.target.value)} value={date} id='date' className={formStyle.input} type='text' />
                <label htmlFor='date' className={formStyle.label}>Data</label>
              </div>
            </div>

            {/* Status */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <select id="statusTracking" onChange={e => setStatusTracking(e.target.value)} className={formStyle.input} >
                  <option htmlFor='statusTracking' onChange={e => setStatusTracking(e.target.value)} value="Em trânsito">Em trânsito</option>
                  <option htmlFor='statusTracking' onChange={e => setStatusTracking(e.target.value)} value="Entregue">Entregue</option>
                  <option htmlFor='statusTracking' onChange={e => setStatusTracking(e.target.value)} value="Reembolsado">Reembolsado</option>
                  <option htmlFor='statusTracking' onChange={e => setStatusTracking(e.target.value)} value="Esperando Reembolso">Esperando Reembolso</option>
                </select>
                <label htmlFor='statusTracking' className={formStyle.label}>Status</label>
              </div>
            </div>

            {/* Lote */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setLot(e.target.value)} value={lot} id='lot' className={formStyle.input} type='text' />
                <label htmlFor='lot' className={formStyle.label}>Lote</label>
              </div>
            </div>

          </div>
          <div className='flex w-full flex-col justify-center items-center'>
            <button type="submit" className={formStyle.greenButton} >
              {page === 'createRequest' && 'Cadastrar'}
              {page === 'requestsById' && 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestsById;
