import { CardElement } from "@stripe/react-stripe-js";

export default function TarjetaForm() {
    return (
        <div className="bg-white border rounded-2xl p-5 flex flex-col gap-4">
            <h3 className="font-bold text-lg">Datos de tarjeta</h3>
            <div className="border rounded-xl px-4 py-3 bg-gray-50">
                <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
            </div>
        </div>
    );
}