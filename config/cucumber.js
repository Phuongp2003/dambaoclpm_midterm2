module.exports = {
	default: {
		timeout: 60000,
		publishQuiet: true,
		formatOptions: {
			snippetInterface: 'async-await',
		},
		paths: ['features/**/*.feature'],
		require: ['features/step_definitions/**/*.js'],
		format: ['progress-bar', ['html', 'reports/cucumber-report.html']],
	},
};
