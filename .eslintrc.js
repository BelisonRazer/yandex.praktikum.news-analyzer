module.exports = {
    "extends":[
        "airbnb", "prettier", "plugin:node/recommended"
    ],
    "plugins": [
        "prettier",
    ],
    "rules": {
        "prettier/prettier": "error",
        "no-unused-vars": "warn",
        "no-console": "off",
        "func-names": "off",
        "no-process-exit": "off",
        "object-shorthand": "off",
        "class-methods-use-this": "off",
        "node/no-unpublished-require": "off",
        "no-undef": "off",
        "no-else-return": "off",
        "no-plusplus": "off",
        "max-classes-per-file": "off",
        "no-new": "off",
        "no-inner-declarations": "off",
        "node/no-unsupported-features/es-syntax": "off",
    },
    "parserOptions" : {
        "sourceType": "module",
   }
};