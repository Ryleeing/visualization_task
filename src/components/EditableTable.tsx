import type { Inclusion } from '../types';
import TableRow from './TableRow';
import styles from './EditableTable.module.css'; // 引入 CSS Module

interface EditableTableProps {
  items: Inclusion[];
}

export default function EditableTable({ items }: EditableTableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.headerRow}>
          <th className={styles.th}>Name</th>
          <th className={styles.th}>Radius</th>
          <th className={styles.th}>Type</th>
          <th className={styles.th}>Actions</th>
        </tr>
      </thead>
      
      <tbody>
        {items.map((item) => (
          <TableRow key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
}