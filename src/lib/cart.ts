import { persistentAtom } from '@nanostores/persistent';
import { computed } from 'nanostores';

export type CartItem = {
  variationId: string;
  name: string;
  priceCents: number;
  qty: number;
};

export type AddCartItem = Omit<CartItem, 'qty'> & {
  qty?: number;
};

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.variationId === 'string' &&
    item.variationId.trim().length > 0 &&
    typeof item.name === 'string' &&
    item.name.trim().length > 0 &&
    typeof item.priceCents === 'number' &&
    Number.isSafeInteger(item.priceCents) &&
    item.priceCents >= 0 &&
    typeof item.qty === 'number' &&
    Number.isInteger(item.qty) &&
    item.qty >= 1 &&
    item.qty <= 20
  );
}

function decodeCart(encoded: string): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(encoded);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isCartItem).slice(0, 30);
  } catch {
    return [];
  }
}

export const cart = persistentAtom<CartItem[]>('tec-cart', [], {
  encode: JSON.stringify,
  decode: decodeCart,
});

export const subtotalCents = computed(cart, (items) =>
  items.reduce((total, item) => total + item.priceCents * item.qty, 0),
);

export function addItem(item: AddCartItem): void {
  const qty = item.qty ?? 1;

  if (
    !isCartItem({
      ...item,
      qty,
    })
  ) {
    return;
  }

  const current = cart.get();
  const existing = current.find(
    (entry) => entry.variationId === item.variationId,
  );

  if (existing) {
    cart.set(
      current.map((entry) =>
        entry.variationId === item.variationId
          ? {
              ...entry,
              name: item.name,
              priceCents: item.priceCents,
              qty: Math.min(20, entry.qty + qty),
            }
          : entry,
      ),
    );
    return;
  }

  cart.set([
    ...current,
    {
      variationId: item.variationId,
      name: item.name,
      priceCents: item.priceCents,
      qty,
    },
  ]);
}

export function removeItem(variationId: string): void {
  cart.set(cart.get().filter((item) => item.variationId !== variationId));
}

export function setQty(variationId: string, qty: number): void {
  if (!Number.isFinite(qty)) {
    return;
  }

  const nextQty = Math.trunc(qty);

  if (nextQty <= 0) {
    removeItem(variationId);
    return;
  }

  cart.set(
    cart.get().map((item) =>
      item.variationId === variationId
        ? { ...item, qty: Math.min(20, nextQty) }
        : item,
    ),
  );
}

export function clear(): void {
  cart.set([]);
}
