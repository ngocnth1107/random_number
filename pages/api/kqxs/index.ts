import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const result = await prisma.kqxs.update({
    where: { id: '1' },
    data: {
      ...req.body
    },
  });
  res.json(result);
}