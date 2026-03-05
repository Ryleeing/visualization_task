import { useState } from 'react';
import type { Inclusion } from '../types';
import TableRow from './TableRow';
import styles from './EditableTable.module.css'; 
interface EditableTableProps {
  items: Inclusion[];
  onUpdateItem: (updatedItem: Inclusion) => void;
  onDeleteItem: (id: string) => void;
}

export default function EditableTable({ items, onUpdateItem, onDeleteItem }: EditableTableProps) {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null); // for highlighted row

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.headerRow}>
          <th className={styles.th}>Name</th>
          {/*for better UX, Seperate number columns */}
          <th className={`${styles.th} ${styles.numberHeader}`}>Radius(mm)</th>
          <th className={styles.th}>Type</th>
          <th className={styles.th}>Actions</th>
        </tr>
      </thead>
      
      <tbody>
        {items.map((item) => (
          <TableRow 
            key={item.id} 
            item={item} 
            onSave={onUpdateItem} 
            onDelete={onDeleteItem}
            isSelected={selectedItemId === item.id}
            onSelect={() =>
              setSelectedItemId((previousSelectedId) =>
                previousSelectedId === item.id ? null : item.id,
              )
            }
          />
        ))}
      </tbody>
    </table>
  );
}