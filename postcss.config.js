module.exports = () => ({
	plugins: {
		'stylelint': {
			"extends": "stylelint-config-standard",
			"rules": {
				"max-empty-lines": 2
			}
		},
		'postcss-import': {},
		'postcss-preset-env': {
			browsers: 'last 2 versions',
		},
		'precss': {},
		'postcss-cssnext': {},
		'postcss-advanced-variables': {},
		'postcss-media-minmax': {},
		'postcss-extend': {},
		'postcss-mixins': {},
		'postcss-color-function': {},
		'postcss-conditionals': {},
		'postcss-short': {},
		'postcss-define-property': {},
		'postcss-simple-vars': {},
		'postcss-nesting': {},
		'postcss-for': {},
		'postcss-calc': {
			"mediaQueries": true,
			"preserve": true,
			"selectors": true
		},
		'cssnano': {
			preset: ['default', {
				discardComments: {
					removeAll: true,
				},
				'autoprefixer': true
			}]
		},
	},
});