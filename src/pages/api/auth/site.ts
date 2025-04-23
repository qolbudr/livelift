import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const tenant: string = req.query.tenant as string; 
  const data = await prisma.users.findFirst({ where: { tenant: { equals: tenant } }, include: { package: true } });
  return res.status(200).send({
    code: 200,
    message: 'Sukses mengambil data paket',
    data: data?.package,
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.method !== 'GET'
  ) {
    return res.status(403).send({
      message: 'Metode yang diizinkan hanya GET',
      code: 403,
    });
  }

  try {
    if (req.method === 'GET') getHandler(req, res);
  } catch (e) {
    return res.status(500).send({
      message: `${e}`,
      code: 500,
    });
  }
}
