import fsPromises from 'fs/promises';
import path from 'path';
import nftData from '../components/form.json';
const filePath = path.join(process.cwd(), 'src/pages/components/form.json');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const jsonData = await fsPromises.readFile(filePath);
            const objectData = JSON.parse(jsonData);
            const { id, newName } = req.body;
            const nftIndex = objectData.findIndex(nft => nft.id === Number(id));
            if (nftIndex === -1) {
                console.log('NFT not found');
                return res.status(404).json({ error: 'NFT not found' });
            }

            objectData[nftIndex].name = newName;

            const updatedData = JSON.stringify(objectData);

            await fsPromises.writeFile(filePath, updatedData);

            console.log('Owner updated successfully');
            res.status(200).json({ message: 'Owner updated successfully' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error', details: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
