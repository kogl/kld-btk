import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from "../categories/category.types";
import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { CartItems } from "../../components/cart-dropdown/cart-dropdown.styles";


const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
	const existingCartItems = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	if (existingCartItems) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
	const existingCartItems = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);

	// kolla om quantity = 1 om det aer so raddera fron cart
	if (existingCartItems && existingCartItems.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}
	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] =>
	cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>



export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen =>
	createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean))

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems =>
	createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))


export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return setCartItems(newCartItems)
};

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove);
	return setCartItems(newCartItems)
};

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
	const newCartItems = clearCartItem(cartItems, cartItemToClear);
	return setCartItems(newCartItems)
};