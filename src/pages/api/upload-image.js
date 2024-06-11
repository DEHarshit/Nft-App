import fsPromises from 'fs/promises';
import path from 'path';

const imagePath = path.join(process.cwd(), 'public/nfts');
const filePath = path.join(process.cwd(), 'components', 'form.json');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            if (req.url === '/api/upload-image') {
                const { image, imageName } = req.body;

                const buffer = Buffer.from(image, 'base64');
                const imagePaths = path.join(imagePath, imageName);
                await fsPromises.writeFile(imagePaths, buffer);

                res.status(201).json({ imageUrl: `/nfts/${imageName}` });
            } else if (req.url === '/api/update-owner') {
                const { id, newName } = req.body;
                const jsonData = await fsPromises.readFile(filePath, 'utf8');
                const nftData = JSON.parse(jsonData);

                const nftIndex = nftData.findIndex(nft => nft.id === Number(id));
                if (nftIndex === -1) {
                    return res.status(404).json({ error: 'NFT not found' });
                }

                nftData[nftIndex].name = newName;

                const updatedData = JSON.stringify(nftData, null, 2);
                await fsPromises.writeFile(filePath, updatedData);

                res.status(200).json({ message: 'Owner updated successfully' });
            } else {
                res.status(404).json({ error: 'Route not found' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error', details: error.message });
        }
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
