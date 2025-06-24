// API وهمي لنتائج البحث العقاري (سيتم ربطه لاحقًا بقاعدة بيانات حقيقية)
import type { NextApiRequest, NextApiResponse } from 'next';

const mockProperties = [
  { id: 1, name: 'شقة فاخرة قرب المدارس', lat: 30.05, lng: 31.25, price: '2 ETH', status: 'تحت الإنشاء', images: [], panorama: '' },
  { id: 2, name: 'فيلا حديثة في التجمع', lat: 30.01, lng: 31.30, price: '5 ETH', status: 'جاهزة', images: [], panorama: '' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { q } = req.query;
    if (q) {
      const results = mockProperties.filter(p => p.name.includes(q as string));
      res.status(200).json(results);
    } else {
      res.status(200).json(mockProperties);
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
