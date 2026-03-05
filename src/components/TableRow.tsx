import { useState, type KeyboardEvent, type MouseEvent } from 'react';
import type { Inclusion } from '../types';
import styles from './TableRow.module.css';

interface TableRowProps {
  item: Inclusion;
  onSave: (updatedItem: Inclusion) => void; 
  onDelete: (id: string) => void;
  isSelected: boolean;
  onSelect: () => void;
}

export default function TableRow({ item, onSave, onDelete, isSelected, onSelect }: TableRowProps) {
  const isNewItem = item.name === ""; // UX details: if name is empty, we treat it as a new item and directly enter edit mode
  const [isEditing, setIsEditing] = useState(isNewItem);
  const [draft, setDraft] = useState<Inclusion>(item);
  const [radiusIntegerPart, radiusFractionPart = ''] = String(item.radius).split('.');

/**processing 3 logic of button */  
  const handleEditClick = () => {
    //every time we enter edit mode, make sure the draft is updated with the latest item data
    setDraft(item); 
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    if (isNewItem) {
      // UX destails: if it's a new item and user cancel, we should delete it from table
      onDelete(item.id);
    } else {
      setIsEditing(false);
      setDraft(item); 
    }
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

  const handleActionsClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

/**processing keydown event for better UX*/
  const handleEditKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSaveClick();
    }
  };


/**render logic */  
  // if editing, show input fields; otherwise show text
  if (isEditing) {
    return (
      <tr className={`${styles.row} ${isSelected ? styles.selectedRow : ''}`}>
        <td className={styles.cell}>
          <input 
            type="text" 
            className={styles.input}
            value={draft.name}
            // update name in draft when user input
            onKeyDown={handleEditKeyDown}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })} 
          />
        </td>
        <td className={styles.cell}>
          <input 
            type="number" 
            step="any"
            className={styles.input}
            value={Number.isNaN(draft.radius) ? '' : draft.radius}
            onKeyDown={handleEditKeyDown}
            
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
            onKeyDown={handleEditKeyDown}
            onChange={(e) => setDraft({ ...draft, type: e.target.value as Inclusion['type'] })}
          >
            <option value="bubble">Bubble</option>
            <option value="crack">Crack</option>
            <option value="scratch">Scratch</option>
          </select>
        </td>
        <td className={styles.cell}>
          <div className={styles.actions} onClick={handleActionsClick}>
            <button className={`${styles.btn} ${styles.saveBtn}`} onClick={handleSaveClick}>Save</button>
            <button className={styles.btn} onClick={handleCancelClick}>Cancel</button>
          </div>
        </td>
      </tr>
    );
  }

  // is not editing, show normal row
  return (
    <tr className={`${styles.row} ${isSelected ? styles.selectedRow : ''}`} onClick={onSelect}>
      <td className={styles.cell}>{item.name}</td>
      <td className={`${styles.cell} ${styles.radiusCell}`}>
        <span className={styles.radiusValue}>
          <span className={styles.radiusInteger}>{radiusIntegerPart}</span>
          <span className={styles.radiusDot}>{radiusFractionPart ? '.' : ''}</span>
          <span className={styles.radiusFraction}>{radiusFractionPart}</span>
        </span>
      </td>
      <td className={styles.cell}>{item.type}</td>
      <td className={styles.cell}>
        <div className={styles.actions} onClick={handleActionsClick}>
          <button className={styles.btn} onClick={handleEditClick}>Edit</button>
          <button className={`${styles.btn} ${styles.deleteBtn}`} onClick={() => onDelete(item.id)}>Delete</button>
        </div>
      </td>
    </tr>
  );
}