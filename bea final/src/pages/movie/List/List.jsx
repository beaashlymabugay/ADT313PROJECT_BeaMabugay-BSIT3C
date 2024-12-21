import { useNavigate } from 'react-router-dom';
import './List.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Lists = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('/movies', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    const isConfirm = window.confirm('Are you sure that you want to delete this data?');
    if (isConfirm) {
      try {
        await axios.delete(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setLists((prevLists) => prevLists.filter((movie) => movie.id !== id));
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  return (
    <div className='lists-container'>
      <div className='create-container'>
        <button
          className='create'
          type='button'
          onClick={() => navigate('/main/movies/form')}
        >
          Create New
        </button>
      </div>
      <div className='table-container'>
        <table className='movie-lists'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lists.length > 0 ? (
              lists.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.id}</td>
                  <td className="title-cell">{movie.title}</td>
                  <td>
                    <button
                      className='edit'
                      type='button'
                      onClick={() => navigate(`/main/movies/form/${movie.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className='delete'
                      type='button'
                      onClick={() => handleDelete(movie.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No movies available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lists;
