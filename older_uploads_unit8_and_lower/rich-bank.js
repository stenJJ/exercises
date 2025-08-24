const accounts = [
	{ id: 1, owner: "Alice", balance: 500 },
	{ id: 2, owner: "Bob", balance: 300 }
];

function getAccountById(id) {
	for (const account of accounts) {
		if (account.id === id) {
			return account;
		}
	}
}

function createAccount(newAccountId, newAccountOwner) {
	if (!Number.isInteger(newAccountId) || newAccountId <= 0) {
		throw new Error("Account ID must be a positive integer.")
	}
	if (getAccountById(newAccountId)) {
		throw new Error("Account with this ID already exists.");

	}
	accounts.push(
		{
			id: newAccountId,
			owner: newAccountOwner,
			balance: 0
		}
	);
}

function depositMoney(accountId, amount) {
	const account = getAccountById(accountId);

	if (!account) {
		throw new Error("Account not found");
	}
	if (!Number.isFinite(amount) || amount <= 0) {
		throw new Error("Deposite must be a positive number.")
	}

	account.balance += amount;
}

function withdrawMoney(accountId, amount) {
	const account = getAccountById(accountId);

	if (!account) {
		throw new Error("Account not found.");
	}

	if (!Number.isFinite(amount)) {
		throw new Error("The amount must be a finite number.");
	}
	if (amount <= 0) {
		throw new Error("Withdrawl has to be greater than zero.")
	}
	if (amount > account.balance) {
		throw new Error("Insuficieant funds.")
	}

	account.balance -= amount;
}

function transferMoney(fromAccountId, toAccountId, amount) {
	const fromAccount = getAccountById(fromAccountId);
	const toAccount = getAccountById(toAccountId);

	if (!fromAccount) {
		throw new Error("Source account not found.");
	}

	if (!Number.isFinite(amount) || amount < 0) {
		throw new Error("Invalid value for transfer amount: The amount must be a positive finite number.");
	}
	if (!toAccount) {
		throw new Error("To account not found.");
	}
	if (amount > fromAccount.balance) {
		throw new Error("Insuficieant funds.");
	}

	toAccount.balance += amount;
}

/*
Hints:
done
*/
