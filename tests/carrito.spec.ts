import { test, expect } from '@playwright/test';

test('CP-004 Agregar la mochila al carrito', async ({ page }) => {
  // Precondición: iniciar sesión
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // 1. Buscar la TARJETA del producto (de las 6 que hay, la que contiene ese texto)
  const mochila = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });

  // 2. Buscar el botón DENTRO de esa tarjeta y hacer clic
  await mochila.getByRole('button', { name: 'Add to cart' }).click();

  // 3. Verificar: el botón cambió a "Remove" y el carrito muestra 1
  await expect(mochila.getByRole('button', { name: 'Remove' })).toBeVisible();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('CP-005 Agregar dos productos al carrito', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  const mochila = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
  const luz = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bike Light' });

  await mochila.getByRole('button', { name: 'Add to cart' }).click();
  await luz.getByRole('button', { name: 'Add to cart' }).click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});