module.exports = {
    extends: 'stylelint-config-standard',
    rules: {
        'function-url-quotes': 'never',
        'indentation': 4,
        'string-quotes': 'single',
        'color-hex-case': 'upper',
        'color-hex-length': 'long',
        'declaration-block-properties-order': 'alphabetical',
        'selector-pseudo-class-no-unknown': [true, {
            ignorePseudoClasses: ['local']
        }]
    },
    ignoreFiles :[
        'src/public/fonts/icons/**'  //Ignore lint rules for IcoMoon generated resources 
        ]
};
