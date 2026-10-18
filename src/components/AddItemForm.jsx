import React, { useRef, useState } from 'react';

export default function AddItemForm({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);
  const nameInput = useRef(null);
  const priceInput = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const normalizedPrice = price.trim().replace(',', '.');

    if (!trimmedName) {
      setError({ field: 'name', message: 'Введите название товара.' });
      nameInput.current.focus();
      return;
    }

    if (!/^(?:\d+(?:\.\d{1,2})?|\.\d{1,2})$/.test(normalizedPrice)) {
      setError({ field: 'price', message: 'Укажите цену от 0, например 125,50.' });
      priceInput.current.focus();
      return;
    }

    const priceInCents = Math.round(Number(normalizedPrice) * 100);

    if (!Number.isSafeInteger(priceInCents) || priceInCents > 99999999999) {
      setError({ field: 'price', message: 'Максимальная цена — 999 999 999,99 ₽.' });
      priceInput.current.focus();
      return;
    }

    onAdd({ name: trimmedName, price: priceInCents });
    setName('');
    setPrice('');
    setError(null);
    nameInput.current.focus();
  }

  return (
    <form className="add-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <span className="small-icon" aria-hidden="true">+</span>
        <h2>Добавить товар</h2>
      </div>
      <p className="form-description">Что нужно купить?</p>

      <label htmlFor="item-name">Название товара</label>
      <input
        ref={nameInput}
        id="item-name"
        name="name"
        type="text"
        placeholder="Например, молоко"
        maxLength={80}
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          setError(null);
        }}
        aria-invalid={error?.field === 'name'}
        aria-describedby={error?.field === 'name' ? 'form-error' : undefined}
        required
      />

      <label htmlFor="item-price">Цена</label>
      <div className="price-input-wrap">
        <input
          ref={priceInput}
          id="item-price"
          name="price"
          type="text"
          inputMode="decimal"
          placeholder="0,00"
          maxLength={16}
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
            setError(null);
          }}
          aria-invalid={error?.field === 'price'}
          aria-describedby={error?.field === 'price' ? 'form-error' : undefined}
          required
        />
        <span className="currency-label" aria-hidden="true">₽</span>
      </div>

      {error && <p className="form-error" id="form-error" role="alert">{error.message}</p>}

      <button className="add-button" type="submit">
        <span aria-hidden="true">+</span> Добавить в список
      </button>
      <p className="form-hint">Нажмите Enter или кнопку, чтобы добавить.</p>
    </form>
  );
}
