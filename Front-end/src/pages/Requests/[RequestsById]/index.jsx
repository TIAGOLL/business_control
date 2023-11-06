import axios from "axios";
import { ArrowBigLeft, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { ChangePage } from "../../../redux/features/activePage";
import { formStyle } from "../../../styles/global.css";
import moment from "moment";
import { Oval } from 'svg-loaders-react';
import { toast } from "react-toastify";

function RequestsById() {
  const { id } = useParams();
  const { page } = useSelector(state => state.page)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [typeInputDate, setTypeInputDate] = useState('text');

  const [storeName, setStoreName] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [date, setDate] = useState('');
  const [statusTracking, setStatusTracking] = useState('');

  //current data
  const [currentStatusTracking, setCurrentStatusTracking] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');
  const [currentPlatform, setCurrentPlatform] = useState('');
  const [currentProducts, setCurrentProducts] = useState([]);

  //datas
  const [statusTrackingData, setStatusTrackingData] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [platformData, setPlatformData] = useState([]);
  const [productsData, setProductsData] = useState([]);


  async function updateRequest() {
    setLoading(true);
    axios.put(`http://localhost:3030/requests/${id}`, {
      Headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        account_id: currentAccount.id,
        date: (new Date(date)).toISOString(),
        status_tracking_id: currentStatusTracking.id,
        store_name: storeName,
        tracking_id: trackingId,
        prod_request: currentProducts.map(item => {
          return {
            product_id: item.product_id,
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
        console.log('Erro == ' + err);
        toast.error('Erro ao atualizar pedido!');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function createRequest() {
    setLoading(true);
    axios.post(`http://localhost:3030/requests`, {
      data: {
        account_id: currentAccount.id,
        date: (new Date(date)).toISOString(),
        status_tracking_id: currentStatusTracking.id,
        store_name: storeName,
        tracking_id: trackingId,
        prod_request: currentProducts.map(item => {
          return {
            product_id: item.product_id,
            quantity: item.quantity,
            purchase_price: item.purchase_price
          }
        })
      }
    })
      .then(res => {
        console.log(res.message);
        navigate('/dashboard/requests')
        toast.success('Pedido cadastrado com sucesso!');
      })
      .catch(err => {
        console.log(err.message);
        toast.error('Erro ao cadastrar pedido!');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function deleteRequest(e) {
    setLoading(true);
    e.preventDefault();
    axios.delete(`http://localhost:3030/requests/${id}`)
      .then(res => {
        console.log(res.message);
        navigate('/dashboard/requests')
        toast.warn('Pedido excluído com sucesso!');
      })
      .catch(err => {
        console.log(err.message);
        toast.error('Erro ao excluir pedido!');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function loadRequest() {
    // carrega os dados do pedido
    axios.get(`http://localhost:3030/requests/${id}`)
      .then(res => {
        setTrackingId(res.data.tracking_id);
        setStoreName(res.data.store_name);
        setDate(moment(res.data.date).format('YYYY/MM/DD'));

        setCurrentProducts(res.data.prod_request.map(item => {
          return {
            product_id: item.product_id,
            name: item.product.name,
            quantity: item.quantity,
            purchase_price: item.purchase_price,
          };
        })
        );
        setCurrentStatusTracking(res.data.status_tracking);
        setCurrentAccount(res.data.account);
        setCurrentPlatform(res.data.account.platform);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function loadData() {
    setLoading(true);
    // carrega os dados dos produtos
    await axios.get(`http://localhost:3030/products`)
      .then(res => {
        setProductsData(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    // carrega os dados das contas
    await axios.get(`http://localhost:3030/accounts`)
      .then(res => {
        setAccountData(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    // carrega os dados das plataformas
    await axios.get(`http://localhost:3030/platforms`)
      .then(res => {
        setPlatformData(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    // carrega os dados dos status tracking
    await axios.get(`http://localhost:3030/statustracking`)
      .then(res => {
        setStatusTrackingData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // funções de manipulação de inputs
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

  function handleStatusTracking(e) {
    e.preventDefault();
    setCurrentStatusTracking({
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text
    });
  }

  function addProduct(e) {
    e.preventDefault();
    setCurrentProducts([...currentProducts, {
      product_id: '',
      name: '',
      quantity: '',
      purchase_price: '',
    }]);
  }

  function handleTypeProduct(e, index) {
    e.preventDefault();

    currentProducts.map((item) => {
      if (e.target.value == item.product_id) {
        toast.error('Esse Produto ja está incluído!')
        return deleteProduct(e, index)
      }
    })

    currentProducts[index].product_id = e.target.value;
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

  // onSubmit
  async function handleSubmit(e) {
    e.preventDefault();
    if (page === 'createRequest') {
      createRequest()
    } else if (page === 'requestsById') {
      updateRequest()
    }
  }


  useEffect(() => {
    setLoading(true);
    loadData();

    if (id === 'create') {
      dispatch(ChangePage('createRequest'));
    }
    else {
      loadRequest();
      dispatch(ChangePage('requestsById'));
    }
    setLoading(false);

  }, []);

  return (
    <div className={formStyle.container}>
      <div className='flex flex-col items-center my-10 bg-zinc-100 w-6/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
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
                <div className='flex relative w-full items-center justify-center'>
                  <input readOnly required value={id} id='id' className={formStyle.input} type='text' />
                  <label htmlFor='id' className={formStyle.label}>ID</label>
                </div>
              </div>
            }

            {/* palataforma */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="platform" onChange={e => handlePlatform(e)} className={formStyle.input} >
                  <option htmlFor='platform' value={currentPlatform.id}>{currentPlatform.name}</option>
                  {
                    platformData.map((item) => {
                      if (item.id == currentPlatform.id) return; // não exibe a plataforma atual
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
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="accountName" className={formStyle.input} onChange={e => handleAccount(e)}>
                  <option htmlFor='accountName' key={currentAccount.id} value={currentAccount.id}>{currentAccount.name}</option>
                  {
                    accountData.map((item) => {
                      if (item.id == currentAccount.id) return; // não exibe a plataforma atual
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
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full items-center justify-center'>
                <input required onChange={e => setStoreName(e.target.value)} value={storeName} id='storeName' className={formStyle.input} type='text' />
                <label htmlFor='storeName' className={formStyle.label}>Loja</label>
              </div>
            </div>

            {/* Código de rastreio */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full items-center justify-center'>
                <input required onChange={e => setTrackingId(e.target.value)} value={trackingId} id='trackingId' className={formStyle.input} type='text' />
                <label htmlFor='trackingId' className={formStyle.label}>Código de rastreio</label>
              </div>
            </div>

            {/* Data do pedido */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full items-center justify-center'>
                <input required onChange={e => setDate(moment(e.target.value).format('YYYY-MM-DD'))} value={moment(date).format('DD/MM/YYYY')} id='date' type={typeInputDate} className={formStyle.input} onFocus={() => setTypeInputDate('date')} onBlur={() => setTypeInputDate('text')} />
                <label htmlFor='date' className={formStyle.label}>Data</label>
              </div>
            </div>

            {/* Status tracking */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full items-center justify-center'>
                <select id="statusTracking" onChange={e => handleStatusTracking(e)} className={formStyle.input} >
                  <option htmlFor='statusTracking' key={currentStatusTracking.id} value={currentStatusTracking.id}>{currentStatusTracking.name}</option>
                  {
                    statusTrackingData.map((item) => {
                      if (item.id == currentStatusTracking.id) return; // não exibe a plataforma atual
                      return (
                        <option htmlFor='statusTracking' key={item.id} value={item.id}>{item.name}</option>
                      )
                    })
                  }
                </select>
                <label htmlFor='statusTracking' className={formStyle.label}>Status</label>
              </div>
            </div>

            {/* Quantidade de items */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full items-center justify-center'>
                <input readOnly required value={currentProducts.length} id='quantityItems' className={formStyle.input} type='text' />
                <label htmlFor='quantityItems' className={formStyle.label}>Quantidade de items</label>
              </div>
            </div>

            {/* Produtos */}
            <div className='flex w-6/12 flex-col justify-center items-center mb-8'>
              <button onClick={addProduct} className={formStyle.blueButton} >
                Add produto
              </button>
            </div>

            {
              currentProducts.map((item2, index) => {
                return (
                  <div className="flex flex-row w-full gap-8 items-center justify-center" key={item2.product_id}>
                    <div className='flex flex-col w-4/12'>
                      <div className='flex relative w-full items-center justify-center'>
                        <select id={`products${index + 1}`} onChange={e => handleTypeProduct(e, index)} value={item2.product_id} className={formStyle.input} >
                          {item2.product_id == '' && <option>Selecione um produto</option>}
                          {
                            productsData.map((item, idx) => {
                              return (
                                <option htmlFor={`products${idx + 1}`} key={item.id} value={item.id}>{item.name}</option>
                              )
                            })
                          }
                        </select>
                        <label htmlFor={`products${index + 1}`} className={formStyle.label}>{`Produto ${index + 1}`}</label>
                      </div>
                    </div>

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
                      <button className="bg-red-500 flex justify-center font-semibold border border-zinc-500 text-lg w-10 h-8 text-center items-center rounded-lg hover:border-black hover:bg-red-600" onClick={e => deleteProduct(e, index)}><Trash2 width={20} height={20} color="white" /></button>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className='flex w-full flex-row justify-center gap-8 items-center'>
            <div className="w-4/12 flex items-center justify-end">
              <button type="submit" disabled={loading} className={formStyle.greenButton} >
                {
                  loading ? <Oval width={20} height={20} /> :
                    page === 'createRequest' && 'Cadastrar' ||
                    page === 'requestsById' && 'Salvar'
                }
              </button>
            </div>
            {
              page == 'requestsById' &&
              <div className="w-4/12 flex items-center justify-start">
                <button disabled={loading} onClick={(e) => deleteRequest(e)} className={formStyle.redButton} >{loading ? <Oval width={20} height={20} /> : 'Excluir'}</button>
              </div>
            }
          </div>
        </form>
      </div >
    </div >
  );
}

export default RequestsById;
