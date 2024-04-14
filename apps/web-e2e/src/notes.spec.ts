import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

const notes = [
  {id: null, title: 'Note 1', description: 'Lorem ipsum dolor sit amet, A consectetur adipiscing elit', tags: []},
  {id: null, title: 'Note 2', description: 'Lorem ipsum dolor sit amet, B consectetur adipiscing elit', tags: []},
  {id: null, title: 'Note 3', description: 'Lorem ipsum dolor sit amet, B consectetur adipiscing elit', tags: []},
  {id: null, title: 'Note 4', description: 'Lorem ipsum dolor sit amet, A consectetur adipiscing elit', tags: []},
];


test.beforeAll('Setup Database', async ({request}) => {
  for await (const note of notes) {
    const response = await request.post(`/api/notes`, { data: { note } });
    const createdNote = await response.json();
    note.id = createdNote.id;
  }
});


test('Add Note Submission Failure Test: Verifying required fields', async ({ page }) => {
  await page.goto('/');
  
  const openAddModalBtn = page.getByText('+');
  openAddModalBtn.click();

  await page.waitForSelector('.modal-body', {state: 'visible'});

  const addBtn = await page.getByText('Add', {exact: true});
  await addBtn.click()

  expect(await page.locator('#title-error').isVisible).toBeTruthy();
});


test('Add Note Submission Success Test: Verifying Note Addition', async ({ page }) => {
  await page.goto('/');
  
  const openAddModalBtn = page.getByText('+');
  openAddModalBtn.click();

  await page.waitForSelector('.modal-body', {state: 'visible'});

  const title = 'Test Note';

  const titleInput = page.locator('#title');
  titleInput.fill(title);

  const addBtn = await page.getByText('Add', {exact: true});
  await addBtn.click();

  expect(await page.getByText(title, {exact: true})).toBeDefined();
});


test('Delete Note Submission Success Test: Verifying Note Deletion', async ({ page }) => {
  await page.goto('/');

  const title = 'Test Note';
  const indexOfLastAdded = 0;

  const btnDelete = await (page.locator('.btn-delete')).nth(indexOfLastAdded);
  await btnDelete.click()

  await page.waitForSelector('.modal-body', {state: 'visible'});


  const addBtn = await page.getByText('Confirm', {exact: true});
  await addBtn.click();

  await page.waitForSelector('.modal-body', {state: 'hidden'});

  expect(await page.getByText(title, {exact: true})).toBeDefined();
});


test.afterAll('Clean Database', async ({request}) => {
  for await (const note of notes) {
    const response = await request.delete(`/api/notes/${note.id}`);
  }
});