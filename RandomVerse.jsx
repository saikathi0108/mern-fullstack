import React, { useState } from 'react';
import axios from 'axios';

const RandomVerse = () => {
  const [verse, setVerse] = useState('');

  const fetchRandomVerse = async () => {
    try {
      const response = await axios.get('https://labs.bible.org/api/?passage=random&type=json');
      setVerse(`${response.data[0].bookname} ${response.data[0].chapter}:${response.data[0].verse} - ${response.data[0].text}`);
    } catch (error) {
      console.error('Error fetching random verse:', error);
      setVerse('Failed to fetch verse. Please try again.');
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Random Verse</h2>
      <button 
        onClick={fetchRandomVerse}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Get Random Verse
      </button>
      {verse && <p className="mt-4 text-gray-600">{verse}</p>}
    </div>
  );
};

export default RandomVerse;