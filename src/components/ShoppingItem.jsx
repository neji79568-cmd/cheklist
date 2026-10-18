import React from 'react';

export default function ShoppingItem({ item, onDelete }) {
  return (
    <li>
      <span>{item.name} — {item.price.toFixed(2)} сом</span>
      <button type="button" onClick={() => onDelete(item.id)}>Удалить</button>
    </li>
  );
}
