export default eventHandler(async (event) => {
  const auth = await requireAuthSession(event);
  const { id } = await readBody(event);
  const user = await findUserByEmail(auth.data.email);
  const tracking = await prisma.tracking.delete({
    where: { id, userId: user.id },
  });
  return tracking;
});
