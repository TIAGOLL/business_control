import axios from "axios";
import { ArrowBigLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formStyle } from "../../styles/global.css";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Oval } from 'svg-loaders-react';
import { storage } from "../../services/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


function ProductsCreate() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);

  const [categorysData, setCategorysData] = useState([]);

  // Forms handler
  //products
  const [prodName, setProdName] = useState();
  const [prodSalePrice, setProdSalePrice] = useState();
  const [prodPhoto, setProdPhoto] = useState();
  const [prodPhotoUrl, setProdPhotoUrl] = useState('');
  const [prodColor, setProdColor] = useState();

  //category
  const [currentCategoryId, setCurrentCategoryId] = useState()

  // accessories
  const [currentAccessories, setCurrentAccessories] = useState([]);

  // funcionalities
  const [currentFuncionalities, setCurrentFuncionalities] = useState([]);

  async function loadData() {
    await axios.get(`${import.meta.env.VITE_REACT_BASE_API_URL}/api/products/load/ofcreate`)
      .then(res => {
        setCategorysData(res.data.categories)
      })
      .catch(err => {
        console.log(err.message);
        toast.error('Erro ao carregar produto')
      })
      .finally(() => {
        setLoading(false);
      })
  }

  async function createProduct(e) {
    e.preventDefault();

    setLoading(true);

    const uploadRef = ref(storage, `photos/products/${prodName}/${prodColor}`)

    await uploadBytes(uploadRef, prodPhoto)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          await axios.post(`${import.meta.env.VITE_REACT_BASE_API_URL}/api/products/post`, {
            data: {
              name: prodName,
              category_id: currentCategoryId,
              sale_price: prodSalePrice,
              photo_url: downloadURL,
              color: prodColor,
              prod_accessories: currentAccessories,
              prod_functionalities: currentFuncionalities,
            }
          })
            .then(res => {
              console.log(res.data);
              toast.success(res.data.message);
              navigate('/dashboard/products');
            })
            .catch(err => {
              console.log(err.message);
              toast.error('Erro ao criar produto');
            })
        })
      })
      .catch((error) => {
        console.log(error.message)
        toast.error("Erro ao atualizar!")
      })
  }

  function handleProductPhoto(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/webp') {
        setProdPhoto(image)
        setProdPhotoUrl(URL.createObjectURL(image))
      } else {
        toast.error("Envie uma imagem do tipo PNG ou JPEG")
        setProdPhoto(null);
        return;
      }
    }
  }

  function handleAccessories(e, index) {
    const { value } = e.target;
    currentAccessories[index].name = value;
    setCurrentAccessories([...currentAccessories]);
  }

  function handleFunctionalities(e, index) {
    const { value } = e.target;
    currentFuncionalities[index].description = value;
    setCurrentFuncionalities([...currentFuncionalities]);
  }

  function addAccessory(e) {
    e.preventDefault();

    //Não adiciona mais produtos se o ultimo produto adicionado não tiver sido selecionado
    if (currentAccessories.map((item) => item.name).includes('')) return toast.error('Preencha todos os campos do acessório antes de adicionar outra!');

    setCurrentAccessories([...currentAccessories, {
      name: '',
    }]);
  }

  function addFuncionality(e) {
    e.preventDefault();

    //Não adiciona mais produtos se o ultimo produto adicionado não tiver sido selecionado
    if (currentFuncionalities.map((item) => item.description).includes('')) return toast.error('Preencha todos os campos da funcionalidade antes de adicionar outra!');

    setCurrentFuncionalities([...currentFuncionalities, {
      description: '',
    }]);
  }

  function deleteAccessory(e, index) {
    e.preventDefault();
    currentAccessories.splice(index, 1);
    setCurrentAccessories([...currentAccessories]);
  }

  function deleteFuncionality(e, index) {
    e.preventDefault();
    currentFuncionalities.splice(index, 1);
    setCurrentFuncionalities([...currentFuncionalities]);
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className={formStyle.container}>
        <div className='flex flex-col items-center bg-zinc-100 w-10/12 my-10 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
          <div className='relative top-5 left-14 flex items-start justify-start w-full' >
            <a href={'/dashboard/products'}>
              <ArrowBigLeft width={30} height={30} />
            </a>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='font-semibold'>Cadastrar produto</h1>
          </div>
          <div className="w-full gap-8 flex-col flex items-center justify-center">
            <Oval width={100} height={100} stroke="black" />
          </div>
        </div >
      </div >
    );
  }

  return (
    <div className={formStyle.container}>
      <div className='flex flex-col items-center bg-zinc-100 w-10/12 my-10 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
        <div className='relative top-5 left-14 flex items-start justify-start w-full' >
          <a href={'/dashboard/products'}>
            <ArrowBigLeft width={30} height={30} />
          </a>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='font-semibold'>Cadastrar produto</h1>
        </div>
        <form className="w-full gap-8 flex-col flex items-center justify-center">
          <div className='flex w-full flex-wrap px-14 justify-center items-center gap-8'>

            {/* Foto */}
            <div className='flex flex-col w-3/12'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input accept="image/*" onChange={handleProductPhoto} id='upload' className={formStyle.input} type="file" />
                <label htmlFor='upload' className={formStyle.label}>Foto</label>
              </div>
            </div>

            {/* Nome */}
            <div className='flex flex-col w-3/12'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setProdName(e.target.value)} value={prodName} id='name' className={formStyle.input} type='text' />
                <label htmlFor='name' className={formStyle.label}>Nome</label>
              </div>
            </div>

            {/* Cor */}
            <div className='flex flex-col w-5/12'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setProdColor(e.target.value.toUpperCase())} value={prodColor} id='color' className={formStyle.input} type='text' />
                <label htmlFor='color' className={formStyle.label}>Cor</label>
              </div>
            </div>

            {/* Categoria */}
            <div className='flex flex-col w-3/12'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <select id="category" onChange={e => setCurrentCategoryId(e.target.value)} className={formStyle.input} >
                  <option htmlFor="category" disabled selected hidden value={''}>Selecione</option>
                  {
                    categorysData.map((item) => {
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
            <div className='flex flex-col w-3/12'>
              <div className='flex relative w-full space-x-2 items-center justify-center'>
                <input required onChange={e => setProdSalePrice(e.target.value)} value={prodSalePrice} id='salePrice' className={formStyle.input} type='text' />
                <label htmlFor='salePrice' className={formStyle.label}>Preço de venda</label>
              </div>
            </div>

            {/* Accessories */}
            <div className="flex w-full flex-col px-14 justify-center items-center gap-8 border-2 border-zinc-400 rounded-xl">
              <h1>Acessórios</h1>
              <div className="flex w-full flex-wrap justify-center items-center gap-8 ">
                {
                  currentAccessories.map((item, index) => {
                    return (
                      <div className="flex flex-row w-2/12 items-center justify-center" key={item.id}>
                        <div className='flex flex-col w-full'>
                          <div className='flex relative w-full items-center justify-center'>
                            <input required onChange={e => handleAccessories(e, index)} value={item.name} id={`${index}`} className={formStyle.input + ' !rounded-r-none'} type='text' />
                            <label htmlFor={`${index}`} className={formStyle.label}>{`Acessório ${index + 1}`}</label>
                          </div>
                        </div>
                        <div className='flex relative items-center justify-start h-10'>
                          <button className={formStyle.redButton + ' !w-10 !h-full !rounded-l-none'} onClick={e => deleteAccessory(e, index)}><Trash2 width={20} height={20} color="white" /></button>
                        </div>
                      </div>
                    )
                  })
                }
                {/* Add accessory */}
                <div className='flex w-full flex-col justify-center items-center mb-8'>
                  <button onClick={addAccessory} className={formStyle.blueButton + ' !w-1/12'} >
                    <Plus />
                  </button>
                </div>
              </div>
            </div>

            {/* Funcionalities */}
            <div className="flex w-full flex-col justify-center items-center gap-8 border-2 border-zinc-400 rounded-xl">
              <h1>Funcionalidades</h1>
              <div className="flex w-full flex-wrap justify-center items-center gap-8">
                {
                  currentFuncionalities.map((item, index) => {
                    return (
                      <div className="flex flex-row w-5/12 h-full items-center justify-center p-2" key={item.id}>
                        <div className='flex flex-col w-full'>
                          <div className='flex relative w-full items-center justify-center h-24'>
                            <textarea required onChange={e => handleFunctionalities(e, index)} value={item.description} id={`${index}`} className={formStyle.input + ' !rounded-r-none !p-2 !h-full'} type='text' />
                            <label htmlFor={`${index}`} className={formStyle.label}>{`Funcionalidade ${index + 1}`}</label>
                          </div>
                        </div>
                        <div className='flex relative items-center justify-center h-24'>
                          <button className={formStyle.redButton + ' !w-10 !h-full !rounded-l-none'} onClick={e => deleteFuncionality(e, index)}><Trash2 width={20} height={20} color="white" /></button>
                        </div>
                      </div>
                    )
                  })
                }

                {/* Add funcionality */}
                <div className='flex w-full flex-col justify-center items-center mb-8'>
                  <button onClick={addFuncionality} className={formStyle.blueButton + ' !w-1/12'} >
                    <Plus />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='flex w-4/12 flex-col justify-center items-center'>
            <button onClick={(e) => createProduct(e)} className={formStyle.greenButton} >
              Salvar
            </button>
          </div>
        </form>
      </div >
    </div >
  );
}

export default ProductsCreate;
