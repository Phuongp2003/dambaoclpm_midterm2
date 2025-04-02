# Selenium Tests với NodeJS và Cucumber

Project này triển khai automated testing sử dụng Selenium WebDriver với NodeJS, Cucumber cho BDD, và CI/CD với GitHub Actions.

## Yêu cầu

-   Node.js (v16 hoặc mới hơn)
-   Microsoft Edge hoặc Chrome browser
-   Trình điều khiển tương ứng (Edge WebDriver hoặc ChromeDriver)

## Cấu trúc project

-   `features/`: Cucumber feature files và step definitions
-   `pages/`: Page Object Models
-   `test-site/`: Website đơn giản để test
-   `config/`: Cấu hình
-   `.github/workflows/`: GitHub Actions workflow
-   `test.js`: Kiểm thử đơn giản sử dụng Selenium WebDriver trực tiếp

## Cài đặt

```bash
npm install
```

## Chạy tests

-   Khởi động test website:

```bash
npm run start-test-site
```

-   Chạy tests với Cucumber (BDD):

```bash
npm test
```

-   Chạy kiểm thử đơn giản (không sử dụng Cucumber):

```bash
npm run test:simple
```

## Kiểm thử đơn giản

Kiểm thử đơn giản (`test.js`) là một cách nhanh chóng để kiểm tra tính năng đăng nhập mà không cần đến Cucumber. Nó thực hiện hai kiểm thử:

1. Đăng nhập không thành công (sử dụng thông tin không hợp lệ)
2. Đăng nhập thành công (sử dụng thông tin hợp lệ)

Đây là cách tuyệt vời để bắt đầu nếu bạn mới làm quen với Selenium hoặc cần một bài kiểm tra nhanh.

## Lựa chọn trình duyệt

Mặc định, các tests sử dụng Microsoft Edge. Nếu bạn muốn sử dụng Chrome, bạn cần thay đổi:

```javascript
// Từ:
const edge = require('selenium-webdriver/edge');
// ...
const edgeOptions = new edge.Options();
// ...
driver = new Builder()
	.forBrowser('MicrosoftEdge')
	.setEdgeOptions(edgeOptions)
	.build();

// Thành:
const chrome = require('selenium-webdriver/chrome');
// ...
const chromeOptions = new chrome.Options();
// ...
driver = new Builder()
	.forBrowser('chrome')
	.setChromeOptions(chromeOptions)
	.build();
```

## CI/CD với GitHub Actions

Tests sẽ tự động chạy khi push code lên GitHub qua GitHub Actions workflow.

## Hướng dẫn sử dụng

1. Clone repository về máy
2. Cài đặt dependencies: `npm install`
3. Khởi động test website: `npm run start-test-site`
4. Chạy tests: `npm test` hoặc `npm run test:simple`

Khi đẩy code lên GitHub, GitHub Actions sẽ tự động chạy tests theo workflow đã định nghĩa.
