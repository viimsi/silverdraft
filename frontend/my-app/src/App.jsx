import React from 'react';
import OCForm from './components/OCForm';
import OCList from './components/OCList';
import './App.css';

function App() {
  return (
    <div>
      <h1>OC Management</h1>
      <OCForm />
      <OCList />
    </div>
  );
}

export default App;
