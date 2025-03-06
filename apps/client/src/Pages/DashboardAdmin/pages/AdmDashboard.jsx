import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Pencil, Trash } from 'lucide-react';

// StatsCard component remains the same
const StatsCard = ({ title, value, icon }) => (
  <Card className="shadow-md border-l-4 border-indigo-600">
    <CardContent className="flex justify-between items-center p-6">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
      {icon}
    </CardContent>
  </Card>
);

const TableMovies = ({ movies, onDelete }) => (
  <div className="overflow-x-auto">
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Título</TableCell>
          <TableCell>Género</TableCell>
          <TableCell>Fecha de Estreno</TableCell>
          <TableCell>Estado</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {movies.map((movie) => (
          <TableRow key={movie.id}>
            <TableCell>{movie.title}</TableCell>
            <TableCell>{movie.genre}</TableCell>
            <TableCell>{movie.releaseDate}</TableCell>
            <TableCell>{movie.status}</TableCell>
            <TableCell>
              <Button variant="outline" size="icon" className="mr-2">
                <Pencil size={16} />
              </Button>
              <Button variant="outline" size="icon" className="text-red-600" onClick={() => onDelete(movie.id)}>
                <Trash size={16} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <div className="flex justify-end mt-4">
      <Button variant="outline" size="icon" className="mr-2">
        <ChevronLeft size={16} />
      </Button>
      <Button variant="outline" size="icon">
        <ChevronRight size={16} />
      </Button>
    </div>
  </div>
);

const AdmDashboard = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todo');
  const [movies, setMovies] = useState([]);

  // Fetch movies from API on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Reemplaza esta URL con la de tu API
        const response = await fetch('https://api.mypeliculas.com/movies');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Filter movies based on search and selected filter
  const filteredMovies = movies.filter(movie =>
    (filter === 'Todo' || movie.status === filter) &&
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  // Delete movie from the list (and call an API if necessary)
  const handleDelete = (movieId) => {
    const updatedMovies = movies.filter(movie => movie.id !== movieId);
    setMovies(updatedMovies);

    // Llamar a la API para eliminar una película de la base de datos
    // Ejemplo: 
    // fetch(`https://api.mypeliculas.com/movies/${movieId}`, { method: 'DELETE' });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatsCard title="Películas en Cartelera" value={filteredMovies.filter(movie => movie.status === 'En Cartelera').length} icon={<ChevronRight size={32} />} />
        <StatsCard title="Próximos Estrenos" value={filteredMovies.filter(movie => movie.status === 'Próximo Estreno').length} icon={<ChevronRight size={32} />} />
        <StatsCard title="Banners Activos" value="3" icon={<ChevronRight size={32} />} />
      </div>

      <div className="flex flex-wrap items-center mb-6">
        <Input
          className="mr-4 w-full sm:w-72"
          placeholder="Buscar película..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap mt-4 sm:mt-0">
          <Button variant={filter === 'Todo' ? 'default' : 'outline'} onClick={() => setFilter('Todo')}>Todo</Button>
          <Button variant={filter === 'En Cartelera' ? 'default' : 'outline'} onClick={() => setFilter('En Cartelera')} className="ml-2">En Cartelera</Button>
          <Button variant={filter === 'Próximo Estreno' ? 'default' : 'outline'} onClick={() => setFilter('Próximo Estreno')} className="ml-2">Próximo Estreno</Button>
          <Button variant={filter === 'Archivado' ? 'default' : 'outline'} onClick={() => setFilter('Archivado')} className="ml-2">Archivado</Button>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Películas en Cartelera</h2>
      <TableMovies movies={filteredMovies} onDelete={handleDelete} />
    </div>
  );
};

export default AdmDashboard;
