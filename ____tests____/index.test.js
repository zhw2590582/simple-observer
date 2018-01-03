const { observable, observe } = require('../src');

let baseState;
beforeEach(() => {
	baseState = createBaseState();
});

test('observable', () => {
	const proxyData = observable(baseState);
	observe(() => console.log(`${proxyData.aProp} ${person.anObject.coffee}`));
	console.log(proxyData.aProp);
	expect(true).toBe(true);
});

function createBaseState() {
	return {
		anArray: [3, 2, { c: 3 }, 1],
		aProp: 'hi',
		anObject: {
			nested: {
				yummie: true
			},
			coffee: false
		}
	};
}
