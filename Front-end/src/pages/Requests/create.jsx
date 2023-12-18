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
  const [colorsData, setColorsData] = useState([]);


  // async function updateRequest() {
  //   setLoading(true);
  //   axios.put(`http://localhost:3030/requests/${id}`, {
  //     data: {
  //       accounts_id: currentAccount.id,
  //       store_name: storeName,
  //       status_tracking_id: currentStatusTracking.id,
  //       tracking_id: trackingId,
  //       prod_requests: currentProducts.map(item => {
  //         return {
  //           products_id: item.products_id,
  //           quantity: item.quantity,
  //           purchase_price: item.purchase_price
  //         }
  //       })
  //     }
  //   })
  //     .then(res => {
  //       navigate('/dashboard/requests')
  //       toast.success(res.data.message);
  //     })
  //     .catch(err => {
  //       console.log('Erro == ' + err);
  //       toast.error('Erro ao atualizar pedido!');
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  async function createRequest() {
    setLoading(true);
    axios.post(`http://localhost:3030/api/requests/post`, {
      data: {
        accounts_id: currentAccount.id,
        status_tracking_id: currentStatusTracking.id,
        store_name: storeName,
        tracking_id: trackingId,
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
        console.log(res.data.data);
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

  async function deleteRequest(e) {
    setLoading(true);
    e.preventDefault();
    axios.delete(`http://localhost:3030/api/requests/delete/${id}`)
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

  async function loadData() {
    // carrega os dados do pedido
    axios.get(`http://localhost:3030/api/requests/byid/${id}`)
      .then(res => {
        setTrackingId(res.data.requests.tracking_id);
        setStoreName(res.data.requests.store_name);
        setDate(res.data.created_at);
        setAccountData(res.data.accounts);
        setPlatformData(res.data.platforms);
        setStatusTrackingData(res.data.status_tracking);
        setProductsData(res.data.products);
        setColorsData(res.data.colors);

        setCurrentProducts(res.data.requests.prod_requests.map(item => {
          return {
            products_id: item.products_id,
            name: item.products.name,
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
      products_id: '',
      name: '',
      quantity: '',
      purchase_price: '',
    }]);
  }

  function handleTypeProduct(e, index) {
    e.preventDefault();

    currentProducts.map((item) => {
      if (e.target.value == item.products_id) {
        toast.error('Esse Produto ja está incluído!')
        return deleteProduct(e, index)
      }
    })

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

  function handleColorProduct(e, index) {
    e.preventDefault();
    currentProducts[index].color = e.target.value;
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
    setLoading(false);

  }, []);

  return (
    <div className={formStyle.container}>
      <div className='flex flex-col items-center my-10 bg-zinc-100 w-10/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
        <div className='relative top-5 left-14 flex items-start justify-start w-full' >
          <a href={'/dashboard/requests'}>
            <ArrowBigLeft width={30} height={30} />
          </a>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='pb-24 m-0 font-semibold'>{page === 'createRequest' ? 'Cadastrar pedido' : 'Editar pedido'}</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full gap-8 flex-col flex">
          <div className='flex w-full flex-wrap px-14 justify-center items-center gap-8'>

            {/* ID */}
            {page === 'createRequest' ? null :
              <div className='flex flex-col w-5/12'>
                <div className='flex relative w-full items-center justify-center'>
                  <input readOnly required value={id} id='id' className={formStyle.input} type='text' />
                  <label htmlFor='id' className={formStyle.label}>ID</label>
                </div>
              </div>
            }

            {/* Data do pedido */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full items-center justify-center'>
                <input required onChange={e => setDate(moment(e.target.value).format('YYYY-MM-DD'))} value={moment(date).format('DD/MM/YYYY')} id='date' type={typeInputDate} className={formStyle.input} onFocus={() => setTypeInputDate('date')} onBlur={() => setTypeInputDate('text')} />
                <label htmlFor='date' className={formStyle.label}>Data</label>
              </div>
            </div>

            {/* palataforma */}
            <div className='flex flex-col w-5/12'>
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
            <div className='flex flex-col w-5/12'>
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
            <div className='flex flex-col w-5/12'>
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
                  console.log(item2),
                  <div className="flex flex-row w-full gap-8 items-center justify-center" key={item2.products_id}>
                    <div className='flex flex-col w-4/12'>
                      <div className='flex relative w-full items-center justify-center'>
                        <select id={`products${index + 1}`} onChange={e => handleTypeProduct(e, index)} value={item2.products_id} className={formStyle.input} >
                          <option htmlFor={`products${index + 1}`} disabled selected hidden value={''}>Selecione um produto</option>
                          {
                            productsData.map((item) => {
                              return (
                                <option htmlFor={`products${index + 1}`} key={item.id} value={item.id}>{item.name}</option>
                              )
                            })
                          }
                        </select>
                        <label htmlFor={`products${index + 1}`} className={formStyle.label}>{`Produto ${index + 1}`}</label>
                      </div>
                    </div>

                    <div className='flex flex-col w-4/12'>
                      <div className='flex relative w-full items-center justify-center'>
                        <select id={`colorproduct${index + 1}`} onChange={e => handleColorProduct(e, index)} value={item2.color} className={formStyle.input} >
                          <option htmlFor={`colorproduct${index + 1}`} disabled selected hidden>Selecione uma cor</option>
                          {
                            colorsData.map((item) => {
                              if (item2.products_id == item.products_id)
                                return (
                                  <option htmlFor={`colorproduct${index + 1}`} key={item.id} value={item.id}>{item.color}</option>
                                )
                            })
                          }
                        </select>
                        <label htmlFor={`products${index + 1}`} className={formStyle.label}>Cor</label>
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
        {
          <div>
            <p>{currentProducts.map((item) => {
              console.log(item);
              return (
                <div className="flex gap-8">
                  <p>{item.products_id}</p>
                  <p>{item.name}</p>
                  <p>{item.color}</p>
                  <p>{item.quantity}</p>
                  <p>{item.purchase_price}</p>
                </div>
              )
            })}</p>
          </div>
        }
      </div >
    </div >
  );
}

export default RequestsById;
