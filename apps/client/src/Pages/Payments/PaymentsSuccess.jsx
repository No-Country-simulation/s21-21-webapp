import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

export const PaymentsSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Obtener los detalles de la orden desde la URL o el estado de la navegación
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get("orderId");

    if (orderId) {
      // Obtener los detalles de la orden desde el backend
      fetchOrderDetails(orderId);
    } else {
      // Si no hay orderId, redirigir al inicio
      navigate("/");
    }
  }, [location, navigate]);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await fetchData(`/orders/${orderId}`, "GET");
      if (!response.ok) {
        throw new Error("Error al obtener los detalles de la orden");
      }
      const data = await response.json();
      setOrderDetails(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al cargar los detalles de la orden");
    }
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col items-center p-4 bg-cover bg-center bg-no-repeat" 
           style={{ backgroundImage: "url('/cinema-seats-still-life.jpg')" }}>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
          <h2 className="text-2xl font-bold mb-4">Compra realizada exitosamente</h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium">{orderDetails.movie?.title}</h3>
            <p>Fecha: {new Date(orderDetails.schedule).toLocaleDateString()}</p>
            <p>Hora: {new Date(orderDetails.schedule).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            <p>Sala: {orderDetails.hall?.name}</p>
          </div>
          <div className="mb-4">
            <p>Asientos seleccionados: {orderDetails.selectedSeats?.map(s => `${s.row}${s.number}`).join(', ')}</p>
            <p>Total pagado: ${orderDetails.totalAmount?.toFixed(2)}</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
          >
            Volver al inicio
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};