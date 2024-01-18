export default eventHandler(async (event) => {
  const { email, password, name } = await readBody(event);
  await createUser({
    email,
    name,
    password: password,
  });
  return {
    message: "Successfully registered!",
  };
});
