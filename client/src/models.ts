interface ProductModel {
	id: string;
	title: string;
	price: number;
	addToCart(product: ProductModel): void;
}

interface CartItemModel {
	product: ProductModel;
	quantity: number;
	removeFromCart(product: ProductModel): void;
}
