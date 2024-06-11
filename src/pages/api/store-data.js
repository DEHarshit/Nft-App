import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/pages/components/form.json');
const imagePath = path.join(process.cwd(), 'public/nfts')

export default async function handler(req, res) {
  if (req.method == "GET") {
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);
    res.status(200).json(objectData);
  }
  if (req.method == "POST") {
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);
    const { image, title, saleEndDate, price, currency, description, address, name } = req.body;
    const newData = {
      id: objectData.length + 1,
      image,
      title,
      saleEndDate,
      price,
      currency,
      description,
      name: name,
      useraddr:address,
    }
    objectData.push(newData)

    const updatedData = JSON.stringify(objectData);

    await fsPromises.writeFile(filePath, updatedData);

    res.status(201).json({ message: 'Data added successfully' });

  }

}


export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
