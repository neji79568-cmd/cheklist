import React, { useState } from 'react';
import ShoppingItem from './components/ShoppingItem.jsx';

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

  function deleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <main>
      <h1>Список покупок</h1>
      <form onSubmit={addItem}>
        <label>
          Название товара
          <input value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        <label>
          Цена, сом
          <input type="number" min="0" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} required />
        </label>
        <button type="submit">Добавить</button>
      </form>
      {items.length === 0 && <p>Список пуст.</p>}
      <ul>
        {items.map((item) => <ShoppingItem key={item.id} item={item} onDelete={deleteItem} />)}
      </ul>
      <h2>Общая стоимость: {total.toFixed(2)} сом</h2>
    </main>
  );
}
