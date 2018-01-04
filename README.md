# simple-observer [![Build Status](https://www.travis-ci.org/zhw2590582/simple-observer.svg?branch=master)](https://www.travis-ci.org/zhw2590582/simple-observer)

> A simple observer with ES6 Proxy

## Install

```
$ npm i -S simple-observer
```

## Usage

```js
const { observable, observe, unobserve, isObservable } = require('simple-observer');

// Can't observe for symbol property and Set/Map/WeakSet/WeakMap value.
let baseState = {
	aString: 'hi',
	anArray: [1, 2, 3, [4, 5], { mix: 0 }],
	anObject: {
		a: 'shallow',
		b: {
			c: 'deep'
		},
		mix: [0]
	}
};

// Creates and returns an observable object.
const proxyState = observable(baseState);

// Turns the passed function into a reaction, then executes and returns it. 
const logger = observe(() => console.log(proxyState));

setTimeout(() => (proxyState.aString = 'wrold'));
setTimeout(() => proxyState.anArray.push(6));
setTimeout(() => proxyState.anArray[3].push(6));
setTimeout(() => proxyState.anArray.pop());
setTimeout(() => proxyState.anArray[3].pop());
setTimeout(() => (proxyState.anObject.a = 'shallow change'));
setTimeout(() => (proxyState.anObject.b.c = 'deep change'));
setTimeout(() => delete proxyState.anObject.a);
setTimeout(() => delete proxyState.anObject.b.c);
setTimeout(() => (proxyState.anArray[4].mix = 1));
setTimeout(() => proxyState.anObject.mix.push(1));

// remove the observe
unobserve(logger);

// Returns true if the passed object is an observable
isObservable(proxyState);
```

## Related

- [observer-util](https://github.com/nx-js/observer-util) - An NX utility, responsible for powerful data observation with ES6 Proxies.

## License

MIT © [Harvey Zack](https://www.zhw-island.com/)
