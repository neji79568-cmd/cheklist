import React, { useState } from 'react';
import AddItemForm from './components/AddItemForm.jsx';
import ShoppingItem from './components/ShoppingItem.jsx';
import { formatPrice } from './formatPrice.js';

function BasketIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="m8 9 4-6 4 6M3 9h18l-2 11H5L3 9ZM9 13v3m6-3v3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function App() {
  // App хранит список в state и передаёт товары дочерним компонентам.
  const [items, setItems] = useState([]);

  function addItem(item) {
    setItems((currentItems) => [
      ...currentItems,
      { ...item, id: crypto.randomUUID() },
    ]);
  }

  function removeItem(id) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  // Итог вычисляется из актуального списка при каждом изменении state.
  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  return (
    <main className="app">
      <header className="page-header">
        <div className="brand-icon"><BasketIcon /></div>
        <div>
          <p className="eyebrow">ВСЁ ПОД РУКОЙ</p>
          <h1>Список покупок</h1>
        </div>
      </header>

      <p className="page-description">Планируйте покупки. Держите расходы под контролем.</p>

      <div className="shopping-layout">
        <aside className="form-panel" aria-label="Новый товар">
          <AddItemForm onAdd={addItem} />
          <div className="tip">
            <span aria-hidden="true">↗</span>
            <p>Добавьте всё необходимое — общую стоимость мы посчитаем за вас.</p>
          </div>
        </aside>

        <section className="list-panel" aria-labelledby="shopping-heading">
          <div className="list-header">
            <h2 id="shopping-heading">Ваши покупки</h2>
            <span className="item-count" aria-label={`Товаров в списке: ${items.length}`}>{items.length}</span>
          </div>

          {items.length > 0 ? (
            <ul className="shopping-list">
              {items.map((item, index) => (
                <ShoppingItem key={item.id} item={item} index={index} onRemove={removeItem} />
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <div className="empty-icon"><BasketIcon /></div>
              <h3>Здесь будут ваши покупки</h3>
              <p>Добавьте первый товар с помощью формы.<br />Ничего не забудется.</p>
            </div>
          )}

          <div className="total" role="status" aria-live="polite" aria-atomic="true">
            <div>
              <p className="total-label">Общая стоимость</p>
              <p className="total-hint">Товаров в списке: {items.length}</p>
            </div>
            <strong className="total-price">{formatPrice(totalPrice)}</strong>
          </div>
        </section>
      </div>

      <footer className="page-footer">Меньше забытых мелочей. Больше удачных покупок.</footer>
    </main>
  );
}
