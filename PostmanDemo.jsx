import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostmanDemo = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({ name: '', number: '', position: '' });
  const [updatePlayer, setUpdatePlayer] = useState({ id: '', name: '', number: '', position: '' });
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/players');
      setPlayers(res.data);
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResponse(JSON.stringify(err.response.data, null, 2));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/players', newPlayer);
      setResponse(JSON.stringify(res.data, null, 2));
      fetchPlayers();
    } catch (err) {
      setResponse(JSON.stringify(err.response.data, null, 2));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3000/api/players/${updatePlayer.id}`, updatePlayer);
      setResponse(JSON.stringify(res.data, null, 2));
      fetchPlayers();
    } catch (err) {
      setResponse(JSON.stringify(err.response.data, null, 2));
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/players/${id}`);
      setResponse(JSON.stringify(res.data, null, 2));
      fetchPlayers();
    } catch (err) {
      setResponse(JSON.stringify(err.response.data, null, 2));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Postman Demo</h2>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">GET Players</h3>
        <button onClick={fetchPlayers} className="bg-blue-500 text-white p-2 rounded">Fetch Players</button>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">POST Player</h3>
        <form onSubmit={handleCreate}>
          <input
            type="text"
            value={newPlayer.name}
            onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
            placeholder="Name"
            className="mr-2 p-2 border rounded"
          />
          <input
            type="number"
            value={newPlayer.number}
            onChange={(e) => setNewPlayer({...newPlayer, number: e.target.value})}
            placeholder="Number"
            className="mr-2 p-2 border rounded"
          />
          <input
            type="text"
            value={newPlayer.position}
            onChange={(e) => setNewPlayer({...newPlayer, position: e.target.value})}
            placeholder="Position"
            className="mr-2 p-2 border rounded"
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded">Create Player</button>
        </form>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">PUT Player</h3>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={updatePlayer.id}
            onChange={(e) => setUpdatePlayer({...updatePlayer, id: e.target.value})}
            placeholder="Player ID"
            className="mr-2 p-2 border rounded"
          />
          <input
            type="text"
            value={updatePlayer.name}
            onChange={(e) => setUpdatePlayer({...updatePlayer, name: e.target.value})}
            placeholder="New Name"
            className="mr-2 p-2 border rounded"
          />
          <input
            type="number"
            value={updatePlayer.number}
            onChange={(e) => setUpdatePlayer({...updatePlayer, number: e.target.value})}
            placeholder="New Number"
            className="mr-2 p-2 border rounded"
          />
          <input
            type="text"
            value={updatePlayer.position}
            onChange={(e) => setUpdatePlayer({...updatePlayer, position: e.target.value})}
            placeholder="New Position"
            className="mr-2 p-2 border rounded"
          />
          <button type="submit" className="bg-yellow-500 text-white p-2 rounded">Update Player</button>
        </form>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">DELETE Player</h3>
        <ul>
          {players.map(player => (
            <li key={player._id} className="mb-2">
              {player.name} - 
              <button onClick={() => handleDelete(player._id)} className="bg-red-500 text-white p-1 rounded ml-2">Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Response</h3>
        <pre className="bg-gray-100 p-4 rounded">{response}</pre>
      </div>
    </div>
  );
};

export default PostmanDemo;