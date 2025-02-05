"use client";
import {useState} from 'react';
import {searchProduct, ProductInformation, ProductSearchResponse} from '@/lib/productSearch';
import Image from "next/image";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {addProductToCart} from "@/lib/checkout";

const ProductSearch: React.FC = () => {
    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [products, setProducts] = useState<ProductInformation[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const result: ProductSearchResponse = await searchProduct(searchTerm);
            setProducts(result.products);
        } catch (err) {
            setError('Failed to fetch products. Please try again.' + err);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (product: ProductInformation) => {
        addProductToCart(product).then(() => {
            toast.success('Added ' + product.name);
        })
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Product Search</h1>
            <div className={"w-full space-x-2"}>
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 p-2 rounded mb-4 w-96 "
                />

                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Search
                </button>
                <button
                    type="button"
                    onClick={() => router.push('/checkout')}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Go to Checkout
                </button>
            </div>

            {loading && <p className="mt-4">Loading...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {products.map(product => (
                    <div key={product.gtin} className="border border-gray-300 p-4 rounded shadow relative">
                        <button
                            type={"button"}
                            onClick={() => addToCart(product)}
                            className="w-10 h-10 absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 pl-2"
                        >
                            +
                        </button>
                        <div className="flex flex-col items-center mr-10">
                            <h2 className="text-xl font-semibold text-center">{product.name}</h2>
                            <p className="text-gray-600 text-center">{product.brandName}</p>
                            <p className="text-gray-600 text-center">{product.price.formattedValue}</p>
                            <div className="w-[50px] mb-2">
                                <Image
                                    width={40}
                                    height={100}
                                    src={product.imageUrlTemplates[0].replace("{transformations}", "")}
                                    alt={"Produktimage"}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSearch;
