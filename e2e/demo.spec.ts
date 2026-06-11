import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Bluemont Store Demo E2E', () => {
  
  test('Branding & Navigation', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check Logo and Title
    await expect(page).toHaveTitle(/Bluemont/);
    await expect(page.locator('header img[src="/logo.png"]')).toBeVisible();
    await expect(page.getByText('Bluemont Engineering Services', { exact: false })).toBeVisible();
    
    // Check Brand Pages
    await page.click('footer >> text=Donaldson Filtration');
    await expect(page.locator('section img[src="/donaldson.png"]')).toBeVisible({ timeout: 10000 });
    
    await page.goto(BASE_URL + '/products/yuko');
    await expect(page.locator('section img[src="/yuko.png"]')).toBeVisible({ timeout: 10000 });
  });

  test('Admin Portal - Dashboard & Inventory', async ({ page }) => {
    await page.goto(BASE_URL + '/auth/login');
    
    // Admin Login
    await page.fill('input[type="email"]', 'admin@bluemontgh.com');
    await page.fill('input[type="password"]', 'anypassword');
    await page.click('button:has-text("Sign In")');
    
    // Dashboard KPIs
    await expect(page).toHaveURL(/.*admin/, { timeout: 10000 });
    await expect(page.getByText('Business Overview')).toBeVisible();
    
    // Test Report Button
    await page.click('button:has-text("Review Sales Report")');
    await expect(page.getByText('Generating Sales Report')).toBeVisible();
    
    // Inventory Management
    await page.click('aside >> text=Inventory');
    await expect(page.getByText('Product Inventory')).toBeVisible();
    
    // Search SKU
    await page.fill('input[placeholder*="Search by SKU"]', 'P181057');
    await expect(page.locator('tbody tr').first()).toContainText('P181057');
    
    // Edit Modal
    await page.hover('tbody tr:has-text("P181057")');
    await page.click('button[title="Edit Product"]');
    await expect(page.getByRole('heading', { name: 'Edit Product' })).toBeVisible();
    
    // Use specific selector for disabled SKU input in modal
    await expect(page.locator('form input[disabled]').first()).toHaveValue('P181057');
    
    // Save Changes
    await page.click('button:has-text("Save Changes")');
    await expect(page.getByText('Changes saved successfully')).toBeVisible();
  });

  test('Customer Checkout Flow', async ({ page }) => {
    test.setTimeout(60000); 
    await page.goto(BASE_URL);
    
    // Search for product
    const searchInput = page.locator('header input[type="search"]');
    await searchInput.fill('P181057');
    await searchInput.press('Enter');
    
    // Add product to cart from search results
    await page.getByRole('heading', { name: 'Donaldson Air Filter P181057' }).click();
    await page.click('button:has-text("Add to Cart")', { timeout: 15000 });
    await expect(page.getByText('Added 1 × Donaldson Air Filter P181057 to cart')).toBeVisible();
    
    // Go to cart
    await page.click('button[aria-label="Open cart"]');
    await page.click('text=Go to Checkout');
    
    // Step 1: Delivery
    await expect(page).toHaveURL(/.*checkout/);
    await page.getByLabel('Full Name').fill('Test User');
    await page.getByLabel('Phone Number').fill('0240000000');
    await page.getByLabel('Email Address').fill('test@example.com');
    await page.getByLabel('Delivery Address').fill('123 Tema St');
    await page.getByLabel('City / Town').fill('Tema');
    await page.click('button:has-text("Continue to Review")');
    
    // Step 2: Review
    await page.click('button:has-text("Continue to Payment")');
    
    // Step 3: Payment
    await page.click('button:has-text("Place Order")');
    await expect(page.getByText('Order Confirmation')).toBeVisible({ timeout: 15000 });
  });

  test('Admin Auto-Logout', async ({ page }) => {
    await page.goto(BASE_URL + '/auth/login');
    await page.fill('input[type="email"]', 'admin@bluemontgh.com');
    await page.fill('input[type="password"]', 'anypassword');
    await page.click('button:has-text("Sign In")');
    
    await expect(page).toHaveURL(/.*admin/);
    
    // Go to Home
    await page.click('aside a:has-text("Bluemont Admin")');
    await expect(page).toHaveURL(BASE_URL + '/', { timeout: 10000 });
    
    // Wait a bit for the effect to run
    await page.waitForTimeout(1000);
    
    // Verify logged out by trying to go back to admin
    await page.goto(BASE_URL + '/admin');
    await expect(page).toHaveURL(/.*login/, { timeout: 10000 });
  });

});
