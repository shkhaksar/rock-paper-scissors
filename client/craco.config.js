// Create React App Configuration Override @see: https://github.com/gsoft-inc/craco
const CracoAlias = require("craco-alias");
const CracoAntDesignPlugin = require("craco-antd");
const CracoLessPlugin = require('craco-less-plugin');

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "jsconfig",
                baseUrl: "./src"
            }
        },
        {
            plugin: CracoAntDesignPlugin
        },
        {
            plugin: CracoLessPlugin,
            options: {
                javascriptEnabled: true
            }
        }
    ],
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    }
};