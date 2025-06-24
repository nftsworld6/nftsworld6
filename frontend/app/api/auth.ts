// API وهمي لتسجيل الدخول (للتجربة فقط)
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (email === 'admin@email.com' && password === 'admin123') {
      res.status(200).json({ success: true, user: { id: 1, name: 'مدير', email } });
    } else {
      res.status(401).json({ success: false, message: 'بيانات الدخول غير صحيحة' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
