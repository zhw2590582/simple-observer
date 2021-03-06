const observeSet = new Set();
const observableSet = new Set();

const isArray = value => !!value && Array.isArray(value);

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
	runningObserveSet.forEach(reaction => nextTick(reaction));
};

let unobserve = reaction => {
	if (typeof reaction !== 'function') {
		observeSet.delete(reaction);
	}
	else {
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
		try {
			return new Proxy(obj[key], handler);
		}
		catch (err) {
			return Reflect.get(obj, key, receiver);
		}
	},
	defineProperty(obj, key, descriptor) {
		let result = Reflect.defineProperty(obj, key, descriptor);
		if (isArray(obj) && key === 'length'){
			return result;
		}
		result && runObserveSet();
		return result;
	},
	deleteProperty(obj, key) {
		// 排除属性不可配置，但属性不存在时依然返回true
		let hasOwnProperty = obj.hasOwnProperty(key);
		let result = Reflect.deleteProperty(obj, key);
		if (hasOwnProperty && result) {
			runObserveSet();
		}
		return result;
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
