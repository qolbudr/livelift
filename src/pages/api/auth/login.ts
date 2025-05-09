import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(403).send({message: 'Metode yang diizinkan hanya POST', code: 403});
  const { email, password } = await req.body;

  try {
    // Find user by email
    const user = await prisma.users.findFirst({include: { package: true }, where: { email: { contains: email } }});
    
    // Check if user exists
    if (!user) return res.status(401).send({message: 'Email atau password yang Anda masukkan salah. Silakan coba lagi.', code: 401});
    
    // Check if user is verified
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send({message: 'Email atau password yang Anda masukkan salah. Silakan coba lagi.', code: 401});
    
    // Sign token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string);

    return res.status(200).send({message: 'Login berhasil', data: user, token, code: 200});
  } catch (e) {
    return res.status(500).send({message: `${e}`, code: 500});
  }
}