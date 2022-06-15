# Pubstore

A microscopic pubsub-based store utility for building HTML/CSS-first apps without the bloat and boilerplate of a full-fledged frontend framework.

## Installation

```
npm i pubstore
```

## Usage

Import constructor:

```js
import { makePubstore } from "pubstore"
```

Make your store for a given variable with a default value:

```js
const [subVar, unsubVar, pubVar, var] = makePubstore(0)
```

Replace `var` and `Var` with whatever name you wish, e.g., `subCount`.

Subscribe functions to receive updates from the store:

```js
subVar(var => { console.log(var) })
```

Publish updates, usually via events:

```js
document.getElementById("my-button").onclick = () => {
    pubVar(oldVar => oldVar + 1)
}
```

Publish functions must take a function that accepts the old value and returns a new value. If you don't need the old value, you can simple use:

```js
pubVar(() => 7)
```

Any subscribing functions will be called with the updated value, *only* if the value has changed. This allows you to cut down on DOM updates.

You can also peek at the current value of a store:

```js
const currVar = var()
```

## Examples

There are additional examples in the `examples` directory. To run them, be sure `pubstore` is installed, then from the main package directory, type:

```
npx parcel examples/<example>/index.html
```

Parcel provides a simple dev server that doesn't need to be installed in a package, and facilitates ES6 module style.
