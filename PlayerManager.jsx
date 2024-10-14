import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerManager = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({ name: '', number: '', position: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/players');
      setPlayers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching players. Please try again.');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/players', newPlayer);
      setNewPlayer({ name: '', number: '', position: '' });
      fetchPlayers();
    } catch (err) {
      setError('Error adding player. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/players/${id}`);
      fetchPlayers();
    } catch (err) {
      setError('Error deleting player. Please try again.');
    }
  };

  if (loading) return <div className="text-center">Loading players...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Player Manager</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          name="name"
          value={newPlayer.name}
          onChange={handleInputChange}
          placeholder="Player Name"
          className="mr-2 p-2 border rounded"
          required
        />
        <input
          type="number"
          name="number"
          value={newPlayer.number}
          onChange={handleInputChange}
          placeholder="Player Number"
          className="mr-2 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="position"
          value={newPlayer.position}
          onChange={handleInputChange}
          placeholder="Player Position"
          className="mr-2 p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Player</button>
      </form>
      <ul>
        {players.map(player => (
          <li key={player._id} className="mb-2 p-2 bg-gray-100 rounded flex justify-between items-center">
            <span>{player.name} - #{player.number} - {player.position}</span>
            <button onClick={() => handleDelete(player._id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerManager;