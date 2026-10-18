const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 2,
});

// Цены хранятся в копейках, чтобы сумма считалась без ошибок округления.
export function formatPrice(priceInCents) {
  return priceFormatter.format(priceInCents / 100);
}
