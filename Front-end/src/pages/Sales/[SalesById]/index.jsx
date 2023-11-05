import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { formStyle } from "../../../styles/global.css";
import { ArrowBigLeft } from "lucide-react";
import { ChangePage } from "../../../redux/features/activePage";

function ProductsById() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { page } = useSelector(state => state.page)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);

  function handleSubmit() {

  }
  useEffect(() => {
    if (id === 'create') {
      dispatch(ChangePage('createsale'));
      return
    }

    dispatch(ChangePage('salesbyid'));
    setLoading(false);
  }, [])

  return (
    <div className={formStyle.container}>
      <div className='flex flex-col items-center bg-zinc-100 w-4/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
        <div className='relative top-5 left-14 flex items-start justify-start w-full' >
          <a href={'/dashboard/sales'}>
            <ArrowBigLeft width={30} height={30} />
          </a>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='p-0 m-0 font-semibold'>
            {page === 'createsale' && 'Cadastrar venda'}
            {page === 'salesbyid' && 'Editar venda'}
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full gap-8 flex-col flex">
          <div className='flex w-full flex-col px-14 justify-center items-center gap-8'>
            {/* inputs */}
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
