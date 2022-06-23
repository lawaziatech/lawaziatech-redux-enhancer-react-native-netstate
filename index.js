import { AppState } from "react-native";
import NetInfo from "@react-native-community/netinfo";
export const FOREGROUND = "APP_STATE.FOREGROUND";
export const BACKGROUND = "APP_STATE.BACKGROUND";
export const INACTIVE = "APP_STATE.INACTIVE";
export const CONNECTED = "NETWORK_STATUS.CONNECTED";
export const DISCONNECTED = "NETWORK_STATUS.DISCONNECTED";

export default () =>
	(createStore) =>
	(...args) => {
		const store = createStore(...args);

		let currentState = false;

		// const handleAppStateChange = (nextAppState) => {
		// 	if (currentState !== nextAppState) {
		// 		let type;
		// 		if (nextAppState === "active") {
		// 			type = FOREGROUND;
		// 		} else if (nextAppState === "background") {
		// 			type = BACKGROUND;
		// 		} else if (nextAppState === "inactive") {
		// 			type = INACTIVE;
		// 		}
		// 		if (type) {
		// 			store.dispatch({
		// 				type,
		// 			});
		// 		}
		// 	}
		// 	currentState = nextAppState;
		// };
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

		// AppState.addEventListener("change", handleAppStateChange);

		// setTimeout to allow redux-saga to catch the initial state fired by redux-enhancer-react-native-appstate library
		setTimeout(() => handleNetInfoChange(NetInfo.fetch().isConnected));
		return store;
	};
