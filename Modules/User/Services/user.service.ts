const getAllUsers = () => {
  return [
    { name: "user 1", age: 12 },
    { name: "user 2", age: 13 },
    { name: "user 3", age: 14 },
  ];
};

const addUser = (user: any) => {
  console.log(user);
  return user;
};

export { getAllUsers, addUser };
