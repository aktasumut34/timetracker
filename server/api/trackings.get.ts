export default eventHandler(async (event) => {
  const auth = await requireAuthSession(event);
  const trackings = await prisma.tracking.findMany({
    where: { user: { email: auth.data.email } },
    orderBy: { createdAt: "desc" },
  });
  return trackings;
});
