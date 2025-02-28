import React, { useState } from "react";

const seatsData = Array.from({ length: 10 }, (_, row) =>
  Array.from({ length: 12 }, (_, col) => ({
    id: `${row}-${col}`,
    status: Math.random() > 0.9 ? "occupied" : "available",
  }))
);


export const SitSelector = () => {

  const [seats, setSeats] = useState(seatsData);
  
  const toggleSeat = (rowIndex, colIndex) => {
    setSeats((prevSeats) =>
      prevSeats.map((row, rIdx) =>
        row.map((seat, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex && seat.status !== "occupied"
            ? { ...seat, status: seat.status === "selected" ? "available" : "selected" }
            : seat
        )
      )
    );
  };

  return (
    <div className="h-screen w-full flex flex-col items-center p-4 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/cinema-seats-still-life.jpg')"}}>
      <div className="bg-gray-100 p-4 rounded-md overflow-auto">
            <h2 className="text-lg font-bold mb-2">Seleccione un asiento disponible</h2>
            <div className="flex space-x-4 mb-4">
              <div className="flex items-center"><span className="w-4 h-4 bg-btn-primary inline-block mr-2"></span> Disponible</div>
              <div className="flex items-center"><span className="w-4 h-4 bg-gray-400 inline-block mr-2"></span> No Disponible</div>
              <div className="flex items-center"><span className="w-4 h-4 bg-Success inline-block mr-2"></span> Seleccionado</div>
            </div>
        <div className="text-center font-bold mb-2">PANTALLA</div>
        <div className="grid grid-cols-12 gap-2">
          {seats.map((row, rowIndex) =>
            row.map((seat, colIndex) => (
              <button
                key={seat.id}
                className={`w-6 h-6 rounded ${
                  seat.status === "available" ? "bg-btn-primary hover:bg-btn-hover" :
                  seat.status === "occupied" ? "bg-gray-400 cursor-not-allowed" :
                  "bg-Success"
                }`}
                disabled={seat.status === "occupied"}
                onClick={() => toggleSeat(rowIndex, colIndex)}
              ></button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}