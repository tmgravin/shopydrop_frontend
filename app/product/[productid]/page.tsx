
import { product } from '@/app/utils/product';
import { Container } from './../../component/Container';
import ProductDetails from './productDetails';
import ListRating from './ListRating';
import { products } from '@/app/utils/products';

interface IPrams{
  productid?:string
}

export const Product= ({params }: {params:IPrams}) => {
  console.log("params",params);
  const product = products.find((item)=>item.id===params.productid);
  return (
    <div >


      <Container >
        <div>
        <ProductDetails product={product}/>
        <ListRating product={product}/></div> 
      <div className='flex flex-col mt-20 gap-4'>
      </div>
      </Container>
    
     </div>
  )
}
export default Product;