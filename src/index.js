const observeSet = new Set();
const observableSet = new Set();

let nextTick = task => {
	Promise.resolve().then(task);
};

let observe = reaction => {
	if (typeof reaction !== 'function') {
		throw new TypeError('Reactions must be functions.');
	}
	if (observeSet.has(reaction)) return reaction;
	observeSet.add(reaction);
	return reaction;
};

let runObserveSet = () => {
	const runningObserveSet = new Set();
	observeSet.forEach(reaction => runningObserveSet.add(reaction));
	runningObserveSet.forEach(reaction => reaction());
};

let unobserve = reaction => {
	if (typeof reaction !== 'function') {
		observeSet.delete(reaction);
	} else {
		observeSet.clear();
	}
};

let isObservable = obj => {
	if (typeof obj !== 'object') {
		throw new TypeError('First argument must be an object');
	}
	return observableSet.has(obj);
};

let handler = {
	get(obj, key, receiver) {
		const result = Reflect.get(obj, key, receiver);
		return result;
	},
	set(obj, key, value, receiver) {
		let oldVal = Reflect.get(obj, key, receiver);
		if (oldVal !== value) {
			runObserveSet();
		}
		return Reflect.set(obj, key, value, receiver);
	},
	ownKeys(target) {
		return Reflect.ownKeys(target);
	},
	deleteProperty(obj, key) {
		if (obj.hasOwnProperty(key)) {
			runObserveSet();
		}
		return Reflect.deleteProperty(obj, key);
	}
};

let observable = obj => {
	obj = obj || {};
	if (typeof obj !== 'object') {
		throw new TypeError('First argument must be an object or undefined');
	}
	if (observableSet.has(obj)) return obj;
	let proxyObj = new Proxy(obj, handler);
	observableSet.add(proxyObj);
	return proxyObj;
};

module.exports = {
	observable,
	observe,
	unobserve,
	isObservable
};
