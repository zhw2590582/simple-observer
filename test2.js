import { observable, observe } from '.';

const proxyData = observable(new Set());
observe(() => {
	console.log(proxyData);
});
setTimeout(() => (proxyData.add(0)));

function createState() {
	return {
		aString: 'hi',
		aSet: new Set(),
		aMap: new Map(),
		anArray: [1, 2, 3, [4, 5], { mix: 0 }],
		anObject: {
			a: {
				c: 'deep'
			},
			b: 'shallow'
		}
	};
}