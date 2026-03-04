import { useState } from 'react';
import EditableTable from './components/EditableTable';
import './App.css';
import type { Inclusion } from './types';
import mockData from './data/mockData.json';

function App() {
  const [tableData, setTableData] = useState<Inclusion[]>(mockData as Inclusion[]);

  const handleUpdateItem = (updatedItem: Inclusion) => {
    setTableData((prevData) =>
      prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  }
  
  const handleDeleteItem = (id: string) => {
    setTableData((prevData) => prevData.filter((item) => item.id !== id));
  }

  return (
    <div className="app-container">
      <h1 className="app-title">Corning Data Editor</h1>
      <EditableTable 
      items={tableData} 
      onUpdateItem={handleUpdateItem} 
      onDeleteItem={handleDeleteItem} />
    </div>
  );
}

export default App;