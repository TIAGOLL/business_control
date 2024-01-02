import axios from "axios";
import { ArrowBigLeft, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formStyle } from "../../../styles/global.css";
import moment from "moment";
import { Oval } from 'svg-loaders-react';
import { toast } from "react-toastify";

function RequestsById() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [typeInputDate, setTypeInputDate] = useState('text');

  const [storeName, setStoreName] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [date, setDate] = useState('');

  //current data
  const [currentStatusTracking, setCurrentStatusTracking] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');
  const [currentPlatform, setCurrentPlatform] = useState('');
  const [currentProducts, setCurrentProducts] = useState([]);

  async function deleteRequest(e) {
    setLoading(true);
    e.preventDefault();
    await axios.delete(`http://localhost:3030/api/requests/delete/${id}`)
      .then(res => {
        console.log(res.data.message);
        navigate('/dashboard/requests')
        toast.warn(res.data.message);
      })
      .catch(err => {
        console.log(err.message);
        toast.error('Erro ao excluir pedido!');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function markAsDelivered(e) {
    setLoading(true);
    e.preventDefault();
    await axios.put(`http://localhost:3030/api/requests/put/delivered/${id}`, {
      status_tracking_id: 2,
      prod_requests: currentProducts.map((item) => {
        return {
          products_id: item.products_id,
          quantity: item.quantity,
          purchase_price: item.purchase_price,
        }
      })
    })
      .then(res => {
        navigate('/dashboard/requests')
        toast.success(res.data.message);
      })
      .catch(err => {
        console.log(err.message);
        toast.error('Erro ao cadastrar pedido!');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function markAsWaitingRefund(e) {
    e.preventDefault();
    await axios.put(`http://localhost:3030/api/requests/put/waitingforrefund/${id}`, {
      prod_requests: currentProducts.map((item) => {
        return {
          products_id: item.products_id,
          quantity: item.quantity,
          purchase_price: item.purchase_price,
        }
      })
    })
      .then(res => {
        navigate('/dashboard/requests')
        toast.success(res.data.message);
      })
      .catch(err => {
        console.log(err.message);
        toast.error('Erro ao cadastrar pedido!');
      })
  }

  async function markAsRefunded(e) {
    e.preventDefault();
    await axios.put(`http://localhost:3030/api/requests/put/refunded/${id}`)
      .then(res => {
        navigate('/dashboard/requests')
        toast.success(res.data.message);
      })
      .catch(err => {
        console.log(err.message);
        toast.error('Erro ao cadastrar pedido!');
      })
  }

  async function loadData() {
    // carrega os dados do pedido
    await axios.get(`http://localhost:3030/api/requests/load/byid/${id}`)
      .then(res => {
        console.log(res.data);
        setTrackingId(res.data.requests.tracking_id);
        setStoreName(res.data.requests.store_name);
        setDate(res.data.created_at);

        setCurrentProducts(res.data.requests.prod_requests.map(item => {
          return {
            products_id: item.products_id,
            name: item.products.full_name,
            quantity: item.quantity,
            purchase_price: item.purchase_price,
            color: item.color,
          };
        })
        );
        setCurrentStatusTracking(res.data.requests.status_tracking);
        setCurrentAccount(res.data.requests.accounts);
        setCurrentPlatform(res.data.requests.accounts.platforms);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  if (loading) return (
    <div className={formStyle.container}>
      <div className='flex flex-col items-center my-10 bg-zinc-100 w-10/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
        <div className='relative top-5 left-14 flex items-start justify-start w-full' >
          <a href={'/dashboard/requests'}>
            <ArrowBigLeft width={30} height={30} />
          </a>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='pb-24 m-0 font-semibold'>Editar pedido</h1>
        </div>
        <div className="w-full gap-8 flex-col flex">
          <div className='flex w-full flex-wrap px-14 justify-center items-center gap-8 pb-20'>
            <Oval stroke="gray" width={70} height={70} />
          </div>
        </div>
      </div >
    </div >
  )

  return (
    <div className={formStyle.container} >
      <div className='flex flex-col items-center my-10 bg-zinc-100 w-10/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
        <div className='relative top-5 left-14 flex items-start justify-start w-full' >
          <a href={'/dashboard/requests'}>
            <ArrowBigLeft width={30} height={30} />
          </a>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='pb-24 m-0 font-semibold'>Editar pedido</h1>
        </div>
        <form className="w-full gap-8 flex-col flex">
          <div className='flex w-full flex-wrap px-14 justify-center items-center gap-8'>

            {/* ID */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <input readOnly required value={id} id='id' className={formStyle.input} type='text' />
                <label htmlFor='id' className={formStyle.label}>ID</label>
              </div>
            </div>

            {/* Data do pedido */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <input required readOnly value={moment(date).format('DD/MM/YYYY')} id='date' type={typeInputDate} className={formStyle.input} onFocus={() => setTypeInputDate('date')} onBlur={() => setTypeInputDate('text')} />
                <label htmlFor='date' className={formStyle.label}>Data</label>
              </div>
            </div>

            {/* palataforma */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="platform" disabled className={formStyle.input} >
                  <option htmlFor='platform' value={currentPlatform.id}>{currentPlatform.name}</option>
                </select>
                <label htmlFor='platform' className={formStyle.label}>Plataforma</label>
              </div>
            </div>

            {/* Conta do pedido */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="accountName" className={formStyle.input} disabled>
                  <option htmlFor='accountName' key={currentAccount.id} value={currentAccount.id}>{currentAccount.name}</option>
                </select>
                <label htmlFor='accountName' className={formStyle.label}>Conta</label>
              </div>
            </div>

            {/* Loja do pedido */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <input required readOnly value={storeName} id='storeName' className={formStyle.input} type='text' />
                <label htmlFor='storeName' className={formStyle.label}>Loja</label>
              </div>
            </div>

            {/* Código de rastreio */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <input required readOnly value={trackingId} id='trackingId' className={formStyle.input} type='text' />
                <label htmlFor='trackingId' className={formStyle.label}>Código de rastreio</label>
              </div>
            </div>


            {/* Status tracking */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="statusTracking" disabled className={formStyle.input} >
                  <option htmlFor='statusTracking' key={currentStatusTracking.id} value={currentStatusTracking.id}>{currentStatusTracking.name}</option>
                </select>
                <label htmlFor='statusTracking' className={formStyle.label}>Status</label>
              </div>
            </div>

            <div className="flex w-full flex-wrap px-14 justify-center items-center gap-8 border-2 border-zinc-400 rounded-xl p-14">
              {/* Quantidade de items */}
              <div className='flex flex-col w-5/12'>
                <div className='flex relative w-full items-center justify-center'>
                  <input readOnly required value={currentProducts.length} id='quantityItems' className={formStyle.input} type='text' />
                  <label htmlFor='quantityItems' className={formStyle.label}>Quantidade de items</label>
                </div>
              </div>

              {
                currentProducts.map((item2, index) => {
                  console.log(item2);
                  return (
                    <div className="flex flex-row w-full gap-8 items-center justify-center" key={item2.products_id}>
                      <div className='flex flex-col w-4/12'>
                        <div className='flex relative w-full items-center justify-center'>
                          <select id={`products${index + 1}`} disabled value={item2.products_id} className={formStyle.input} >
                            <option htmlFor={`products${index + 1}`} readOnly selected hidden value={''}>{item2.name}</option>
                          </select>
                          <label htmlFor={`products${index + 1}`} className={formStyle.label}>{`Produto ${index + 1}`}</label>
                        </div>
                      </div>
                      <div className='flex flex-col w-2/12'>
                        <div className='flex relative w-full items-center justify-center'>
                          <input required readOnly value={item2.quantity} id={`quantityProduct${index}`} className={formStyle.input} type='text' />
                          <label htmlFor={`quantityProduct${index}`} className={formStyle.label}>Quantidade</label>
                        </div>
                      </div>
                      <div className='flex flex-col w-/12'>
                        <div className='flex relative w-full items-center justify-center'>
                          <input required readOnly value={item2.purchase_price} id={`purchasePrice${index}`} className={formStyle.input} type='text' />
                          <label htmlFor={`purchasePrice${index}`} className={formStyle.label}>Preço de compra</label>
                        </div>
                      </div>
                    </div>
                  )
                })
              }

            </div>
          </div>
          <div className='flex w-full flex-row justify-center gap-8 items-center'>
            {currentStatusTracking.id == 1 && <div className="w-4/12 flex items-center justify-center">
              <button onClick={(e) => markAsDelivered(e)} readOnly={loading} className={formStyle.greenButton} >
                {loading ? <Oval width={20} height={20} /> : 'Marcar como entregue'}
              </button>
            </div>}
            {currentStatusTracking.id == 2 && <div className="w-4/12 flex items-center justify-center">
              <button onClick={(e) => markAsWaitingRefund(e)} readOnly={loading} className={formStyle.greenButton} >
                {loading ? <Oval width={20} height={20} /> : 'Pedido de reembolso'}
              </button>
            </div>}
            {currentStatusTracking.id == 3 && <div className="w-4/12 flex items-center justify-center">
              <button onClick={(e) => markAsRefunded(e)} readOnly={loading} className={formStyle.greenButton} >
                {loading ? <Oval width={20} height={20} /> : 'Marcar como reembolsado'}
              </button>
            </div>}
            <div className="w-4/12 flex items-center justify-start">
              <button readOnly={loading} onClick={(e) => deleteRequest(e)} className={formStyle.redButton} >{loading ? <Oval width={20} height={20} /> : 'Excluir'}</button>
            </div>
          </div>
        </form>
      </div >
    </div>
  );
}

export default RequestsById;
