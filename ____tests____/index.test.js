const { observable, observe } = require('../src');

let baseState;
beforeEach(() => {
	baseState = createBaseState();
})

test('observable', () => {
	const proxyData = observable(baseState);
	observe(() => console.log(proxyData));
	proxyData.aString = 'wrold';
	expect(true).toBe(true);
});

function createBaseState() {
	return {
		aString: 'hi',
		aBoolean: false,
		aNumber: 1,
		aDate: new Date(),
		aSet: new Set(),
		aMap: new Map(),
		[Symbol('aSymbol')]: 'symbol',
		anArray: [1, 2, 3, [4, 5]],
		anObject: {
			a: {
				c: true
			},
			b: false
		}
	};
}

