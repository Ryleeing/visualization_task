import { useState } from 'react';
import EditableTable from './components/EditableTable';
import './App.css';
import type { Inclusion } from './types';

// test mock
const initialData: Inclusion[] = [
  {
    id: "7c9b3e4a-1f6d-4c9e-9a4e-8c2f1e9a6d21",
    name: "Inclusion A",
    radius: 2.5,
    type: "bubble"
  }
];

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Corning Data Editor</h1>
      <EditableTable items={initialData} />
    </div>
  );
}

export default App;