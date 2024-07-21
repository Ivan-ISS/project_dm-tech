module.exports = {
    root: true,
    env: { browser: true, es2021: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',                             // Чтобы не импортировать React в каждый компонент (но для useEffect и т.п. нужно)
    ],
    ignorePatterns: ['build', 'dist', 'webpack.config.ts'],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'react',
        'react-refresh'
    ],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        //'react/react-in-jsx-scope': 'off',                    // Либо так (чтобы не импортировать React в каждый компонент) - отключаем правило
        'semi': 'error',
        'quotes': ['error', 'single']
    },
};
