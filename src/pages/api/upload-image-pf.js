import fsPromises from 'fs/promises';
import path from 'path';

const imagePath = path.join(process.cwd(), 'public/nfts/profiles/');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { image, imageName } = req.body;

    const buffer = Buffer.from(image, 'base64');
    const imagePaths = path.join(imagePath, imageName);
    await fsPromises.writeFile(imagePaths, buffer);

    res.status(201).json({ imageUrl: `/nfts/profiles/${imageName}` });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
