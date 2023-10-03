import axios from "axios";
import { ArrowBigLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formStyle } from "../../../styles/global.css";
import { Fingerprint } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { ChangePage } from "../../../redux/slices/activePage";
import { toast } from "react-toastify";


// ToDo
// [ ] - ID
// [ X ] - Nome
// [ X ] - Preço de venda
// [ X ] - Quantidade
// [ X ] - Preço de compra
// [   ] - % de lucro
// [ X ] - Categoria

function ProductsById() {

  const { id } = useParams();

  const { page } = useSelector(state => state.page)
  const dispatch = useDispatch();

  const [idProduto, setIdProduto] = useState('');
  const [nome, setNome] = useState('');
  const [preco_compra, setPrecoCompra] = useState('');
  const [preco_venda, setPrecoVenda] = useState('');
  const [qtd, setQtd] = useState('');
  const [porcent_lucro, setPorcentLucro] = useState('');
  const [categoria, setCategoria] = useState('');


  const [categoriasData, setCategoriasData] = useState([]);

  async function loadProducts() {
    axios.get(`http://localhost:3030/products/${id}`)
      .then(res => {
        setIdProduto(res.data.id);
        setNome(res.data.nome);
        setPrecoCompra(res.data.preco_compra);
        setPrecoVenda(res.data.preco_venda);
        setQtd(res.data.qtd);
        setPorcentLucro(res.data.porcent_lucro);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function loadCategorias() {
    axios.get(`http://localhost:3030/categories`)
      .then(res => {
        setCategoriasData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
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
    } else {
      updateProduct()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }


    async function updateProduct() {
      axios.put(`http://localhost:3030/products/${id}`, {
        where: {
          id: idProduto
        },
        nome: nome,
        preco_compra: preco_compra,
        preco_venda: preco_venda,
        qtd: qtd,
        porcent_lucro: porcent_lucro,
      })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }

    async function createProduct() {
      const list = {
        nome: nome,
        preco_compra: preco_compra,
        preco_venda: preco_venda,
        qtd: qtd,
        porcent_lucro: porcent_lucro,
      }

      console.log(list)
      axios.post(`http://localhost:3030/products`, list)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    loadProducts();
    loadCategorias();
    if (id === 'create') {
      dispatch(ChangePage('createProduct'));
    }
    else {
      dispatch(ChangePage('productsbyid'));
    }
    toast('Produto cadastrado com sucesso!')

  }, []);

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-zinc-400'>
      <div className='flex flex-col items-center bg-zinc-100 w-4/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
        <div className='relative top-5 left-14 flex items-start justify-start w-full' >
          <a href={'/dashboard/products'}>
            <ArrowBigLeft width={30} height={30} />
          </a>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='p-0 m-0 font-semibold'>{page === 'createProduct' ? 'Cadastrar produto' : 'Editar produto'}</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full gap-8 flex-col flex">
          <div className='flex w-full flex-col px-14 justify-center items-center gap-8'>

            {page === 'createProduct' ? null :
              // ID
              <div className='flex flex-col w-full'>
                <div className='flex relative w-full space-x-2 items-center justify-center'>
                  <input readOnly required onChange={e => setIdProduto(e.target.value)} value={idProduto} id='id' className={formStyle.input} type='text' />
                  <label htmlFor='id' className={formStyle.label}>ID</label>
                </div>
              </div>
            }

            {/* Nome */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setNome(e.target.value)} value={nome} id='name' className={formStyle.input} type='text' />
                <label htmlFor='name' className={formStyle.label}>Nome</label>
              </div>
            </div>

            {/* Categoria */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <select id="categorie" onChange={e => setCategoria(e.target.value)} className={formStyle.input} >
                  <option htmlFor='categorie' value=""></option>
                  {
                    categoriasData.map((item) => {
                      return (
                        <option htmlFor='categorie' key={item.id} value={item.nome}>{item.nome}</option>
                      )
                    })
                  }
                </select>
                <label htmlFor='categoria' className={formStyle.label}>Categoria</label>
              </div>
            </div>

            {/* Quantidade */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setQtd(e.target.value)} value={qtd} id='quantidade' className={formStyle.input} type='text' />
                <label htmlFor='quantidade' className={formStyle.label}>Quantidade</label>
              </div>
            </div>

            {/* Preço compra */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setPrecoCompra(e.target.value)} value={preco_compra} id='precocompra' className={formStyle.input} type='text' />
                <label htmlFor='precocompra' className={formStyle.label}>Preço de compra</label>
              </div>
            </div>

            {/* Preço de venda */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setPrecoVenda(e.target.value)} value={preco_venda} id='precovenda' className={formStyle.input} type='text' />
                <label htmlFor='precovenda' className={formStyle.label}>Preço de venda</label>
              </div>
            </div>

            {/* Lucro */}
            <div className='flex flex-col w-full'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setPorcentLucro(e.target.value)} value={porcent_lucro} id='lucro' className={formStyle.input} type='text' />
                <label htmlFor='lucro' className={formStyle.label}>% de Lucro</label>
              </div>
            </div>
          </div>
          <div className='flex w-full flex-col justify-center items-center'>
            <button type="submit" className='bg-green-600 flex justify-center font-semibold py-1 border border-zinc-500 text-lg w-6/12 text-center items-center rounded-lg hover:border-black hover:bg-green-700' >
              {page === 'createProduct' ? 'Cadastrar' : 'Editar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductsById;
