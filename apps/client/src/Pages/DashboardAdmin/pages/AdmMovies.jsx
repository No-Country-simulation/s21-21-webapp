import React from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2 } from 'lucide-react';

class AdmMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      newMovie: {
        title: '',
        genre: '',
        format: '',
        duration: '',
        releaseDate: '',
        image: '',
        isUpcoming: false,
      },
      movieAdded: null, // Para mostrar los datos debajo del formulario
    };

    this.handleAddMovie = this.handleAddMovie.bind(this);
    this.handleDeleteMovie = this.handleDeleteMovie.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  componentDidMount() {
    axios.get('https://tu-dominio.com/movies')
      .then(response => {
        this.setState({ movies: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleAddMovie(event) {
    event.preventDefault();
    const newMovieWithState = {
      ...this.state.newMovie,
      status: 'Archivado', // Estado "Archivado"
    };

    // Mostrar los datos debajo del formulario
    this.setState({
      movieAdded: newMovieWithState,
      newMovie: {
        title: '',
        genre: '',
        format: '',
        duration: '',
        releaseDate: '',
        image: '',
        isUpcoming: false,
      },
    });

    // Agregar la película en el servidor
    axios.post('https://tu-dominio.com/movies', newMovieWithState)
      .then(response => {
        this.setState(prevState => ({
          movies: [...prevState.movies, response.data],
        }));
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleDeleteMovie(id) {
    axios.delete(`https://tu-dominio.com/movies/${id}`)
      .then(() => {
        this.setState({
          movies: this.state.movies.filter(movie => movie.id !== id),
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleChange(event) {
    this.setState({
      newMovie: { ...this.state.newMovie, [event.target.name]: event.target.value },
    });
  }

  handleCheckboxChange(event) {
    this.setState({
      newMovie: { ...this.state.newMovie, isUpcoming: event.target.checked },
    });
  }

  handleImageChange(event) {
    this.setState({
      newMovie: { ...this.state.newMovie, image: event.target.files[0] },
    });
  }

  render() {
    return (
      <div className="p-6">
        {/* Header with title and add button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Películas</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <Plus size={18} className="mr-2" />
            Agregar Película
          </button>
        </div>

        {/* Form to add new movie */}
        <form onSubmit={this.handleAddMovie} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Título</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="title"
                type="text"
                name="title"
                value={this.state.newMovie.title}
                onChange={this.handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">Género</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="genre"
                type="text"
                name="genre"
                value={this.state.newMovie.genre}
                onChange={this.handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="format">Formato</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="format"
                type="text"
                name="format"
                value={this.state.newMovie.format}
                onChange={this.handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">Duración (min)</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="duration"
                type="number"
                name="duration"
                value={this.state.newMovie.duration}
                onChange={this.handleChange}
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="releaseDate">Fecha de lanzamiento</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="releaseDate"
                type="date"
                name="releaseDate"
                value={this.state.newMovie.releaseDate}
                onChange={this.handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Imagen</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="image"
                type="file"
                name="image"
                onChange={this.handleImageChange}
                required
              />
            </div>
          </div>

          <div className="flex items-center mb-4">
            <input
              id="isUpcoming"
              type="checkbox"
              checked={this.state.newMovie.isUpcoming}
              onChange={this.handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="isUpcoming" className="text-sm text-gray-700">¿Próximamente?</label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md flex items-center w-full md:w-auto"
          >
            <Plus size={18} className="mr-2" />
            Agregar Película
          </button>
        </form>

        {/* Mostrar los datos de la película agregada debajo del formulario */}
        {this.state.movieAdded && (
          <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-lg mb-2">Película Agregada:</h3>
            <p><strong>Título:</strong> {this.state.movieAdded.title}</p>
            <p><strong>Género:</strong> {this.state.movieAdded.genre}</p>
            <p><strong>Formato:</strong> {this.state.movieAdded.format}</p>
            <p><strong>Duración:</strong> {this.state.movieAdded.duration} min</p>
            <p><strong>Fecha de Lanzamiento:</strong> {new Date(this.state.movieAdded.releaseDate).toLocaleDateString()}</p>
            <p><strong>Estado:</strong> Archivado</p>
          </div>
        )}

        {/* Movies table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table header */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Película</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Género</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Formato</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {this.state.movies.map((movie) => (
                <tr key={movie.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded object-cover mr-3" src={movie.image} alt={movie.title} />
                      <div className="text-sm font-medium text-gray-900">{movie.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.genre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.format}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.duration} min</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(movie.releaseDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${movie.status === 'Archivado' ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'}`}>
                      {movie.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => this.handleDeleteMovie(movie.id)}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AdmMovies;


