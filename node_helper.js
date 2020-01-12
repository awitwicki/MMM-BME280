'use strict';

/* Magic Mirror
 * Module: MMM-BME280
 *
 * By Andrew Witwicki
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const exec = require('child_process').exec;

module.exports = NodeHelper.create({
	start: function () {
		console.log('BME280 helper started ...');
	},

	// Subclass socketNotificationReceived received.
	socketNotificationReceived: function (notification, payload) {
		const self = this;
		if (notification === 'REQUEST') {
			const self = this
			this.config = payload

			// execute external DHT Script
			exec("sudo ./modules/MMM-BME280/bme.sh ", (error, stdout) => {
				if (error) {
					console.error(`exec error: ${error}`);
					return;
				}
				var arr = stdout.split(" ");
				// Send data
				self.sendSocketNotification('DATA', {
					temp: arr[0],
					humidity: arr[1],
					press: arr[2],
				});
			});
		}
	}
});