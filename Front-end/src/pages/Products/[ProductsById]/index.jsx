import axios from "axios";
import { ArrowBigLeft, AwardIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formStyle } from "../../../styles/global.css";
import { useDispatch, useSelector } from "react-redux";
import { ChangePage } from "../../../redux/features/activePage";
import { toast } from "react-toastify";


function ProductsById() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { page } = useSelector(state => state.page)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);
  const [purchasePrice, setPurchasePrice] = useState();
  const [profitPorcent, setProfitPorcent] = useState(0);

  const [categorysData, setCategorysData] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    quantity: '',
    description: '',
    sale_price: '',
    category: {
      id: '',
      name: ''
    },
  });

  async function loadProducts() {
    await axios.get(`http://localhost:3030/products/${id}`)
      .then(res => {
        setCurrentProduct(res.data);
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  async function loadData() {
    // procurar a quantidade no estoque físico
    await axios.get(`http://localhost:3030/prodrequests/${id}`)
      .then(res => {
        const quantity = res.data.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0);
        currentProduct.quantity = quantity
        setCurrentProduct({ ...currentProduct });
      })
      .catch(err => {
        console.log(err.message);
      })

    // procurar o preço de compra do pedido mais recente
    await axios.get(`http://localhost:3030/prodrequests/${id}`)
      .then(res => {
        const maxID = res.data.reduce(function (item, current) {
          return (item.request_id > current.request_id) ? item : current
        })
        setPurchasePrice(maxID.purchase_price);
      })
      .catch(err => {
        console.log(err.message);
        setPurchasePrice('Nenhum preço de compra encontrado');
      })
  }

  async function loadCategorys() {
    // pegar todas as categorias
    await axios.get(`http://localhost:3030/categorys`)
      .then(res => {
        setCategorysData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCategory(e) {
    e.preventDefault();
    currentProduct.category.id = e.target.value;
    currentProduct.category.name = e.target.options[e.target.selectedIndex].text;
    setCurrentProduct({
      ...currentProduct,
      category: {
        id: currentProduct.category.id,
        name: currentProduct.category.name
      }
    });
  }

  function handleName(e) {
    e.preventDefault();
    currentProduct.name = e.target.value;
    setCurrentProduct({ ...currentProduct });
  }

  function handleDescription(e) {
    e.preventDefault();
    currentProduct.description = e.target.value;
    setCurrentProduct({ ...currentProduct });
  }

  async function handleSalePrice(e) {
    e.preventDefault();
    currentProduct.sale_price = e.target.value;
    setCurrentProduct({ ...currentProduct });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (page === 'createProduct') {
      createProduct()
        .then(res => {
          navigate('/dashboard/products')
          toast.success('Produto cadastrado com sucesso!')
        })
        .catch(err => {
          console.log(err.message);
        });
    } else if (page === 'productsbyid') {
      updateProduct()
        .then(res => {
          navigate('/dashboard/products')
          toast.success('Produto atualizado com sucesso!')
        })
        .catch(err => {
          console.log(err.message);
        })
    }

    async function updateProduct() {
      await axios.put(`http://localhost:3030/products/${id}`, {
        where: {
          id: id
        },
        data: {
          name: currentProduct.name,
          category_id: currentProduct.category.id,
          description: currentProduct.description,
          sale_price: currentProduct.sale_price,
        }
      })
    }

    async function createProduct() {
      console.log(currentProduct)
      await axios.post(`http://localhost:3030/products`, {
        data: {
          name: currentProduct.name,
          category_id: currentProduct.category.id,
          description: currentProduct.description,
          sale_price: currentProduct.sale_price,
        }
      })
        .then(res => {
          console.log(res.message);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    if (id === 'create') {
      dispatch(ChangePage('createProduct'));
      loadCategorys();
    }
    else {
      dispatch(ChangePage('productsbyid'));
      loadData();
      loadCategorys();
      loadProducts();
    }
    setLoading(false);
  }, []);

  // calcula o lucro
  useEffect(() => {
    if (!purchasePrice || purchasePrice == 'Nenhum preço de compra encontrado') return setProfitPorcent('Nenhum preço de compra encontrado');
    const value = (currentProduct.sale_price - purchasePrice) / purchasePrice * 100
    setProfitPorcent(value.toFixed(1));
  }, [purchasePrice, currentProduct.sale_price]);

  return (
    <div className={formStyle.container}>
      <div className='flex flex-col items-center bg-zinc-100 w-4/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
        <div className='relative top-5 left-14 flex items-start justify-start w-full' >
          <a href={'/dashboard/products'}>
            <ArrowBigLeft width={30} height={30} />
          </a>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='p-0 m-0 font-semibold'>
            {page === 'createProduct' && 'Cadastrar produto'}
            {page === 'productsbyid' && 'Editar produto'}
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full gap-8 flex-col flex">
          <div className='flex w-full flex-col px-14 justify-center items-center gap-8'>

            {/* ID */}
            {page === 'productsbyid' &&
              <div className='flex flex-col w-full'>
                <div className='flex relative w-full space-x-2 items-center justify-center'>
                  <input readOnly required value={currentProduct.id} id='id' className={formStyle.input} type='text' />
                  <label htmlFor='id' className={formStyle.label}>ID</label>
                </div>
              </div>
            }

            {/* Nome */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => handleName(e)} value={currentProduct.name} id='name' className={formStyle.input} type='text' />
                <label htmlFor='name' className={formStyle.label}>Nome</label>
              </div>
            </div>

            {/* Categoria */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <select id="category" onChange={e => handleCategory(e)} className={formStyle.input} >
                  <option htmlFor='category' key={currentProduct.category.id} value={currentProduct.category.id}>{currentProduct.category.name}</option>
                  {
                    categorysData.map((item) => {
                      if (item.id == currentProduct.category.id) return; // não exibe a plataforma atual
                      return (
                        <option htmlFor='category' key={item.id} value={item.id}>{item.name}</option>
                      )
                    })
                  }
                </select>
                <label htmlFor='category' className={formStyle.label}>Categoria</label>
              </div>
            </div>

            {/* Preço de venda */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => handleSalePrice(e)} on value={currentProduct.sale_price} id='salePrice' className={formStyle.input} type='text' />
                <label htmlFor='salePrice' className={formStyle.label}>Preço de venda</label>
              </div>
            </div>

            {/* Preço de compra do lote mais recente */}
            {page == 'productsbyid' && <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required readOnly id='purchasePrice' value={purchasePrice} className={formStyle.input} type='text' />
                <label htmlFor='purchasePrice' className={formStyle.label}>Preço de compra</label>
              </div>
            </div>}

            {/* Lucro */}
            {page == 'productsbyid' && <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input readOnly required value={profitPorcent} id='profitPorcent' className={formStyle.input} type='text' />
                <label htmlFor='profitPorcent' className={formStyle.label}>% de Lucro</label>
              </div>
            </div>}

            {/* Estoque Físico */}
            {page == 'productsbyid' && <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input readOnly required value={currentProduct.quantity} id='quantity' className={formStyle.input} type='text' />
                <label htmlFor='quantity' className={formStyle.label}>Estoque Físico</label>
              </div>
            </div>}

            {/* Descrição */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <textarea required onChange={e => handleDescription(e)} value={currentProduct.description} id='description' className={formStyle.textArea} type='text' />
                <label htmlFor='description' className={formStyle.label}>Descrição</label>
              </div>
            </div>
          </div>
          <div className='flex w-full flex-col justify-center items-center'>
            <button type="submit" className='bg-green-600 flex justify-center font-semibold py-1 border border-zinc-500 text-lg w-6/12 text-center items-center rounded-lg hover:border-black hover:bg-green-700' >
              {page == 'createProduct' && 'Cadastrar'}
              {page == 'productsbyid' && 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductsById;
