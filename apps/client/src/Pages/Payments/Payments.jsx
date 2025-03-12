import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { fetchData } from "../../utils/fetchData";

export const Payment = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentInProgress, setPaymentInProgress] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetchData(`/orders/${orderId}`, "GET");
        
        if (!response.ok) {
          throw new Error(`Error al cargar los detalles de la orden: ${response.status}`);
        }
        
        const data = await response.json();
        setOrderDetails(data);
      } catch (err) {
        console.error("Error al cargar detalles de la orden:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const handlePayment = async () => {
    try {
      setPaymentInProgress(true);
      
      // Solicitar sesión de pago
      const paymentSessionResponse = await fetchData(`/api/orders/${orderId}/payment-session`, "POST");
      
      if (!paymentSessionResponse.ok) {
        throw new Error("Error al generar la sesión de pago");
      }
      
      const sessionData = await paymentSessionResponse.json();
      
      // Redireccionar al usuario a la página de pago (podría ser Stripe u otro servicio)
      window.location.href = sessionData.url;
      
    } catch (err) {
      console.error("Error al procesar el pago:", err);
      setError(err.message);
      setPaymentInProgress(false);
    }
  };

  const handleCancel = async () => {
    try {
      const response = await fetchData(`/api/orders/${orderId}/cancel`, "POST");
      
      if (!response.ok) {
        throw new Error("Error al cancelar la orden");
      }
      
      // Redirigir al usuario a la página principal o de películas
      navigate("/movies");
      
    } catch (err) {
      console.error("Error al cancelar la orden:", err);
      setError(err.message);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-100 p-4 rounded-md text-red-700">
        {error}. <button onClick={() => navigate(-1)} className="underline">Volver atrás</button>
      </div>
    </div>
  );

  if (!orderDetails) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-yellow-100 p-4 rounded-md text-yellow-800">
        No se encontraron detalles de la orden. <button onClick={() => navigate("/movies")} className="underline">Explorar películas</button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6 text-center">Resumen de la Orden</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Detalles de la compra</h2>
            
            {orderDetails.OrderItem.map((item, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-medium">{item.title}</h3>
                <div className="flex justify-between mb-1">
                  <span>Cantidad:</span>
                  <span>{item.quantity} {item.quantity > 1 ? 'asientos' : 'asiento'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Precio:</span>
                  <span>${(item.price).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-b py-4 mb-6">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${orderDetails.totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={handlePayment}
              disabled={paymentInProgress}
              className={`flex-1 py-3 rounded ${
                paymentInProgress 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {paymentInProgress ? 'Procesando...' : 'Proceder al pago'}
            </button>
            
            <button
              onClick={handleCancel}
              disabled={paymentInProgress}
              className="flex-1 py-3 rounded border border-red-600 text-red-600 hover:bg-red-50"
            >
              Cancelar compra
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
