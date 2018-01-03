const { observable, observe } = require('../src');

test('Observe string', done => {
	const proxyData = observable(createState());
	observe(() => {
		expect(proxyData.aString).toBe('wrold');
	});
	setTimeout(() => (proxyData.aString = 'wrold'));
});

function createState() {
	return {
		aString: 'hi',
		anArray: [1, 2, 3, [4, 5]],
		anObject: {
			a: {
				c: 'deep'
			},
			b: 'shallow'
		}
	};
}
