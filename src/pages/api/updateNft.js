
import fs from 'fs';
import path from 'path';


export default function handler(req, res) {
    if (req.method === 'POST') {
        const { nftId, price, saleEndDate } = req.body;
      

        // Assuming your project structure is like this:
        const filePath = path.join(process.cwd(), 'src', 'pages', 'components', 'form.json');
        
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        let nfts = JSON.parse(jsonData);

        // Find the index of the NFT to update
        const index = nfts.findIndex(nft => nft.id === nftId);

        if (index === -1) {
            return res.status(404).json({ message: 'NFT not found' });
        }

        // Update the specific NFT entry
        nfts[index] = {
            ...nfts[index],
            price: parseFloat(price),
            saleEndDate: saleEndDate
        };

        // Write the updated data back to form.json
        fs.writeFileSync(filePath, JSON.stringify(nfts, null, 2));

        res.status(200).json({ message: 'NFT updated successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
