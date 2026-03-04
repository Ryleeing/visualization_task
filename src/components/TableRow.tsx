import { useState } from 'react';
import type { Inclusion } from '../types';
import styles from './TableRow.module.css';

interface TableRowProps {
  item: Inclusion;
  onSave: (updatedItem: Inclusion) => void; 
  onDelete: (id: string) => void;
}

export default function TableRow({ item, onSave, onDelete }: TableRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Inclusion>(item);

/**processing 3 logic of button */  
  const handleEditClick = () => {
    //every time we enter edit mode, make sure the draft is updated with the latest item data
    setDraft(item); 
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    if (draft.radius <= 0 || isNaN(draft.radius)) {
        alert("Radius must be a number greater than 0");
        return;
    }
    if (draft.name.trim() === "") {
        alert("Name cannot be empty");
        return;
    }

    onSave(draft); 
    setIsEditing(false); 
  };


/**render logic */  
  // if editing, show input fields; otherwise show text
  if (isEditing) {
    return (
      <tr className={styles.row}>
        <td className={styles.cell}>
          <input 
            type="text" 
            className={styles.input}
            value={draft.name}
            // update name in draft when user input
            onChange={(e) => setDraft({ ...draft, name: e.target.value })} 
          />
        </td>
        <td className={styles.cell}>
          <input 
            type="number" 
            step="0.1"
            className={styles.input}
            value={Number.isNaN(draft.radius) ? '' : draft.radius}
            
            // for radius, fix the issue when delete to empty, it should show empty instead of 0. But when start editing, it show current value 
            onChange={(e) => {
              const nextValue = e.target.value;
              setDraft({
                ...draft,
                radius: nextValue === '' ? Number.NaN : Number(nextValue),
              });
            }} 
          />
        </td>
        <td className={styles.cell}>
          <select 
            className={styles.select}
            value={draft.type}
            onChange={(e) => setDraft({ ...draft, type: e.target.value as Inclusion['type'] })}
          >
            <option value="bubble">Bubble</option>
            <option value="crack">Crack</option>
            <option value="scratch">Scratch</option>
          </select>
        </td>
        <td className={styles.cell}>
          <button className={`${styles.btn} ${styles.saveBtn}`} onClick={handleSaveClick}>Save</button>
          <button className={styles.btn} onClick={handleCancelClick}>Cancel</button>
        </td>
      </tr>
    );
  }

  // is not editing, show normal row
  return (
    <tr className={styles.row}>
      <td className={styles.cell}>{item.name}</td>
      <td className={styles.cell}>{item.radius}</td>
      <td className={styles.cell}>{item.type}</td>
      <td className={styles.cell}>
        <button className={styles.btn} onClick={handleEditClick}>Edit</button>
        <button className={`${styles.btn} ${styles.deleteBtn}`} onClick={() => onDelete(item.id)}>Delete</button>
      </td>
    </tr>
  );
}