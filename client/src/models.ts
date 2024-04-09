interface ProductModel {
	id: string;
	title: string;
	imageURL: string;
	price: number;
	addToCart(product: ProductModel): void;
}

interface CartItemModel {
	product: ProductModel;
	quantity: number;
	removeFromCart(product: ProductModel): void;
}
interface StripeProductModel {
	id: string;
	name: string;
	description: string;
	images: string[];
	default_price: {
		unit_amount: number;
	};
}
