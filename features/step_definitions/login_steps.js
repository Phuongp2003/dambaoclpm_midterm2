const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');
const { expect } = require('chai');
const LoginPage = require('../../pages/LoginPage');
const HomePage = require('../../pages/HomePage');

let driver;
let loginPage;
let homePage;

// Increase timeout to match successful test
setDefaultTimeout(10000);

// Add color logging functions
function logSuccess(message) {
	console.log('\x1b[32m%s\x1b[0m', message); // Green color
}

function logInfo(message) {
	console.log('\x1b[36m%s\x1b[0m', message); // Cyan color
}

function logError(message) {
	console.log('\x1b[31m%s\x1b[0m', message); // Red color
}

Given('I am on the login page', async function () {
	try {
		logInfo('Initializing Edge driver...');

		// Configure Edge options
		const edgeOptions = new edge.Options();
		edgeOptions.addArguments('--no-sandbox');
		edgeOptions.addArguments('--disable-dev-shm-usage');
		edgeOptions.addArguments('--disable-gpu');
		edgeOptions.addArguments('--window-size=1920,1080');

		// Build driver with Edge options
		driver = new Builder()
			.forBrowser('MicrosoftEdge')
			.setEdgeOptions(edgeOptions)
			.build();

		logSuccess('Edge driver initialized successfully');

		// Initialize the page objects
		loginPage = new LoginPage(driver);
		homePage = new HomePage(driver);

		logInfo('Navigating to login page...');
		await loginPage.navigate('http://localhost:3000/login.html');

		// Use explicit wait with better condition
		await driver.wait(until.titleContains('Login'), 10000);
		logSuccess('Login page loaded successfully');
	} catch (error) {
		logError(`Error during login page setup: ${error}`);
		// Make sure we quit the driver if it was created
		if (driver) {
			await driver.quit();
		}
		throw error;
	}
});

When('I enter valid credentials', async function () {
	logInfo('Entering valid credentials...');
	await loginPage.enterUsername('validuser');
	await loginPage.enterPassword('validpassword');
	logSuccess('Valid credentials entered');
});

When('I enter invalid credentials', async function () {
	logInfo('Entering invalid credentials...');
	await loginPage.enterUsername('invaliduser');
	await loginPage.enterPassword('invalidpassword');
	logSuccess('Invalid credentials entered');
});

When('I click the login button', async function () {
	logInfo('Clicking login button...');
	await loginPage.clickLoginButton();
	logSuccess('Login button clicked');
});

Then('I should be logged in successfully', async function () {
	try {
		logInfo('Waiting for redirect to home page...');
		// Wait for redirection to home page
		await driver.wait(async () => {
			const currentUrl = await driver.getCurrentUrl();
			return currentUrl.includes('/home.html');
		}, 5000);

		logInfo('Successfully redirected to home page');

		// Use HomePage POM to check welcome message
		const welcomeDisplayed = await homePage.isWelcomeMessageDisplayed();
		expect(welcomeDisplayed).to.be.true;

		// Check user menu is displayed
		const userMenuDisplayed = await homePage.isUserMenuDisplayed();
		expect(userMenuDisplayed).to.be.true;

		// Check dashboard elements
		const dashboardElements = await homePage.getDashboardElements();
		expect(dashboardElements.length).to.be.greaterThan(0);

		logSuccess(
			'✓ Login successful test passed: Home page elements verified correctly'
		);
	} catch (error) {
		logError(`✗ Login successful test failed: ${error}`);
		throw error;
	} finally {
		await driver.quit();
	}
});

Then('I should see an error message', async function () {
	try {
		logInfo('Waiting for error message...');
		// Use LoginPage POM to get error message
		const errorMessage = await loginPage.getErrorMessage();
		expect(errorMessage).to.include('Invalid credentials');
		logSuccess(
			'✓ Invalid login test passed: Error message displayed correctly'
		);
	} catch (error) {
		logError(`✗ Invalid login test failed: ${error}`);
		throw error;
	} finally {
		await driver.quit();
	}
});
