import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/pages/components/urform.json');
const imagePath = path.join(process.cwd(), 'public/nfts/profiles/')

export default async function handler(req, res) {
  if (req.method == "GET") {
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);
    res.status(200).json(objectData);
  }
  if (req.method == "POST") {
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);
    const { image, userid, description, address } = req.body;
    const newData = {
      id: objectData.length + 1,
      image,
      userid,
      description,  
      useraddr:address,
      joinedin:new Date(),
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
