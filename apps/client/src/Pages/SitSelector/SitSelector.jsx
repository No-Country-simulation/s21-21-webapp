import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { useScreenings } from "../../Hooks/useMovies";
import { fetchData } from "../../utils/fetchData";
import useAuthStore from "../../store/authStore"; // Importar el authStore

export const SitSelector = () => {
  const { screeningId } = useParams();

  // Obtener detalles de la proyección
  const {
    data: screening,
    isLoading: isLoadingScreening,
    isError: isErrorScreening,
  } = useScreenings(screeningId);

  // Estados para manejar asientos y selección
  const [availableSeats, setAvailableSeats] = useState([]);
  const [seatsGrid, setSeatsGrid] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [uniqueRows, setUniqueRows] = useState([]);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  // Obtener el userId desde el authStore
  const userId = useAuthStore((state) => state.user?.id);

  // Cargar los asientos disponibles para la proyección específica
  useEffect(() => {
    const fetchAvailableSeats = async () => {
      if (!screeningId) return;

      try {
        setIsLoading(true);
        const response = await fetchData(
          `/seats/available/${screeningId}`,
          "GET"
        );

        if (!response.ok) {
          throw new Error(`Error al cargar asientos: ${response.status}`);
        }

        const data = await response.json();
        // Marcar los asientos ocupados con el estado "occupied"
        const seatsWithStatus = data.map((seat) => {
          if (seat.isOccupied) {
            // Asegúrate de que el backend devuelva un campo isOccupied
            return { ...seat, status: "occupied" };
          } else {
            return { ...seat, status: "available" };
          }
        });

        setAvailableSeats(seatsWithStatus);
      } catch (err) {
        console.error("Error al cargar asientos disponibles:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableSeats();
  }, [screeningId]);

  useEffect(() => {
    if (screening && selectedSeats.length > 0) {
      // Calcular el total sumando el precio de cada asiento seleccionado
      const total = selectedSeats.reduce(
        (acc, seat) => acc + screening.price,
        0
      );
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [selectedSeats, screening]);

  useEffect(() => {
    if (!availableSeats.length || !screening) return;

    try {
      // Encontrar las filas únicas y ordenarlas
      const rows = [...new Set(availableSeats.map((seat) => seat.row))].sort();
      setUniqueRows(rows); // Guardar las filas únicas en el estado

      // Encontrar el número máximo de asientos en cualquier fila
      const maxSeatsPerRow = Math.max(
        ...rows.map((row) => {
          return availableSeats.filter((seat) => seat.row === row).length;
        })
      );

      // Crear grid de asientos con el número máximo de asientos por fila
      const grid = rows.map((row) => {
        // Filtrar asientos de la fila actual
        const rowSeats = availableSeats.filter((seat) => seat.row === row);

        // Crear un array con el número máximo de asientos por fila
        const seats = Array.from({ length: maxSeatsPerRow }, (_, index) => {
          const seat = rowSeats.find((s) => s.number === index + 1);
          if (seat) {
            // Si el asiento está ocupado, marcarlo como "occupied"
            return { ...seat, status: seat.status || "available" };
          } else {
            // Si no hay asiento en esta posición, devolver null
            return null;
          }
        });

        return seats;
      });

      setSeatsGrid(grid);
    } catch (err) {
      console.error("Error al procesar asientos:", err);
      setError("Error al procesar la configuración de asientos");
    }
  }, [availableSeats, screening]);

  // Manejar selección de asiento
  const toggleSeat = (seat) => {
    if (!seat || seat.status === "occupied") return;

    setSelectedSeats((prev) => {
      const isSelected = prev.some((s) => s.id === seat.id);

      if (isSelected) {
        return prev.filter((s) => s.id !== seat.id);
      } else {
        return [...prev, seat];
      }
    });
  };

  // Crear una reserva con los asientos seleccionados
  const handlePurchase = async () => {
    if (!userId) {
      alert("Por favor inicie sesión para realizar la compra");
      return;
    }

    try {
      const orderData = {
        items: [
          {
            productId: screeningId,
            seatIds: selectedSeats.map((seat) => seat.id),
          },
        ],
        buyerUserId: userId, // Usar el userId autenticado
      };

      const response = await fetchData(
        "/orders/create-order",
        "POST",
        orderData
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al procesar la compra");
      }

      const { order, paymentSession } = await response.json();

      console.log("Orden creada:", order);
      console.log("Sesión de pago:", paymentSession);

      // Guardar datos en localStorage
      localStorage.setItem("lastOrder", JSON.stringify(order));

      // Redirigir al usuario a la página de pago de Stripe
      window.location.href = paymentSession.url;
    } catch (err) {
      console.error("Error en la compra:", err);
      alert(`Error: ${err.message}`);
    }
  };

  if (isLoadingScreening || isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (isErrorScreening || error || !screening)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 p-4 rounded-md text-red-700">
          Error al cargar los datos. Por favor intente nuevamente.
        </div>
      </div>
    );

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen w-full flex flex-col items-center p-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/cinema-seats-still-life.jpg')" }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
          {purchaseCompleted ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Compra realizada exitosamente
              </h2>
              <div className="mb-4">
                <h3 className="text-lg font-medium">
                  {screening.movie?.title}
                </h3>
                <p>
                  Fecha: {new Date(screening.schedule).toLocaleDateString()}
                </p>
                <p>
                  Hora:{" "}
                  {new Date(screening.schedule).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>Sala: {screening.hall?.name}</p>
              </div>
              <div className="mb-4">
                <p>
                  Asientos seleccionados:{" "}
                  {selectedSeats.map((s) => `${s.row}${s.number}`).join(", ")}
                </p>
                <p>Total pagado: ${totalPrice.toFixed(2)}</p>
              </div>
              <button
                onClick={() => setPurchaseCompleted(false)}
                className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
              >
                Volver a la selección de asientos
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Selección de Asientos</h2>

              <div className="mb-4">
                <h3 className="text-lg font-medium">
                  {screening.movie?.title}
                </h3>
                <p>
                  Fecha: {new Date(screening.schedule).toLocaleDateString()}
                </p>
                <p>
                  Hora:{" "}
                  {new Date(screening.schedule).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>Sala: {screening.hall?.name}</p>
                <p>Precio por asiento: ${screening.price.toFixed(2)}</p>
              </div>

              <div className="flex flex-col md:flex-row space-x-4 mb-4">
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-btn-primary inline-block mr-2"></span>{" "}
                  Disponible
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-gray-400 inline-block mr-2"></span>{" "}
                  No Disponible
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-Success inline-block mr-2"></span>{" "}
                  Seleccionado
                </div>
              </div>

              <div className="bg-gray-200 p-4 mb-6 text-center font-bold">
                PANTALLA
              </div>

              <div className="overflow-x-auto mb-6">
                <div
                  className="grid gap-2"
                  style={{
                    gridTemplateColumns: "repeat(10, minmax(2rem, 1fr))",
                  }}
                >
                  {seatsGrid.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                      {/* Etiqueta de fila */}
                      {/* <div className="flex items-center justify-center font-bold">
                        {uniqueRows[rowIndex] || ''}
                      </div>
                       */}
                      {/* Asientos de la fila */}
                      {row.map((seat, seatIndex) => (
                        <button
                          key={seatIndex}
                          className={`
                            w-8 h-8 rounded flex items-center justify-center text-xs
                            ${
                              !seat
                                ? "bg-gray-400 cursor-default"
                                : seat.status === "occupied"
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : selectedSeats.some((s) => s.id === seat.id)
                                    ? "bg-Success text-white"
                                    : "bg-btn-primary hover:bg-blue-600 text-white"
                            }
                          `}
                          disabled={!seat || seat.status === "occupied"}
                          onClick={() => seat && toggleSeat(seat)}
                        >
                          {seat ? seat.number : ""}
                        </button>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between mb-4">
                  <span>Asientos seleccionados:</span>
                  <span>
                    {selectedSeats.map((s) => `${s.row}${s.number}`).join(", ")}
                  </span>
                </div>
                <div className="flex justify-between mb-4 text-lg font-bold">
                  <span>Total a pagar:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={handlePurchase}
                  disabled={selectedSeats.length === 0}
                  className={`w-full py-3 rounded-md ${
                    selectedSeats.length === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  }`}
                >
                  Comprar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
