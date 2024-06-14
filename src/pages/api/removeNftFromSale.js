
import fs from 'fs';
import path from 'path';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const { nftId } = req.body;

        const filePath = path.join(process.cwd(), 'src', 'pages', 'components', 'form.json');
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Find the NFT and update its details
        const nftIndex = jsonData.findIndex(nft => nft.id === nftId);
        if (nftIndex !== -1) {
            jsonData[nftIndex].price = null;
            jsonData[nftIndex].saleEndDate = null;

            // Save the updated JSON data back to the file
            fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

            res.status(200).json({ message: 'NFT removed from sale successfully' });
        } else {
            res.status(404).json({ message: 'NFT not found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
