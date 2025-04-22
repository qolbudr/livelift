import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { enc } from 'crypto-js';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(403).send({
      message: 'Metode yang diizinkan hanya POST',
      code: 403,
    });
  }

  try {
    const { name, phone, email, password } = await req.body;

    const encryptedPassword = await bcrypt.hash(password, 8);

    await prisma.users.create({
      data: {
        name: name,
        phone: phone,
        email: email,
        password: encryptedPassword,
        packageId: 1,
        tenant: "https://tenant.livelift.site",
      },
    });

    return res.status(200).send({message: 'Register berhasil', code: 200});
  } catch (e) {
    return res.status(500).send({
      message: `${e}`,
      code: 500,
    });
  }
}