const observeSet = new Set();
const observableSet = new Set();

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

let nextTick = task => {
	Promise.resolve().then(task);
};

let handler = {
	get(obj, key, receiver) {
		const result = Reflect.get(obj, key, receiver);
		return result;
	},
	set(target, prop, value) {
		console.log(target, prop, value);
		runObserveSet();
	},
	ownKeys(target) {
		return Reflect.ownKeys(target);
	},
	deleteProperty(obj, key) {
		runObserveSet();
		return Reflect.deleteProperty(obj, key);
	}
};

let observable = (obj = {}) => {
	if (typeof obj !== 'object') {
		throw new TypeError('First argument must be an object or undefined');
	}
	if (observableSet.has(obj)) return obj;
	return new Proxy(obj, handler);
};

module.exports = {
	observable,
	observe,
	unobserve,
	isObservable
};
