import { ProductCard } from "../../components/products/productCard";
import { products } from "../utils/products";
import Image from "next/image";


const SavedProduct = () => {
    return ( 
        <div>
            <h1 className="font-bold text-2xl ittems-center text-center justify-center">Saved Product</h1>
            <Image
              src="https://img.freepik.com/free-photo/mexican-dishes-pepper_23-2147740824.jpg?t=st=1722748508~exp=1722752108~hmac=1724aab0600b04c8c7a769177d7392d67dfb8650772325ba5411dcb3bc07cb64&w=1380"
              alt=""
              width={100}
              height={100}
              className="w-full h-[308px]"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-14 mb-6">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} data={product} />
                ))
              ) : (
                <p>Loading products...</p>
              )}
            </div>
          </div>
     );
}
 
export default SavedProduct;