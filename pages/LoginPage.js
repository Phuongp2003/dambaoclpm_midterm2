const { By, until } = require('selenium-webdriver');

class LoginPage {
	constructor(driver) {
		this.driver = driver;
		this.baseUrl = 'http://localhost:3000';
		// Selectors for login page elements
		this.usernameInput = By.id('username');
		this.passwordInput = By.id('password');
		this.loginButton = By.id('login-button');
		this.errorMessage = By.id('error');
	}

	async navigate(url = `${this.baseUrl}/login.html`) {
		await this.driver.get(url);
	}

	async enterUsername(username) {
		await this.driver.findElement(this.usernameInput).clear();
		await this.driver.findElement(this.usernameInput).sendKeys(username);
	}

	async enterPassword(password) {
		await this.driver.findElement(this.passwordInput).clear();
		await this.driver.findElement(this.passwordInput).sendKeys(password);
	}

	async clickLoginButton() {
		await this.driver.findElement(this.loginButton).click();
	}

	async login(username, password) {
		await this.enterUsername(username);
		await this.enterPassword(password);
		await this.clickLoginButton();
	}

	async getErrorMessage() {
		try {
			await this.driver.wait(
				until.elementLocated(this.errorMessage),
				5000
			);
			return await this.driver.findElement(this.errorMessage).getText();
		} catch (error) {
			return null;
		}
	}
}

module.exports = LoginPage;
