import axios from "axios";
import { ArrowBigLeft, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ChangePage } from "../../../redux/features/activePage";
import { formStyle } from "../../../styles/global.css";
import moment from "moment";


function RequestsById() {
  const { id } = useParams();
  const { page } = useSelector(state => state.page)
  const dispatch = useDispatch();


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


  // funções crud
  async function loadRequest() {
    axios.get(`http://localhost:3030/requests/${id}`)
      .then(res => {
        console.log(res.data);
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
  }

  async function updateRequest() {
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
        console.log(res);
        console.log(res.data);
      })
      .catch(err => {
        console.log('Erro == ' + err);
      })
      .finally(() => {

      });
  }

  async function createRequest() {


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
        console.log(res.request);
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  // funções de carregamento de dados
  async function loadProducts() {
    axios.get(`http://localhost:3030/products`)
      .then(res => {
        setProductsData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function loadAccounts() {
    axios.get(`http://localhost:3030/accounts`)
      .then(res => {
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

  async function loadStatusTracking() {
    axios.get(`http://localhost:3030/statustracking`)
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

  // onDelete
  async function deleteRequest(e) {
    e.preventDefault();
    axios.delete(`http://localhost:3030/requests/${id}`)
      .then(res => {
        console.log(res.message);
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    loadAccounts();
    loadPlatforms();
    loadStatusTracking();
    loadProducts();

    if (id === 'create') {
      dispatch(ChangePage('createRequest'));
    }
    else {
      loadRequest();
      dispatch(ChangePage('requestsById'));
    }
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
                <select id="platform" onClick={e => handlePlatform(e)} onChange={e => handlePlatform(e)} className={formStyle.input} >
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
                <select id="accountName" className={formStyle.input} onChange={e => handleAccount(e)} onClick={e => handleAccount(e)}>
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

            {currentProducts.map((item, index) => {
              return (
                <div className="flex flex-row w-full gap-8 items-center justify-center" key={item.id}>
                  <div className='flex flex-col w-4/12'>
                    <div className='flex relative w-full items-center justify-center'>
                      <select id={`products${index + 1}`} onChange={e => handleTypeProduct(e, index)} onClick={e => handleTypeProduct(e, index)} value={item.product_id} className={formStyle.input} >
                        {page == 'createRequest' && <option value={null}>Selecione um produto</option>}
                        {item.product_id == '' && <option>Selecione um produto</option>}
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
                      <input required onChange={e => handleQuantityProduct(e, index)} onClick={e => handleQuantityProduct(e, index)} value={item.quantity} id={`quantityProduct${index}`} className={formStyle.input} type='text' />
                      <label htmlFor={`quantityProduct${index}`} className={formStyle.label}>Quantidade</label>
                    </div>
                  </div>

                  <div className='flex flex-col w-/12'>
                    <div className='flex relative w-full items-center justify-center'>
                      <input required onChange={e => handlePurchasePriceProduct(e, index)} onClick={e => handlePurchasePriceProduct(e, index)} value={item.purchase_price} id={`purchasePrice${index}`} className={formStyle.input} type='text' />
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
              <button type="submit" className={formStyle.greenButton} >
                {page === 'createRequest' && 'Cadastrar'}
                {page === 'requestsById' && 'Salvar'}
              </button>
            </div>
            {page == 'requestsById' &&
              <div className="w-4/12 flex items-center justify-start">
                <button onClick={(e) => deleteRequest(e)} className={formStyle.redButton} >Excluir</button>
              </div>
            }
          </div>
        </form>
      </div >
    </div >
  );
}

export default RequestsById;
