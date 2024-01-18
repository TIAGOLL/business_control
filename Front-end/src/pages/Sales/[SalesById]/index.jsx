import { ArrowBigLeft } from "lucide-react";
import { formStyle } from "../../../styles/global.css";
import { Oval } from 'svg-loaders-react';
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";


function SaleById() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
  const [typeInputDate, setTypeInputDate] = useState('text')
  const [loading, setLoading] = useState(true)

  const [currentClient, setCurrentClient] = useState('')
  const [currentProducts, setCurrentProducts] = useState([{
    products_id: '',
    name: '',
    quantity: '',
    purchase_price: '',
    sale_price: '',
  }])
  const [currentPaymentsTypes, setCurrentPaymentsTypes] = useState({
    id: '',
    porcent_rate: '',
  })
  const [currentCoupom, setCurrentCoupom] = useState({
    id: '',
    discount: '',
  })
  const [currentCollaborator, setCurrentCollaborator] = useState({
    id: '',
    comission: '',
  })
  const [currentPaid, setCurrentPaid] = useState()
  const [totalSold, setTotalSold] = useState(0)

  async function loadData() {
    setLoading(true)
    await axios.get(`http://localhost:3030/api/sales/load/byid/${id}`)
      .then((res) => {
        console.log(res.data)
        setDate(res.data.sale.created_at)
        setCurrentClient(res.data.sale.clients)
        setCurrentProducts(res.data.sale.prod_purchases)
        setCurrentPaymentsTypes(res.data.sale.payment_types)
        setCurrentCoupom(res.data.sale.coupons)
        setCurrentCollaborator(res.data.sale.collaborators)
        setCurrentPaid(res.data.sale.paid)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  async function markAsPaid(e) {
    e.preventDefault()
    setLoading(true)
    await axios.put(`http://localhost:3030/api/sales/put/markaspaid/${id}`)
      .then((res) => {
        toast.success(res.data.message)
        navigate('/dashboard/sales')
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  async function deleteSale(e) {
    e.preventDefault()
    await axios.delete(`http://localhost:3030/api/sales/delete/${id}`, {
      data: {
        prod_purchases: currentProducts,
        client_id: currentClient.id,
        total_sold: totalSold,
        coupom_discount: currentCoupom.discount,
      }
    })
      .then((res) => {
        toast.success(res.data.message)
        navigate('/dashboard/sales')
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    setTotalSold(currentProducts.reduce((acc, item) => acc + (item.sale_price * item.quantity), 0).toFixed(2))
  }, [currentProducts])

  if (loading) return (
    <div className={formStyle.container}>
      <div className='flex flex-col items-center my-10 bg-zinc-100 w-10/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
        <div className='relative top-5 left-14 flex items-start justify-start w-full' >
          <a href={'/dashboard/sales'}>
            <ArrowBigLeft width={30} height={30} />
          </a>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='pb-24 m-0 font-semibold'>Faturamento</h1>
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
    <div className={formStyle.container}>
      <div className='flex flex-col items-center my-10 bg-zinc-100 w-10/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
        <div className='relative top-5 left-14 flex items-start justify-start w-full' >
          <a href={'/dashboard/sales'}>
            <ArrowBigLeft width={30} height={30} />
          </a>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='font-semibold'>Editar faturamento</h1>
        </div>
        <form className="w-full gap-8 flex-col flex">
          <div className='flex w-full flex-wrap px-14 justify-center items-center gap-8'>

            {/* Data do pedido */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <input required disabled value={moment(date).format('DD/MM/YYYY')} id='date' type={typeInputDate} className={formStyle.input} />
                <label htmlFor='date' className={formStyle.label}>Data</label>
              </div>
            </div>

            {/* Cliente */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="client" disabled className={formStyle.input} >
                  <option htmlFor="client" disabled selected hidden value={currentClient.id}>{currentClient.name}</option>
                </select>
                <label htmlFor='platform' className={formStyle.label}>Cliente</label>
              </div>
            </div>

            {/* Tipo de pagamento */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="paymentType" disabled className={formStyle.input} >
                  <option htmlFor="paymentType" disabled selected hidden value={currentPaymentsTypes.id}>{currentPaymentsTypes.name}</option>
                </select>
                <label htmlFor='paymentType' className={formStyle.label}>Tipo de pagamento</label>
              </div>
            </div>

            {/* Cupom */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="coupom" disabled className={formStyle.input} >
                  <option htmlFor="coupom" disabled selected hidden value={currentCoupom.id}>{currentCoupom.name}</option>
                </select>
                <label htmlFor='coupom' className={formStyle.label}>Cupom</label>
              </div>
            </div>

            {/* Funcionário */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="collaborator" disabled className={formStyle.input} >
                  <option htmlFor="collaborator" disabled selected hidden value={currentCollaborator.id}>{currentCollaborator.name}</option>
                </select>
                <label htmlFor='collaborator' className={formStyle.label}>Funcionário</label>
              </div>
            </div>

            {/* Pago? */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="pago" disabled className={formStyle.input} >
                  {currentPaid == true && <option htmlFor="pago" disabled selected hidden>Pago</option>}
                  {currentPaid == false && <option htmlFor="pago" disabled selected hidden>Não pago</option>}
                </select>
                <label htmlFor='pago' className={formStyle.label}>Pago?</label>
              </div>
            </div>

            <div className="flex w-full flex-wrap px-14 justify-center items-center gap-8 border-2 border-zinc-400 rounded-xl p-14">
              {
                currentProducts.map((item2, index) => {
                  return (
                    <div className="flex flex-row w-full gap-8 items-center justify-center" key={item2.products_id}>
                      <div className='flex flex-col w-4/12'>
                        <div className='flex relative w-full items-center justify-center'>
                          <select id={`products${index + 1}`} disabled value={item2.products_id} className={formStyle.input} >
                            <option htmlFor={`products${index + 1}`} selected hidden >{item2.products.full_name}</option>
                          </select>
                          <label htmlFor={`products${index + 1}`} className={formStyle.label}>{`Produto ${index + 1}`}</label>
                        </div>
                      </div>
                      <div className='flex flex-col w-2/12'>
                        <div className='flex relative w-full items-center justify-center'>
                          <input required disabled value={item2.quantity} id={`quantityProduct${index}`} className={formStyle.input} type='text' />
                          <label htmlFor={`quantityProduct${index}`} className={formStyle.label}>Quantidade</label>
                        </div>
                      </div>
                      <div className='flex flex-col w-/12'>
                        <div className='flex relative w-full items-center justify-center'>
                          <input required readOnly disabled value={item2.sale_price} id={`salePrice${index}`} className={formStyle.input} type='text' />
                          <label htmlFor={`salePrice${index}`} className={formStyle.label}>Preço unit.</label>
                        </div>
                      </div>
                    </div>
                  )
                })
              }

              <div className="flex w-full flex-col justify-end items-end gap-10">

                {/* Quantidade de items */}
                <div className='flex w-full flex-col justify-end items-end'>
                  <div className='flex relative items-center justify-center'>
                    <input readOnly required value={currentProducts.length} id='quantityItems' className={formStyle.input} type='text' />
                    <label htmlFor='quantityItems' className={formStyle.label}>Quantidade de items</label>
                  </div>
                </div>

                {/* Preço total */}
                <div className='flex relative items-center justify-center'>
                  <input readOnly required value={totalSold} id='totalPrice' className={formStyle.input} type='text' />
                  <label htmlFor='totalPrice' className={formStyle.label}>Preço total</label>
                </div>
              </div>
            </div>
          </div>
          <div className='flex w-full flex-row justify-center gap-8 items-center'>
            {currentPaid == false && <div className="w-4/12 flex items-center justify-center">
              <button onClick={(e) => markAsPaid(e)} disabled={loading} className={formStyle.greenButton} >
                {loading ? <Oval width={20} height={20} /> : 'Marcar como pago'}
              </button>
            </div>}
            <div className="w-4/12 flex items-center justify-center">
              <button onClick={(e) => deleteSale(e)} disabled={loading} className={formStyle.redButton} >
                {loading ? <Oval width={20} height={20} /> : 'Deletar'}
              </button>
            </div>
          </div>
        </form>
      </div >
    </div >
  );
}

export default SaleById;
