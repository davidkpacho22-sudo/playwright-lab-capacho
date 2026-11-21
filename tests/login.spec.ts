import { test, expect } from '@playwright/test';

test('CP-001 Login exitoso con usuario estándar', async ({ page }) => {
  // 1. IR: abrir la página de login
  await page.goto('https://www.saucedemo.com');

  // 2. ACTUAR: diligenciar las credenciales y enviar el formulario
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // 3. VERIFICAR: el usuario quedó dentro del catálogo de productos
  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText('Products')).toBeVisible();
});

test('CP-002 Login fallido con contraseña incorrecta', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('clave_incorrecta');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Username and password do not match')).toBeVisible();
  await expect(page).not.toHaveURL(/inventory/);
});

test('CP-003 Login fallido con usuario bloqueado', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Sorry, this user has been locked out')).toBeVisible();
  await expect(page).not.toHaveURL(/inventory/);
});