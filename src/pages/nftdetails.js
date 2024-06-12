import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import nftData from "./components/form.json";
import Link from 'next/link';
import urform from './components/urform.json';
import { useAccount } from 'wagmi';
import BuyButton from './components/BuyButton';

const Countdown = dynamic(() => import('./components/CountDown'), { ssr: false });

export default function nftdetails() {
    const { address, isConnected } = useAccount();

    const user = urform.find(e => e.useraddr === address);
    console.log(user)
    const router = useRouter();
    const { id } = router.query;
    const nft = nftData.find(e => e.id === Number(id));
    const [thisuser,setThisuser] = useState([]);
        let target;
    if (!nft || !user) {
        setThisuser(urform.find(e => e.userid === nft.name));
        console.log(thisuser.useraddr)

        return (
            <div>Loading...</div>
        );
    }
    if (nft.saleEndDate) {
        target = new Date(nft.saleEndDate);
    } else {
        target = new Date('2024-06-04T14:07:20');
    }
    const handleBuyNow = async () => {
        try {
            const response = await fetch('/api/update-owner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, newName: user.userid }), // Change 'nabeel' to the new owner's name
            });

            console.log(JSON.stringify({ id, newName: user.userid }));

            if (response.ok) {
                const data = await response.json();
                alert(`Congratulations! You have successfully purchased ${nft.title}.`);
            } else {
                const errorData = await response.json();
                alert(`Failed to update owner: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error buying NFT:', error);
            alert('Failed to update owner: An error occurred.');
        }
    };

    return (
        <div>
            <div className='top-0 z-30'>
                <Header />
            </div>
            <div className="flex bg-black justify-center gap-10 px-[150px]">
                <div className='bg-zinc-900 rounded-lg'>
                    <div className='p-5'>
                        <img src={`${nft.image}`} style={{
                            width: "600px",
                            height: "600px",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }} className="rounded-lg" />
                    </div>
                </div>
                <div className='flex flex-col gap-6 justify-start'>
                    <h2 className='text-white text-[30px] font-primary font-semibold leading-5 tracking-wider transition-all text-white duration-400 hover:text-[#6610f2]'>{nft.title}</h2>
                    <div className='flex space-x-1'>
                        <h2 className='text-white'>Owned by
                            <Link href={`/user?name=${nft.name}`}>
                                <span className='transition-all text-white duration-400 hover:text-[#6610f2]'> @{nft.name}</span>
                            </Link>
                        </h2>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" /></svg>
                        <h2 className='-translate-y-[2px] text-white font-primary'>2 views</h2>
                    </div>
                    <div className='w-[550px] flex flex-col rounded-lg bg-zinc-900 p-5'>
                        <div className='flex flex-col gap-5'>
                            <h2 className='font-primary text-white text-xl'>Sale Ends In...</h2>
                            <Countdown date={target} />
                        </div>
                        <hr className="w-[500px] h-0.5 my-4 border-0 bg-gradient-to-r from-indigo-700 to-purple-900"></hr>
                        <div className='flex flex-col space-y-5'>
                            <div>
                                <h2 className='text-primary text-zinc-400'>Current Price</h2>
                                <h2 className='text-primary text-white text-[30px] font-semibold'>{nft.price} <span>{nft.currency}</span></h2>
                            </div>
                            <div>
                                {nft.name !== user.userid ?
                                    <BuyButton
                                        id={id}
                                        userid={user.userid}
                                    />
                                    : null}

                            </div>
                        </div>
                    </div>
                    <div className='w-full h-full flex flex-col g-7 rounded-lg bg-zinc-900 p-5'>
                        <h2 className='font-primary text-white text-xl'>Description</h2>
                        <hr className="w-[500px] h-0.5 my-4 border-0 bg-gradient-to-r from-indigo-700 to-purple-900"></hr>
                        <h2 className='text-white'>We are here to remind you you're never alone in this journey !</h2>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
