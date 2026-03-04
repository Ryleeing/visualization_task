import { useState } from 'react';
import EditableTable from './components/EditableTable';
import './App.css';
import styles from './App.module.css';
import type { Inclusion } from './types';
import mockData from './data/mockData.json';

function App() {
  const [tableData, setTableData] = useState<Inclusion[]>(mockData as Inclusion[]);

  const handleAddRow = () => {
    const newRow: Inclusion = {
      id: crypto.randomUUID(), // generate a unique id
      name: "",
      radius: 0,               // default
      type: "bubble"
    };

    // add the new row to the beginning 
    setTableData([newRow, ...tableData]);
  };

  const handleUpdateItem = (updatedItem: Inclusion) => {
    setTableData((prevData) =>
      prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  }

  const handleDeleteItem = (id: string) => {
    setTableData((prevData) => prevData.filter((item) => item.id !== id));
  }

  return (
    <div className={styles.appContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Corning Data Editor</h1>
        <button className={styles.addBtn} onClick={handleAddRow}>
          + Add New Row
        </button>
      </div>
      <EditableTable
        items={tableData}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem} />
    </div>
  );
}

export default App;