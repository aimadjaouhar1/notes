import { test, expect } from '@playwright/test';

test('Add Note modal opened', async ({ page }) => {
  await page.goto('/');
  
  const openAddModalBtn = page.getByText('+');
  openAddModalBtn.click();

  expect(await page.locator('h4').innerText()).toContain('Add Note');
});


test('Form Failure Success Test: Verifying required fields', async ({ page }) => {
  await page.goto('/');
  
  const openAddModalBtn = page.getByText('+');
  openAddModalBtn.click();

  await page.waitForTimeout(1000);

  const addBtn = await page.getByText('Add', {exact: true});
  await addBtn.click()

  expect(await page.locator('#title-error').isVisible).toBeTruthy();
});


test('Form Submission Success Test: Verifying Note Addition', async ({ page }) => {
  await page.goto('/');
  
  const openAddModalBtn = page.getByText('+');
  openAddModalBtn.click();

  await page.waitForTimeout(1000);

  const title = 'Test Note 1';

  const titleInput = page.locator('#title');
  titleInput.fill(title);

  const addBtn = await page.getByText('Add', {exact: true});
  await addBtn.click()

  for await (const cardTitle of await page.locator('.card-title').all()) {
    expect(await cardTitle.innerHTML()).toContain(title);
  }

});