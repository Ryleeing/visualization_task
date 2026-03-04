import { useState, useEffect } from 'react';
import EditableTable from './components/EditableTable';
import './App.css';
import styles from './App.module.css';
import type { Inclusion } from './types';
import mockData from './data/mockData.json';

const LOCAL_STORAGE_KEY = 'corning_inclusions_data';

function App() {
  /** local storage */
  const [tableData, setTableData] = useState<Inclusion[]>(()=> {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);// when load, try to get data from localStorage
    if (storedData) {
      try {
        return JSON.parse(storedData) as Inclusion[];
      } catch (error) {
        console.error("Failed to parse data from localStorage, using mock data instead.", error);
      }
    }
    return mockData as Inclusion[];// if no data in localStorage, use mock data
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tableData));
  }, [tableData]);

  /** operate logic */
  const handleAddRow = () => {
    const newRow: Inclusion = {
      id: crypto.randomUUID(), // generate a unique id
      name: "",
      radius: 0, // default
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

  const handleResetData = () => {
    const defaultData = (mockData as Inclusion[]).map((item) => ({ ...item }));
    setTableData(defaultData);
  };
  

  return (
    <div className={styles.appContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Corning Data Editor</h1>
        <div className={styles.headerActions}>
          <button className={styles.resetBtn} onClick={handleResetData}>
            Reset to default data
          </button>
          <button className={styles.addBtn} onClick={handleAddRow}>
            + Add New Row
          </button>
        </div>
      </div>
      <EditableTable
        items={tableData}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem} />
    </div>
  );
}

export default App;