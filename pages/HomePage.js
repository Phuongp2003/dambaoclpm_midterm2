const { By, until } = require('selenium-webdriver');

class HomePage {
	constructor(driver) {
		this.driver = driver;
		// Selectors for home page elements
		this.welcomeMessage = By.css('.welcome-message');
		this.userMenu = By.css('.user-menu');
		this.logoutButton = By.css('.logout-button');
		this.dashboardElements = By.css('.dashboard-item');
		this.usernameDisplay = By.id('username-display');
	}

	async isOnHomePage() {
		try {
			const currentUrl = await this.driver.getCurrentUrl();
			return currentUrl.includes('/home.html');
		} catch (error) {
			return false;
		}
	}

	async isWelcomeMessageDisplayed() {
		try {
			await this.driver.wait(
				until.elementLocated(this.welcomeMessage),
				5000
			);
			return await this.driver
				.findElement(this.welcomeMessage)
				.isDisplayed();
		} catch (error) {
			return false;
		}
	}

	async isUserMenuDisplayed() {
		try {
			return await this.driver.findElement(this.userMenu).isDisplayed();
		} catch (error) {
			return false;
		}
	}

	async getUsernameDisplayText() {
		try {
			return await this.driver
				.findElement(this.usernameDisplay)
				.getText();
		} catch (error) {
			return null;
		}
	}

	async getDashboardElements() {
		return await this.driver.findElements(this.dashboardElements);
	}

	async logout() {
		await this.driver.findElement(this.logoutButton).click();
		// Wait for redirect to login page
		await this.driver.wait(async () => {
			const currentUrl = await this.driver.getCurrentUrl();
			return currentUrl.includes('/login.html');
		}, 5000);
	}
}

module.exports = HomePage;
