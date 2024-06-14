import { useState } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import { Formik, Form as FormikForm, Field } from 'formik';
import * as Yup from 'yup';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import urform from './components/urform.json';

const FormSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  saleEndDate: Yup.date().required('Sale End Date is required'),
  price: Yup.number().required('Price is required').positive(),
  currency: Yup.string().required('Currency is required'),
  description: Yup.string().required('Description is required'),
});

const Form = () => {
  
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [image, setImage] = useState('');
  const user = urform.find(ele => ele.useraddr == address);
  if(!user){
    return (
      <div>
        Loading...
      </div>
    )
  }
  console.log(user)
  function handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  const handleSubmit = async (values, { setSubmitting }) => {
    let imageUrl = image;
    if (image !== '/placeholder.png' && image.indexOf('/nfts/') === -1) {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      const imageName = `${values.title.replace(/\s+/g, '-').toLowerCase()}.png`;
      const imagePaths = `/nfts/${imageName}`;
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: buffer.toString('base64'), imageName }),
      });
      const data = await response.json();
      imageUrl = data.imageUrl;
    }
    const Data = {
      image: imageUrl,
      title: values.title,
      saleEndDate: values.saleEndDate,
      price: values.price,
      currency: values.currency,
      description: values.description,
      address: address,
      name: user.userid
    };
    
    async function saveData() {
      const postData = {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(Data),
      };
      const response = await fetch(`/api/store-data`, postData);
      console.log(response);
    }
    
    await saveData();
    router.push('/')
    setSubmitting(false);
  };

  return (
    <div className='flex flex-col bg-black space-y-5'>
      <div className='sticky top-0 z-30'>
        <Header />
      </div>
      <div className="absolute inset-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 465" version="1.1" className="w-full h-full">
          <defs>
            <linearGradient x1="49.7965246%" y1="28.2355058%" x2="49.7778147%" y2="98.4657689%" id="linearGradient-1">
              <stop stopColor="rgba(69,40,220, 0.15)" offset="0%"></stop>
              <stop stopColor="rgba(87,4,138, 0.15)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon fill="url(#linearGradient-1)">
              <animate
                id="graph-animation"
                xmlns="http://www.w3.org/2000/svg"
                dur="1.5s"
                attributeName="points"
                values="
                    0,464 0,464 111.6,464 282.5,464 457.4,464 613.4,464 762.3,464 912.3,464 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 
                    0,464 0,367 111.6,323.3 282.5,373 457.4,423.8 613.4,464 762.3,464 912.3,464 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 
                    0,464 0,367 111.6,263 282.5,336.6 457.4,363.5 613.4,414.4 762.3,464 912.3,464 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 
                    0,464 0,367 111.6,263 282.5,282 457.4,323.3 613.4,340 762.3,425.6 912.3,464 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 
                    0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,290.4 762.3,368 912.3,446.4 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 
                    0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,329.6 912.3,420 1068.2,427.6 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 
                    0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,402.4 1068.2,373 1191.2,412 1328.1,464 1440.1,464 1440.1,464 0,464; 
                    0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,336.6 1191.2,334 1328.1,404 1440.1,464 1440.1,464 0,464; 
                    0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,282 1191.2,282 1328.1,314 1440.1,372.8 1440.1,464 0,464; 
                    0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,282 1191.2,204 1328.1,254 1440.1,236 1440.1,464 0,464; 
                    0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,282 1191.2,204 1328.1,164 1440.1,144.79999999999998 1440.1,464 0,464; 
                    0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,282 1191.2,204 1328.1,164 1440.1,8 1440.1,464 0,464;"
                fill="freeze"
              ></animate>
            </polygon>
          </g>
        </svg>
      </div>
      <div className="flex flex-col space-y-2 w-[4500px] rounded-lg items-center relative inset-0 inline-block opacity-70 bg-zinc-900 z-10 max-w-lg mx-auto p-4 mb-4">
        <div className="inline-flex flex-col items-center gap-4 mb-4">
            <h2 className="font-primary font-semibold text-5xl bg-gradient-to-r from-indigo-700 to-purple-900 inline-block text-transparent bg-clip-text">Add A New NFT++</h2>
            <hr className="w-[300px] h-0.5 border-0 bg-gradient-to-r from-indigo-700 to-purple-900"></hr>
          </div>
        <Formik
          initialValues={{
            title: '',
            saleEndDate: '',
            price: '',
            currency: 'BTH',
            description: '',
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (

            <FormikForm>
              <div className="flex flex-col space-y-5 w-[350px]">
                <div className="flex items-center justify-center">
                  <div style={{
                    backgroundImage: `url(${image})`,
                    backgroundPosition: `center`,
                    backgroundSize: `cover`
                  }} className=" h-[250px] w-[250px] text-black text-2xl font-semibold rounded-lg border-black bg-transparent">
                    <div className=' relative transition-all flex items-center justify-center h-[250px] w-[250px] opacity-60 text-white hover:text-transparent hover:bg-zinc-800 border-4 border-black rounded-lg'>
                      <label className='inset-0'>Add Image</label>
                      <input type="file" accept="image/*" className='opacity-0 absolute inset-0' onChange={handleImageChange} />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white font-medium text-gray-700">Title</label>
                <Field name="title" className="text-black mt-1 p-2 border border-gray-300 rounded w-full" />
                {errors.title && touched.title ? (
                  <div className="text-red-500 text-sm">{errors.title}</div>
                ) : null}
                </div>
              </div>

              <div className>
                <label className="block text-sm text-white font-medium text-gray-700">Sale End Date</label>
                <Field type="date" name="saleEndDate" className="text-black mt-1 p-2 border border-gray-300 rounded w-full" />
                {errors.saleEndDate && touched.saleEndDate ? (
                  <div className="text-red-500 text-sm">{errors.saleEndDate}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="block text-sm text-white font-medium text-gray-700">Price</label>
                <Field name="price" type="number" className="text-black mt-1 p-2 border border-gray-300 rounded w-full" />
                {errors.price && touched.price ? (
                  <div className="text-red-500 text-sm">{errors.price}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="block text-sm text-white font-medium text-gray-700">Currency</label>
                <Field as="select" name="currency" className="text-black mt-1 p-2 border border-gray-300 rounded w-full">
                  <option value="ETH">ETH</option>
                </Field>
                {errors.currency && touched.currency ? (
                  <div className="text-red-500 text-sm">{errors.currency}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="block text-sm text-white font-medium text-gray-700">Description</label>
                <Field as="textarea" name="description" className="text-black p-2 border border-gray-300 rounded w-full" />
                {errors.description && touched.description ? (
                  <div className="text-red-500 text-sm">{errors.description}</div>
                ) : null}
              </div>

              <button type="submit" onclick={handleSubmit}className="mt-4 w-32 h-12 text-white hover:text-md hover:font-bold px-4 py-2 bg-purple-900 transition-all rounded hover:bg-white hover:text-zinc-800 hover:shadow-lg hover:shadow-white/50"
                >
                Submit
              </button>
            </FormikForm>
          )}
        </Formik>
      </div>
      <Footer />
    </div>
  );
};

export default Form;
