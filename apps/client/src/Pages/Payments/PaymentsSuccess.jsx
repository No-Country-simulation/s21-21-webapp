import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Button from "../../Components/Button";

export const PaymentsSuccess = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = localStorage.getItem("lastOrder");
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
      localStorage.removeItem("lastOrder"); // Eliminar después de cargar
    }
  }, []);

  if (!order) {
    return <p>Cargando detalles de la orden...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 w-full flex flex-col items-center">
        <div className="bg-white p-6 rounded-lg shadow-card max-w-3xl w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">
            ¡Pago Exitoso!
          </h2>
          <p className="text-center ">
            Gracias por tu compra. Aquí están los detalles de tu orden:
          </p>
          <div className="mb-4">
            {order.OrderItem.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center space-x-4 my-4"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  width={150}
                  className="rounded-lg shadow-card mb-5 md:mb-0"
                />
                <div className="flex flex-col space-y-4 ">
                  <p>
                    <strong>Película:</strong> {item.title}
                  </p>
                  <p>
                    <strong>Cantidad:</strong> {item.quantity} entrada(s)
                  </p>
                  <p>
                    <strong>Precio:</strong> ${item.price} ARS
                  </p>
                </div>
              </div>
            ))}

            <Button onClick={() => navigate("/")} className="w-full">
              Volver al inicio
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
