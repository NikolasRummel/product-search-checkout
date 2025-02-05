"use client";

import {useEffect, useState} from "react";
import {checkout, deleteProduct, ProductCheckoutBill} from "@/lib/checkout";
import toast from "react-hot-toast";

const CheckoutBill = () => {

    const [bill, setBill] = useState<ProductCheckoutBill>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function loadBill() {
        setLoading(true);
        setError(null);

        try {
            const result = await checkout();
            setBill(result);
        } catch (err) {
            setError('Failed to fetch bill. Please try again.' + err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadBill()
    }, []);

    function handleDeleteClick(dan: string) {
        deleteProduct(dan).then(() => {
            toast.error('Successfully deleted');
        }).then(() => loadBill())
    }

    return (
        <>
            {loading && <p className="mt-4">Loading...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {!loading && (
                <div className="w-1/2">
                    <h2 className="text-xl font-bold mt-6 text-center">Checkout Cart</h2>
                    <ul className="mt-2">
                        {bill?.productCheckoutInformationList.map((item) => (
                            <li key={item.productName} className="flex justify-between border-b py-2 p-2">
                                <span>{item.count}</span>
                                <span>{item.productName}</span>
                                <span>{item.price}€</span>
                                <button
                                    type={"button"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDeleteClick(item.dan);
                                    }}
                                    className="text-red-500 hover:text-red-800 hover:bg-red-500 p-1 rounded"
                                >
                                    delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 font-bold text-center">
                        Total: {bill?.sum as number}€
                    </div>
                </div>
            )}
        </>
    )
}

export default CheckoutBill;