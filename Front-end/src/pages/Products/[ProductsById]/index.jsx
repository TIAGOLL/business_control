

// ToDo
// [ ] - ID
// [ ] - Nome
// [ ] - Preço de venda
// [ ] - Quantidade
// [ ] - Preço de compra
// [ ] - % de lucro

function ProductsById() {

  const { id } = useParams();

  const [products, setProducts] = useState([]);

  axios.get(`http://localhost:3030/products/${id}`)
    .then(res => {
      return setProducts(res.data);
    })
    .catch(err => {
      console.log(err);
    });

  return (
    <div className="">
      {products}
    </div>
  );
}

export default ProductsById;
