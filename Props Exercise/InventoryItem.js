function InventoryItem({ name, type, quantity = 0, price = 0 }) {
	const totalValue = quantity * price;

	return (
		<div>
			<h2>{name}</h2>
			<p>Type: {type}</p>
			<p>Quantity: {quantity}</p>
			<p>Price: ${price.toFixed(2)}</p>

			{quantity < 5 && (
				<Message>🚨 Low stock! Consider restocking soon.</Message>
			)}

			{totalValue > 1000 && (
				<Message>💎 High-value item! Extra protection recommended.</Message>
			)}
		</div>
	);
}