export interface ProductModel {
	id: string;
	title: string;
	imageURL: string;
	price: number;
	addToCart(product: ProductModel): void;
}

export interface CartItemModel {
	product: ProductModel;
	quantity: number;
	removeFromCart(product: ProductModel): void;
}
export interface StripeProductModel {
	id: string;
	name: string;
	description: string;
	images: string[];
	default_price: {
		unit_amount: number;
	};
}

export enum Mode {
	Loading = "loading",
	Login = "login",
	Register = "register",
	Shop = "shop",
	Confirm = "confirm",
}
