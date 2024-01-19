export default eventHandler(async (event) => {
  const auth = await requireAuthSession(event);
  const { time, description } = await readBody(event);
  const user = await findUserByEmail(auth.data.email);
  const log = await prisma.tracking.create({
    data: {
      description,
      duration: time,
      user: { connect: { id: user.id } },
    },
  });
  return log;
});
