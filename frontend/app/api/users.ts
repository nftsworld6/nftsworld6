// API وهمي للمستخدمين (لأغراض لوحة التحكم)
import type { NextApiRequest, NextApiResponse } from 'next';

const mockUsers = [
  { id: 1, name: 'أحمد', email: 'ahmed@email.com' },
  { id: 2, name: 'سارة', email: 'sara@email.com' },
  { id: 3, name: 'محمد', email: 'mohamed@email.com' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(mockUsers);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
