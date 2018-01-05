const { observable, observe, unobserve, isObservable } = require('..');

const ASYMBOL = Symbol('aSymbol');

test('Observe string change', done => {
	const proxyData = observable(createState());
	observe(() => {
		expect(proxyData.aString).toBe('world');
		done();
	});
	setTimeout(() => (proxyData.aString = 'world'));
});

test('Observe number change', done => {
	const proxyData = observable(createState());
	observe(() => {
		expect(proxyData.aNumber).toBe(1);
		done();
	});
	setTimeout(() => (proxyData.aNumber = 1));
});

test('Observe Symbol change', done => {
	const proxyData = observable(createState());
	observe(() => {
		expect(proxyData[ASYMBOL]).toBe('aSymbol change');
		done();
	});
	setTimeout(() => (proxyData[ASYMBOL] = 'aSymbol change'));
});

test('Observe array shallow push method', done => {
	const proxyData = observable(createState());
	observe(() => {
		expect(proxyData.anArray).toHaveLength(6);
		done();
	});
	setTimeout(() => proxyData.anArray.push(6));
});

test('Observe array deep push method', done => {
	const proxyData = observable(createState());
	observe(() => {
		expect(proxyData.anArray[3]).toHaveLength(3);
		done();
	});
	setTimeout(() => proxyData.anArray[3].push(6));
});

test('Observe array shallow pop method', done => {
	const proxyData = observable(createState());
	observe(() => {
		expect(proxyData.anArray).toHaveLength(4);
		done();
	});
	setTimeout(() => proxyData.anArray.pop());
});

test('Observe array deep pop method', done => {
	const proxyData = observable(createState());
	observe(() => {
		expect(proxyData.anArray[3]).toHaveLength(1);
		done();
	});
	setTimeout(() => proxyData.anArray[3].pop());
});

test('Observe object shallow change', done => {
	const proxyData = observable(createState());
	observe(() => {
		expect(proxyData.anObject.a).toBe('shallow change');
		done();
	});
	setTimeout(() => (proxyData.anObject.a = 'shallow change'));
});

test('Observe object deep change', done => {
	const proxyData = observable(createState());
	observe(() => {
		expect(proxyData.anObject.b.c).toBe('deep change');
		done();
	});
	setTimeout(() => (proxyData.anObject.b.c = 'deep change'));
});

test('Observe object shallow delete', done => {
	const proxyData = observable(createState());
	observe(() => {
		expect(proxyData.anObject.a).toBe(undefined);
		done();
	});
	setTimeout(() => delete proxyData.anObject.a);
});

test('Observe object deep delete', done => {
	const proxyData = observable(createState());
	observe(() => {
		expect(proxyData.anObject.b.c).toBe(undefined);
		done();
	});
	setTimeout(() => delete proxyData.anObject.b.c);
});

test('Observe array mix object change', done => {
	const proxyData = observable(createState());
	observe(() => {
		expect(proxyData.anArray[4].mix).toBe(1);
		done();
	});
	setTimeout(() => (proxyData.anArray[4].mix = 1));
});

test('Observe object mix array change', done => {
	const proxyData = observable(createState());
	observe(() => {
		expect(proxyData.anObject.mix).toHaveLength(2);
		done();
	});
	setTimeout(() => proxyData.anObject.mix.push(1));
});

test('isObservable', () => {
	const proxyData = observable(createState());
	expect(isObservable(proxyData)).toBe(true);
});

function createState() {
	return {
		aString: 'hi',
		aNumber: 0,
		[ASYMBOL]: 'aSymbol',
		anArray: [1, 2, 3, [4, 5], { mix: 0 }],
		anObject: {
			a: 'shallow',
			b: {
				c: 'deep'
			},
			mix: [0]
		}
	};
}
