import type { Inclusion } from '../types';
import TableRow from './TableRow';
import styles from './EditableTable.module.css'; 
interface EditableTableProps {
  items: Inclusion[];
  onUpdateItem: (updatedItem: Inclusion) => void;
  onDeleteItem: (id: string) => void;
}

export default function EditableTable({ items, onUpdateItem, onDeleteItem }: EditableTableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.headerRow}>
          <th className={styles.th}>Name</th>
          <th className={`${styles.th} ${styles.numberHeader}`}>Radius</th>
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
          />
        ))}
      </tbody>
    </table>
  );
}