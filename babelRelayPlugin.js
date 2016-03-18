/* eslint-disable */

var getBabelRelayPlugin = require('babel-relay-plugin');
var schema = require('./dist/schema.json');

module.exports = getBabelRelayPlugin(schema.data);
