import React from 'react';

export default function ShoppingItem({ item, onRemove }) {
  return (
    <li>
      {item.name} — {item.price.toFixed(2)} ₽
      <button onClick={() => onRemove(item.id)}>Удалить</button>
    </li>
  );
}
