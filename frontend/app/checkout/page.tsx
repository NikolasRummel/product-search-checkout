import {checkout} from "@/lib/checkout";

export default async function Checkout() {

    const bill = await checkout();

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/2">
                <h2 className="text-xl font-bold mt-6 text-center">Checkout Cart</h2>
                <ul className="mt-2">
                    {bill?.productCheckoutInformationList.map((item) => (
                        <li key={item.productName} className="flex justify-between border-b py-2">
                            <span>{item.count}</span>
                            <span>{item.productName}</span>
                            <span>${item.price}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 font-bold text-center">
                    Total: {bill.sum}€
                </div>
            </div>
        </div>
    );
}
