// src/pages/api/ussd.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { processUSSDCommand } from '@/services/USSDService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { command } = req.body;
  try {
    const response = await processUSSDCommand(command);
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process USSD' });
  }
}
