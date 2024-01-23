import axios from "axios";
import { ArrowBigLeft, Plus, Trash2 } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Oval } from 'svg-loaders-react';
import { formStyle } from "../../styles/global.css";

function RequestsCreate() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [typeInputDate, setTypeInputDate] = useState('text');

  const [storeName, setStoreName] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [date, setDate] = useState(new Date());

  //current data
  const [currentAccount, setCurrentAccount] = useState('');
  const [currentPlatform, setCurrentPlatform] = useState('');
  const [currentProducts, setCurrentProducts] = useState([]);

  //datas
  const [accountData, setAccountData] = useState([]);
  const [platformData, setPlatformData] = useState([]);
  const [productsData, setProductsData] = useState([]);


  async function createRequest() {
    setLoading(true);
    await axios.post(`${import.meta.env.VITE_REACT_BASE_API_URL}/api/requests/post`, {
      data: {
        accounts_id: currentAccount.id,
        status_tracking_id: 1,
        store_name: storeName,
        tracking_id: trackingId,
        created_at: date,
        prod_requests: currentProducts.map(item => {
          return {
            products_id: item.products_id,
            quantity: item.quantity,
            purchase_price: item.purchase_price
          }
        })
      }
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

  async function loadData() {
    // carrega os dados do pedido
    await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/api/requests/load/ofcreate`)
      .then(res => {
        setAccountData(res.data.accounts);
        setPlatformData(res.data.platforms);
        setProductsData(res.data.products);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handlePlatform(e) {
    e.preventDefault();
    setCurrentPlatform({
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text
    });
    setCurrentAccount({
      id: '',
      name: ''
    });
  }

  function handleAccount(e) {
    e.preventDefault();
    setCurrentAccount({
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text
    });
  }

  function addProduct(e) {
    e.preventDefault();

    //não adiciona mais produtos se a quantidade de produtos for igual a quantidade de produtos disponíveis
    if (currentProducts.length >= productsData.length) return toast.error('Não há mais produtos para adicionar!');

    //Não adiciona mais produtos se o ultimo produto adicionado não tiver sido selecionado
    if (currentProducts.map((item) => item.products_id).includes('')) return toast.error('Preencha todos os campos do produto antes de adicionar outro!');

    setCurrentProducts([...currentProducts, {
      products_id: '',
      prod_color_id: '',
      name: '',
      quantity: '',
      purchase_price: '',
    }]);
  }

  function handleTypeProduct(e, index) {
    e.preventDefault();

    currentProducts[index].products_id = e.target.value;
    currentProducts[index].name = e.target.options[e.target.selectedIndex].text;
    setCurrentProducts([...currentProducts]);
  }

  function handleQuantityProduct(e, index) {
    e.preventDefault();
    currentProducts[index].quantity = e.target.value;
    setCurrentProducts([...currentProducts]);
  }

  function handlePurchasePriceProduct(e, index) {
    e.preventDefault();
    currentProducts[index].purchase_price = e.target.value;
    setCurrentProducts([...currentProducts]);
  }

  function deleteProduct(e, index) {
    e.preventDefault();
    currentProducts.splice(index, 1);
    setCurrentProducts([...currentProducts]);
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
    <div className={formStyle.container}>
      <div className='flex flex-col items-center my-10 bg-zinc-100 w-10/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
        <div className='relative top-5 left-14 flex items-start justify-start w-full' >
          <a href={'/dashboard/requests'}>
            <ArrowBigLeft width={30} height={30} />
          </a>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='pb-24 m-0 font-semibold'>Criar pedido</h1>
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

            {/* palataforma */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="platform" onChange={e => handlePlatform(e)} className={formStyle.input} >
                  <option htmlFor="platform" disabled selected hidden value={''}>Selecione</option>
                  {
                    platformData.map((item) => {
                      return (
                        <option htmlFor='platform' key={item.id} value={item.id}>{item.name}</option>
                      )
                    })
                  }
                </select>
                <label htmlFor='platform' className={formStyle.label}>Plataforma</label>
              </div>
            </div>

            {/* Conta do pedido */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="accountName" className={formStyle.input} disabled={!currentPlatform} onChange={e => handleAccount(e)}>
                  <option htmlFor="accountName" disabled selected hidden value={''}>Selecione</option>
                  {
                    accountData.map((item) => {
                      if (item.platform_id == currentPlatform.id) {
                        return <option htmlFor='accountName' key={item.id} value={item.id}>{item.name}</option>
                      }
                    })
                  }
                </select>
                <label htmlFor='accountName' className={formStyle.label}>Conta</label>
              </div>
            </div>

            {/* Loja do pedido */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <input required onChange={e => setStoreName(e.target.value)} value={storeName} id='storeName' className={formStyle.input} type='text' />
                <label htmlFor='storeName' className={formStyle.label}>Loja</label>
              </div>
            </div>

            {/* Código de rastreio */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <input required onChange={e => setTrackingId(e.target.value)} value={trackingId} id='trackingId' className={formStyle.input} type='text' />
                <label htmlFor='trackingId' className={formStyle.label}>Código de rastreio</label>
              </div>
            </div>


            {/* Status tracking */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="statusTracking" disabled className={formStyle.input} >
                  <option htmlFor="statusTracking" disabled selected value={2}>Em trânsito</option>
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
                          <input required onChange={e => handlePurchasePriceProduct(e, index)} onClick={e => handlePurchasePriceProduct(e, index)} value={item2.purchase_price} id={`purchasePrice${index}`} className={formStyle.input} type='text' />
                          <label htmlFor={`purchasePrice${index}`} className={formStyle.label}>Preço de compra</label>
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
            </div>
          </div>
          <div className='flex w-full flex-row justify-center gap-8 items-center'>
            <div className="w-4/12 flex items-center justify-center">
              <button onClick={(e) => createRequest(e)} disabled={loading} className={formStyle.greenButton} >
                {loading ? <Oval width={20} height={20} /> : 'Salvar'}
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

export default RequestsCreate;
