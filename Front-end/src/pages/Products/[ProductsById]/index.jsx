import axios from "axios";
import { ArrowBigLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formStyle } from "../../../styles/global.css";
import { useDispatch, useSelector } from "react-redux";
import { ChangePage } from "../../../redux/features/activePage";
import { toast } from "react-toastify";


// ToDo
// [ X ] - ID
// [ X ] - Nome
// [ X ] - Quantidade
// [ X ] - Categoria
// [   ] - Preço de venda
// [   ] - Preço de compra
// [   ] - % de lucro

function ProductsById() {

  const { id } = useParams();
  const dispatch = useDispatch();

  const { page } = useSelector(state => state.page)

  const [productId, setProductId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [profitPorcent, setProfitPorcent] = useState('');
  const [description, setDescription] = useState('');

  const [currentCategory, setCurrentCategory] = useState('');

  const [categorysData, setCategorysData] = useState([]);

  async function loadProducts() {
    await axios.get(`http://localhost:3030/products/${id}`)
      .then(res => {
        setProductId(res.data.id);
        setName(res.data.name);
        setQuantity(res.data.quantity);
        setCategoryId(res.data.category_id);
        setDescription(res.data.description);
        setCurrentCategory(res.data.category.name);
        setSalePrice(res.data.sale_price);
        setProfitPorcent(res.data.profit_porcent);
      })  
      .catch(err => {
        console.log(err);
      })
  }

  async function loadCategorys() {

    await axios.get(`http://localhost:3030/categorys`)
      .then(res => {
        setCategorysData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (page === 'createProduct') {
      toast('Produto cadastrado com sucesso!')
      createProduct()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    } else if (page === 'productsbyid') {
      updateProduct()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }

    async function updateProduct() {
      await axios.put(`http://localhost:3030/products/${id}`, {
        where: {
          id: id
        },
        data: {
          name: name,
          quantity: quantity,
          category_id: categoryId,
          description: description,
          sale_price: salePrice,
          profit_porcent: profitPorcent
        }
      })
        .then(res => {
          console.log(res.message);
        })
        .catch(err => {
          console.log(err);
        });
    }

    async function createProduct() {
      await axios.post(`http://localhost:3030/products`, {
        name: name,
        quantity: quantity,
        category_id: categoryId,
        description: description,
        sale_price: salePrice,
        profit_porcent: profitPorcent
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
    loadProducts();
    loadCategorys();
    if (id === 'create') {
      dispatch(ChangePage('createProduct'));
    }
    else {
      dispatch(ChangePage('productsbyid'));
    }

  }, []);

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
            {page === 'createProduct' &&
              <div className='flex flex-col w-full'>
                <div className='flex relative w-full space-x-2 items-center justify-center'>
                  <input readOnly required onChange={e => setProductId(e.target.value)} value={productId} id='id' className={formStyle.input} type='text' />
                  <label htmlFor='id' className={formStyle.label}>ID</label>
                </div>
              </div>
            }

            {/* Nome */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setName(e.target.value)} value={name} id='name' className={formStyle.input} type='text' />
                <label htmlFor='name' className={formStyle.label}>Nome</label>
              </div>
            </div>

            {/* Categoria */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <select id="category" onChange={e => setCategoryId(e.target.value)} className={formStyle.input} >
                  <option htmlFor='category' key={categoryId} value={categoryId}>{currentCategory}</option>
                  {
                    categorysData.map((item) => {
                      if (item.id == categoryId) return; // Não renderizar a categoria atual
                      return (
                        <option htmlFor='category' key={item.id} value={item.id}>{item.name}</option>
                      )
                    })
                  }
                </select>
                <label htmlFor='category' className={formStyle.label}>Categoria</label>
              </div>
            </div>

            {/* Quantidade */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setQuantity(e.target.value)} value={quantity} id='quantity' className={formStyle.input} type='text' />
                <label htmlFor='quantity' className={formStyle.label}>Quantidade</label>
              </div>
            </div>

            {/* Preço de compra do lote mais antigo */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required id='purchasePrice' onChange={e => setPurchasePrice(e.target.value)} className={formStyle.input} type='text' />
                <label htmlFor='purchasePrice' className={formStyle.label}>Preço de compra</label>
              </div>
            </div>

            {/* Preço de venda */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setSalePrice(e.target.value)} value={salePrice} id='salePrice' className={formStyle.input} type='text' />
                <label htmlFor='salePrice' className={formStyle.label}>Preço de venda</label>
              </div>
            </div>

            {/* Lucro */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setProfitPorcent(e.target.value)} value={profitPorcent} id='profitPorcent' className={formStyle.input} type='text' />
                <label htmlFor='profitPorcent' className={formStyle.label}>% de Lucro</label>
              </div>
            </div>

            {/* Descrição */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <textarea required onChange={e => setDescription(e.target.value)} value={description} id='description' className={formStyle.textArea} type='text' />
                <label htmlFor='description' className={formStyle.label}>Descrição</label>
              </div>
            </div>
          </div>
          <div className='flex w-full flex-col justify-center items-center'>
            <button type="submit" className='bg-green-600 flex justify-center font-semibold py-1 border border-zinc-500 text-lg w-6/12 text-center items-center rounded-lg hover:border-black hover:bg-green-700' >
              {page == 'createProduct' && 'Cadastrar'}
              {page == 'productsbyid' && 'Editar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductsById;
