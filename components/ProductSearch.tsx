"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dialog } from "./ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface Product {
  code: string;
  product_name: string;
  image_url?: string;
}

interface ProductSearchProps {
  imageSrcs: string[];
  setImageSrcs: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProductSearch: React.FC<ProductSearchProps> = ({
  imageSrcs,
  setImageSrcs,
}) => {
  const [query, setQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://world.openfoodfacts.org/cgi/search.pl",
        {
          params: {
            search_terms: query,
            search_simple: 1,
            action: "process",
            json: 1,
          },
        }
      );
      if (response.data.products.length === 0) {
        setError("No products found.");
      } else {
        setProducts(response.data.products);
      }
    } catch (error) {
      setError("Error fetching products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = (product: Product) => {
    setSavedProducts((prevSaved) => {
      const isProductSaved = prevSaved.some((p) => p.code === product.code);
      return isProductSaved
        ? prevSaved.filter((p) => p.code !== product.code)
        : [...prevSaved, product];
    });
  };

  const handleRemoveSavedProduct = (code: string) => {
    setSavedProducts((prevSaved) =>
      prevSaved.filter((product) => product.code !== code)
    );
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5 py-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products"
          aria-label="Search for products"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <div>
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <h2 className="pb-2 font-semibold">Products</h2>
      <ul>
        <div className="grid grid-cols-4 h-60 overflow-auto gap-2 pr-2 ">
          {products.map((product) => {
            const isSaved = savedProducts.some((p) => p.code === product.code);
            return (
              <li
                key={product.code}
                className="relative w-full h-24 sm:h-32 cursor-pointer"
                onClick={() => handleSaveProduct(product)}
              >
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.product_name}
                    fill
                    style={{ objectFit: "contain" }}
                    className="hover:scale-105 transition-all duration-300 p-2 border-2 hover:bg-secondary rounded-xl"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200">
                    <p className="text-sm text-gray-500">No Image</p>
                  </div>
                )}
                {isSaved && (
                  <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm">
                    <FaCheckCircle className="h-full w-1/4 text-green-600" />
                  </div>
                )}
              </li>
            );
          })}
        </div>
      </ul>
      <h2 className="font-semibold py-2">Saved Products</h2>
      <ul className="w-full">
        <div className="flex items-center gap-2 overflow-x-auto w-[80vw] min-[580px]:w-[26rem] h-28">
          {savedProducts.map((product) => (
            <li
              key={product.code}
              className="relative h-16 sm:h-20 w-20 flex-shrink-0"
            >
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.product_name}
                  fill
                  style={{ objectFit: "contain" }}
                  className="p-2 border-2 hover:bg-secondary rounded-xl"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200">
                  <p className="text-sm text-gray-500">No Image</p>
                </div>
              )}
              <button
                className="absolute top-2 right-2 bg-primary rounded-full p-2 text-white z-10 hover:bg-red-700 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveSavedProduct(product.code);
                }}
              >
                {" "}
                <FaTimes className="  text-xs" />
              </button>
            </li>
          ))}
        </div>
      </ul>
      <div className="flex justify-end pt-4">
        <DialogPrimitive.Close>
          <Button
            className="w-24"
            onClick={() =>
              setImageSrcs([
                ...imageSrcs,
                ...savedProducts.map((product) => product.image_url || ""),
              ])
            }
          >
            Upload
          </Button>
        </DialogPrimitive.Close>
      </div>
    </div>
  );
};

export default ProductSearch;
