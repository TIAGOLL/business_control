import { ArrowBigLeft } from "lucide-react";
import { formStyle } from "../../styles/global.css";
import { Oval } from 'svg-loaders-react';
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";


function SalesCreate() {

  const navigate = useNavigate();

  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
  const [typeInputDate, setTypeInputDate] = useState('text')
  const [loading, setLoading] = useState(true)

  const [productsData, setProductsData] = useState([])
  const [paymentsTypesData, setPaymentsTypesData] = useState([])
  const [couponsData, setCouponsData] = useState([])
  const [collaboratorsData, setCollaboratorsData] = useState([])
  const [clientsData, setClientsData] = useState([])

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
    await axios.get('http://localhost:3030/api/sales/load/ofcreate')
      .then((res) => {
        setProductsData(res.data.products)
        setPaymentsTypesData(res.data.payment_types)
        setCouponsData(res.data.cupons)
        setCollaboratorsData(res.data.collaborators)
        setClientsData(res.data.clients)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  async function createSale(e) {
    e.preventDefault();
    setLoading(true)
    console.log(currentPaid)
    await axios.post('http://localhost:3030/api/sales/post', {
      created_at: date,
      client_id: currentClient,
      payment_type_id: currentPaymentsTypes.id,
      porcent_rate: currentPaymentsTypes.porcent_rate,
      coupon_id: currentCoupom.id,
      coupon_discount: currentCoupom.discount,
      collaborators_id: currentCollaborator.id,
      comission: currentCollaborator.comission,
      total_sold: totalSold,
      paid: currentPaid,
      total_invested: currentProducts.reduce((acc, item) => acc + (item.purchase_price * item.quantity), 0).toFixed(2),
      prod_purchases: currentProducts.map((item) => {
        return {
          products_id: item.products_id,
          quantity: item.quantity,
          sale_price: item.sale_price,
          purchase_price: item.purchase_price,
        }
      })
    })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        toast.error('Erro ao cadastrar venda!')
      })
      .then((res) => {
        console.log(res)
        toast.success(res.data.message)
        navigate('/dashboard/sales')
      })
  }

  function addProduct(e) {
    e.preventDefault();

    //Não adiciona mais produtos se o ultimo produto adicionado não tiver sido selecionado
    if (currentProducts.map((item) => item.products_id).includes('')) return toast.error('Preencha todos os campos do produto antes de adicionar outro!');

    setCurrentProducts([...currentProducts, {
      products_id: '',
      name: '',
      quantity: '',
      purchase_price: '',
      sale_price: '',
    }]);
  }

  function handlePaymentType(e) {
    e.preventDefault();
    currentPaymentsTypes.id = e.target.value;
    currentPaymentsTypes.porcent_rate = paymentsTypesData.filter((item) => item.id == e.target.value)[0].porcent_rate;

    setCurrentPaymentsTypes(currentPaymentsTypes);
    console.log(currentPaymentsTypes)
  }

  function handleCoupom(e) {
    e.preventDefault();
    currentCoupom.id = e.target.value;
    currentCoupom.discount = couponsData.filter((item) => item.id == e.target.value)[0].discount;
    setCurrentCoupom(currentCoupom);
  }

  function handleCollaborator(e) {
    e.preventDefault();

    currentCollaborator.id = e.target.value;
    currentCollaborator.comission = collaboratorsData.filter((item) => item.id == e.target.value)[0].comission;
    setCurrentCollaborator(currentCollaborator);
  }

  function handleTypeProduct(e, index) {
    e.preventDefault();

    currentProducts[index].products_id = e.target.value;
    currentProducts[index].name = e.target.options[e.target.selectedIndex].text;
    currentProducts[index].purchase_price = productsData.filter((item) => item.id == e.target.value)[0].purchase_price;
    currentProducts[index].sale_price = productsData.filter((item) => item.id == e.target.value)[0].sale_price;

    setCurrentProducts([...currentProducts]);
  }

  function handleQuantityProduct(e, index) {
    e.preventDefault();

    //verifica se há estoque disponível
    if (e.target.value > productsData.filter((item) => item.id == currentProducts[index].products_id)[0].quantity) {
      const stock = productsData.filter((item) => item.id == currentProducts[index].products_id)[0].quantity
      return toast.error(`O estoque disponível para ${productsData.filter((item) => item.id == currentProducts[index].products_id)[0].name} é de ${stock} unidades!`);
    }

    currentProducts[index].quantity = e.target.value;

    setCurrentProducts([...currentProducts]);
  }

  function handleSalePriceProduct(e, index) {
    e.preventDefault();
    currentProducts[index].sale_price = e.target.value;
    setCurrentProducts([...currentProducts]);
  }

  function deleteProduct(e, index) {
    e.preventDefault();
    currentProducts.splice(index, 1);
    setCurrentProducts([...currentProducts]);
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
          <h1 className='font-semibold'>Faturamento</h1>
        </div>
        <form className="w-full gap-8 flex-col flex">
          <div className='flex w-full flex-wrap px-14 justify-center items-center gap-8'>

            {/* Data do pedido */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <input required onChange={e => setDate(e.target.value)} value={moment(date).format('DD/MM/YYYY')} id='date' type={typeInputDate} className={formStyle.input} onFocus={() => setTypeInputDate('date')} onBlur={() => setTypeInputDate('text')} />
                <label htmlFor='date' className={formStyle.label}>Data</label>
              </div>
            </div>

            {/* Cliente */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="client" onChange={e => setCurrentClient(e.target.value)} className={formStyle.input} >
                  <option htmlFor="client" disabled selected hidden value={''}>Selecione</option>
                  {
                    clientsData.map((item) => {
                      return (
                        <option htmlFor='client' key={item.id} value={item.id}>{item.name}</option>
                      )
                    })
                  }
                </select>
                <label htmlFor='platform' className={formStyle.label}>Cliente</label>
              </div>
            </div>

            {/* Tipo de pagamento */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="paymentType" onChange={e => handlePaymentType(e)} className={formStyle.input} >
                  <option htmlFor="paymentType" disabled selected hidden value={''}>Selecione</option>
                  {
                    paymentsTypesData.map((item) => {
                      return (
                        <option htmlFor='paymentType' key={item.id} value={item.id}>{item.name}</option>
                      )
                    })
                  }
                </select>
                <label htmlFor='paymentType' className={formStyle.label}>Tipo de pagamento</label>
              </div>
            </div>

            {/* Cupom */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="coupom" onChange={e => handleCoupom(e)} className={formStyle.input} >
                  <option htmlFor="coupom" disabled selected hidden value={''}>Selecione</option>
                  {
                    couponsData.map((item) => {
                      return (
                        <option htmlFor='coupom' key={item.id} value={item.id}>{item.name}</option>
                      )
                    })
                  }
                </select>
                <label htmlFor='coupom' className={formStyle.label}>Cupom</label>
              </div>
            </div>

            {/* Funcionário */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="collaborator" onChange={e => handleCollaborator(e)} className={formStyle.input} >
                  <option htmlFor="collaborator" disabled selected hidden value={''}>Selecione</option>
                  {
                    collaboratorsData.map((item) => {
                      return (
                        <option htmlFor='collaborator' key={item.id} value={item.id}>{item.name}</option>
                      )
                    })
                  }
                </select>
                <label htmlFor='collaborator' className={formStyle.label}>Funcionário</label>
              </div>
            </div>

            {/* Pago? */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="pago" onChange={e => setCurrentPaid(e.target.value)} className={formStyle.input} >
                  <option htmlFor="pago" disabled selected hidden value={''}>Selecione</option>
                  <option htmlFor="pago" value={true}>Sim</option>
                  <option htmlFor="pago" value={false}>Não</option>
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
                          <select id={`products${index + 1}`} onChange={e => handleTypeProduct(e, index)} value={item2.products_id} className={formStyle.input} >
                            <option htmlFor={`products${index + 1}`} disabled selected hidden value={''}>Selecione</option>
                            {
                              productsData.map((item) => {
                                return (
                                  <option htmlFor={`products${index + 1}`} key={item.id} value={item.id}>{item.full_name}</option>
                                )
                              })
                            }
                          </select>
                          <label htmlFor={`products${index + 1}`} className={formStyle.label}>{`Produto ${index + 1}`}</label>
                        </div>
                      </div>
                      {console.log(currentProducts)}
                      <div className='flex flex-col w-2/12'>
                        <div className='flex relative w-full items-center justify-center'>
                          <input required onChange={e => handleQuantityProduct(e, index)} onClick={e => handleQuantityProduct(e, index)} value={item2.quantity} id={`quantityProduct${index}`} className={formStyle.input} type='text' />
                          <label htmlFor={`quantityProduct${index}`} className={formStyle.label}>Quantidade</label>
                        </div>
                      </div>
                      <div className='flex flex-col w-/12'>
                        <div className='flex relative w-full items-center justify-center'>
                          <input required readOnly onChange={e => handleSalePriceProduct(e, index)} value={item2.sale_price} id={`salePrice${index}`} className={formStyle.input} type='text' />
                          <label htmlFor={`salePrice${index}`} className={formStyle.label}>Preço unit.</label>
                        </div>
                      </div>
                      <div className='flex relative items-center justify-start'>
                        <button className={formStyle.redButton + ' !w-10 !h-8'} onClick={e => deleteProduct(e, index)}><Trash2 width={20} height={20} /></button>
                      </div>
                    </div>
                  )
                })
              }
              {/* Add product */}
              <div className='flex w-full flex-col justify-center items-center mb-8'>
                <button onClick={addProduct} className={formStyle.blueButton + ' !w-1/12'} >
                  <Plus />
                </button>
              </div>

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
            <div className="w-4/12 flex items-center justify-center">
              <button onClick={(e) => createSale(e)} disabled={loading} className={formStyle.greenButton} >
                {loading ? <Oval width={20} height={20} /> : 'Faturar'}
              </button>
            </div>
          </div>
        </form>
        {
          <div>
            <p>{currentProducts.map((item) => {
              return (
                <div className="flex gap-8" key={item.products_id} >
                  <p>{item.products_id}</p>
                  <p>{item.name}</p>
                  <p>{item.color}</p>
                  <p>{item.quantity}</p>
                  <p>{item.purchase_price}</p>
                  <p>{item.sale_price}</p>
                </div>
              )
            })}
            </p>
          </div>
        }
      </div >
    </div >
  );
}

export default SalesCreate;
