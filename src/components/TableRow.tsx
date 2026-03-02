import { useState } from 'react';
import type { Inclusion } from '../types';

interface TableRowProps {
  item: Inclusion;
}

export default function TableRow({ item }: TableRowProps) {
  const [isEditing, setIsEditing] = useState(false);

  // if editing, show input fields; otherwise show text
  if (isEditing) {
    return (
      <tr>
        <td colSpan={4} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
          {/* later put input fields here */}
          editing: {item.name} ...
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </td>
      </tr>
    );
  }

  // is not editing, show normal row
  return (
    <tr>
      <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.name}</td>
      <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.radius}</td>
      <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.type}</td>
      <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
        <button onClick={() => setIsEditing(true)} style={{ marginRight: '8px' }}>
          Edit
        </button>
        <button style={{ color: 'red' }}>Delete</button>
      </td>
    </tr>
  );
}