const users = [
  { firstName: "John", lastName: "Doe", points: 120 },
  { firstName: "Jane", lastName: "Smith", points: 90 },
  { firstName: "Alice", lastName: "Johnson", points: 150 },
  { firstName: "Bob", lastName: "Brown", points: 75 }
];

const updatedUsers = users.map(user => {
  return {
    fullName: `${user.firstName} ${user.lastName}`,
    membershipStatus: user.points > 100 ? "Premium" : "Standard"
  };
});

console.log(updatedUsers);
