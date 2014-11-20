/// <reference path="../../intern" />
import assert = require('intern/chai!assert');
import Event = require('../../../Event');
import ObservableEvented = require('../../../ObservableEvented');
import registerSuite = require('intern!object');

registerSuite({
	name: 'mayhem/ObservableEvented',

	'#emit/on'() {
		var evented = new ObservableEvented();
		var count = 0;
		var event = new Event({
			type: 'a-test'
		});

		evented.on('a-test', function (event) {
			assert.isUndefined(event.target);
			count++;
		});
		evented.emit(event);
		assert.strictEqual(count, 1, 'Event count should have been incremented');

		evented.on('b-test', function (event) {
			assert.strictEqual(event.target, 'test target');
		});
		event.target = 'test target';
		event.type= 'b-test';
		evented.emit(event);
	}
});