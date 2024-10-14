import React, { useState } from 'react';
import axios from 'axios';

const SpecificVerse = () => {
  const [reference, setReference] = useState('');
  const [verse, setVerse] = useState('');

  const fetchSpecificVerse = async () => {
    if (!reference) return;

    try {
      const response = await axios.get(`https://labs.bible.org/api/?passage=${encodeURIComponent(reference)}&type=json`);
      setVerse(`${response.data[0].bookname} ${response.data[0].chapter}:${response.data[0].verse} - ${response.data[0].text}`);
    } catch (error) {
      console.error('Error fetching specific verse:', error);
      setVerse('Failed to fetch verse. Please check the reference and try again.');
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Specific Verse</h2>
      <input
        type="text"
        value={reference}
        onChange={(e) => setReference(e.target.value)}
        placeholder="Enter verse reference (e.g., John 3:16)"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />
      <button 
        onClick={fetchSpecificVerse}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Get Verse
      </button>
      {verse && <p className="mt-4 text-gray-600">{verse}</p>}
    </div>
  );
};

export default SpecificVerse;