import { test, expect } from '@playwright/test';
import userData from '../Data/Url.json';

const baseUrl = userData.APIUrl;

let accessToken: string;
let orderId: string;

test.describe.configure({
  mode: 'serial'
});

// Generate token once
test.beforeAll(async ({ request }) => {

  const response = await request.post(
    `${baseUrl}/api-clients/`,
    {
      data: {
        clientName: 'Playwright Test',
        clientEmail: `playwright${Date.now()}@example.com`
      }
    }
  );

  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  accessToken = responseBody.accessToken;

  expect(accessToken).toBeTruthy();

  console.log('Access token generated');
});


// GET Books
test('GET - Get Books', async ({ request }) => {

  const response = await request.get(
    `${baseUrl}/books`
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  console.log('GET Books Response:');
  console.log(JSON.stringify(responseBody, null, 2));
});


// POST - Create Order
test('POST - Create Order', async ({ request }) => {

  const response = await request.post(
    `${baseUrl}/orders`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        bookId: 1,
        customerName: 'Mohd Aamir'
      }
    }
  );

  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  console.log('POST Order Response:');
  console.log(JSON.stringify(responseBody, null, 2));

  // Store order ID for PATCH and DELETE
  orderId = responseBody.orderId;

  expect(orderId).toBeTruthy();

  console.log(`Order ${orderId} created successfully`);
});


// PATCH - Update SAME Order
test('PATCH - Update Order', async ({ request }) => {

  const response = await request.patch(
    `${baseUrl}/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        customerName: 'Updated Mohd Aamir'
      }
    }
  );

  expect(response.status()).toBe(204);

  console.log(`Order ${orderId} updated successfully`);
});


// DELETE - Delete SAME Order
test('DELETE - Delete Order', async ({ request }) => {

  const response = await request.delete(
    `${baseUrl}/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  expect(response.status()).toBe(204);

  console.log(`Order ${orderId} deleted successfully`);
});