import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";


import { Elements } from '@stripe/react-stripe-js';

import {stripePromise} from './utils/stripe/stripe.utils'

// import reportWebVitals from "./reportWebVitals";
import App from "./App";
// import { UserProvider } from "./context/user.context";
// import { CategoriesProvider } from "./context/categories.context";
// import { CartProvider } from "./context/cart.context";
import { store, persistor } from "./store/store";

import "./index.scss";

const rootElement = document.getElementById("root");


ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor} >
				<BrowserRouter>
					<Elements stripe={stripePromise}>
						{/* <CategoriesProvider> */}
						{/* <CartProvider> */}
						<App />
						{/* </CartProvider> */}
						{/* </CategoriesProvider > */}
					</Elements>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
