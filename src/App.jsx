import React, { useState } from 'react';
import ShoppingItem from './ShoppingItem.jsx';

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  function addItem(event) {
    event.preventDefault();
    if (!name.trim()) return;

    setItems([...items, { id: crypto.randomUUID(), name: name.trim(), price: Number(price) }]);
    setName('');
    setPrice('');
  }

  function removeItem(id) {
    setItems(items.filter(item => item.id !== id));
  }

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <main>
      <h1>Список покупок</h1>
      <form onSubmit={addItem}>
        <label>
          Название
          <input value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          Цена
          <input type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
        </label>
        <button>Добавить</button>
      </form>
      <ul>
        {items.map(item => (
          <ShoppingItem key={item.id} item={item} onRemove={removeItem} />
        ))}
      </ul>
      <p>Итого: {total.toFixed(2)} ₽</p>
    </main>
  );
}
