const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');
const assert = require('assert');
const LoginPage = require('./pages/LoginPage');
const HomePage = require('./pages/HomePage');

// Test site URL (local server)
const baseUrl = 'http://localhost:3000';

// Color log functions
function logSuccess(message) {
	console.log('\x1b[32m%s\x1b[0m', message); // Green color
}

function logInfo(message) {
	console.log('\x1b[36m%s\x1b[0m', message); // Cyan color
}

function logError(message) {
	console.log('\x1b[31m%s\x1b[0m', message); // Red color
}

async function runLoginTests() {
	let driver;
	let loginPage;
	let homePage;

	try {
		logInfo('Starting test with local test-site...');

		// Configure Edge options
		const edgeOptions = new edge.Options();
		edgeOptions.addArguments('--no-sandbox');
		edgeOptions.addArguments('--disable-dev-shm-usage');
		edgeOptions.addArguments('--disable-gpu');
		edgeOptions.addArguments('--window-size=1920,1080');

		// Initialize the driver with Edge
		logInfo('Initializing Edge driver...');
		driver = new Builder()
			.forBrowser('MicrosoftEdge')
			.setEdgeOptions(edgeOptions)
			.build();
		logSuccess('Edge driver initialized successfully');
		
		// Initialize Page Objects
		loginPage = new LoginPage(driver);
		homePage = new HomePage(driver);

		// Test Case 1: Invalid Login
		logInfo('\n--- Test Case 1: Invalid Login ---');
		await loginPage.navigate(`${baseUrl}/login.html`);
		logInfo('Navigated to login page');

		await loginPage.enterUsername('invaliduser');
		await loginPage.enterPassword('invalidpassword');
		await loginPage.clickLoginButton();

		// Wait for error message
		await driver.wait(until.elementLocated(By.id('error')), 5000);
		const errorMessage = await driver.findElement(By.id('error')).getText();

		if (errorMessage.includes('Invalid credentials')) {
			logSuccess(
				'✓ Invalid login test passed: Error message displayed correctly'
			);
		} else {
			logError(
				`✗ Invalid login test failed: Expected error message with "Invalid credentials", got "${errorMessage}"`
			);
		}

		// Test Case 2: Valid Login
		logInfo('\n--- Test Case 2: Valid Login ---');
		await loginPage.navigate(`${baseUrl}/login.html`); // Navigate again for clean state

		await loginPage.enterUsername('validuser');
		await loginPage.enterPassword('validpassword');
		await loginPage.clickLoginButton();

		// Wait for redirection to home page
		await driver.wait(async () => {
			const currentUrl = await driver.getCurrentUrl();
			return currentUrl.includes('/home.html');
		}, 5000);
		
		logInfo('Successfully redirected to home page');
		
		// Verify home page elements using HomePage POM
		const welcomeDisplayed = await homePage.isWelcomeMessageDisplayed();
		if (welcomeDisplayed) {
			logSuccess('✓ Welcome message is displayed on home page');
		} else {
			logError('✗ Welcome message is not displayed on home page');
		}
		
		const userMenuDisplayed = await homePage.isUserMenuDisplayed();
		if (userMenuDisplayed) {
			logSuccess('✓ User menu is displayed on home page');
		} else {
			logError('✗ User menu is not displayed on home page');
		}
		
		const dashboardElements = await homePage.getDashboardElements();
		if (dashboardElements.length > 0) {
			logSuccess(`✓ Dashboard contains ${dashboardElements.length} elements`);
		} else {
			logError('✗ No dashboard elements found on home page');
		}

		logSuccess('\nAll tests completed!');
	} catch (error) {
		logError(`Test error: ${error}`);
	} finally {
		// Quit the driver
		if (driver) {
			logInfo('Closing browser...');
			await driver.quit();
			logSuccess('Browser closed successfully');
		}
	}
}

// Run the tests
console.log('=== Starting Selenium Login Tests ===');
logInfo(
	'Make sure the test-site server is running with "npm run start-test-site"'
);
runLoginTests();
