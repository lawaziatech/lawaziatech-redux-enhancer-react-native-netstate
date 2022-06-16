# redux-enhancer-react-native-netstate
Notify net state changes directly to your Redux store!

## Installation

```
npm install --save redux-enhancer-react-native-netstate

OR

yarn add redux-enhancer-react-native-netstate
```

## Usage

When you create your Redux store, add the enhancer:

```javascript
import { createStore } from 'redux';
import applyNetStateListener from 'redux-enhancer-react-native-netstate';

...

const store = createStore(reducers, initalState, [
  applyNetStateListener(),
]);
```

The store will now automatically dispatch net state related actions.

For instance, you can use it in a reducer:
```javascript
import { ONLINE, OFFLINE } from 'redux-enhancer-react-native-netstate';

function reducer(state = '', action) {
  switch (action.type) {
    case ONLINE:
      return 'app is online';
    case OFFLINE:
      return 'app is offline';    
    default:
      return state
  }
}
```

