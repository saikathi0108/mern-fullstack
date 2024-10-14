import React from 'react';
import RandomVerse from './components/RandomVerse';
import SpecificVerse from './components/SpecificVerse';
import HelloWorld from './components/HelloWorld';
import PlayerManager from './components/PlayerManager';
import PostmanDemo from './components/PostmanDemo';

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HelloWorld />
      <h1 className="text-3xl font-bold text-center mb-8">Bible Verse and Sports App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <RandomVerse />
        <SpecificVerse />
      </div>
      <PlayerManager />
      <PostmanDemo />
    </div>
  );
}

export default App;