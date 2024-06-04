import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'public/nfts');
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing the files:', err);
        return res.status(500).json({ message: 'Error parsing the files' });
      }

      try {
        const filePath = path.join(process.cwd(), 'src/pages/components/form.json');

        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, JSON.stringify([]));
        }

        const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const newData = {
          id: existingData.length + 1,
          title: fields.title,
          saleEndDate: fields.saleEndDate,
          name: 'JohnDeo',
          price: fields.price,
          currency: fields.currency,
          description: fields.description,
        };

        existingData.push(newData);
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

        res.status(200).json({ message: 'Data stored successfully' });
      } catch (error) {
        console.error('Error storing the data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
