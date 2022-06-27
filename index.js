import NetInfo from "@react-native-community/netinfo";
const CONNECTED = "CONNECTED";
const DISCONNECTED = "DISCONNECTED";

export default () =>
	(createStore) =>
	(...args) => {
		const store = createStore(...args);

		let currentState = false;
		const handleNetInfoChange = (isConnected) => {
			if (currentState !== isConnected) {
				if (isConnected) {
					store.dispatch({ type: "CONNECTED" });
				} else {
					store.dispatch({ type: "DISCONNECTED" });
				}
				currentState = isConnected;
			}
		};
		NetInfo.addEventListener((state) => {
			handleNetInfoChange(state.isConnected);
		});

		// setTimeout to allow redux-saga to catch the initial state fired by redux-enhancer-react-native-netstate library
		setTimeout(() => handleNetInfoChange(NetInfo.fetch().isConnected));
		return store;
	};

export const initialState = {
	isConnected: false,
};
export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case CONNECTED:
			return { ...state, isConnected: true };
		case DISCONNECTED:
			return { ...state, isConnected: false };
		default:
			return state;
	}
};
