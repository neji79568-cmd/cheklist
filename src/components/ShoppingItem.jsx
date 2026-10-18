import React from 'react';
import { formatPrice } from '../formatPrice.js';

// Данные товара и обработчик удаления приходят от App через props.
export default function ShoppingItem({ item, index, onRemove }) {
  return (
    <li className="shopping-item">
      <span className="item-number" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="item-name">{item.name}</span>
      <span className="item-price">{formatPrice(item.price)}</span>
      <button
        className="remove-button"
        type="button"
        aria-label={`Удалить ${item.name}`}
        title={`Удалить ${item.name}`}
        onClick={() => onRemove(item.id)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </li>
  );
}
