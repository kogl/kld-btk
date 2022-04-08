import { useEffect, } from "react";
import { useDispatch } from 'react-redux'

import { Routes, Route } from "react-router-dom";

import { onAuthStateChangedListner, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";

import Start from "./routes/start/start.component";

import Navigation from "./routes/navigation/navigation.componet";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component"
import Checkout from "./routes/checkout/checkout.component"
import { setCurrentUser } from "./store/user/user.action";


export const App = () => {


	const dispatch = useDispatch()
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListner((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			dispatch(setCurrentUser(user))

		});
		return unsubscribe;
		// [dispatch] to take away eslint error [] work as well 
	}, [dispatch]);
	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Start />} />
				<Route path="shop/*" element={<Shop />} />
				<Route path="auth" element={<Authentication />} />
				<Route path="checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
};
export default App;
