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
    let target;
    let curr;
    if (!nft) {
        return (
            <div>Loading...</div>
        );
    }
    if (nft.saleEndDate) {
        target = new Date(nft.saleEndDate);
        curr = new Date();
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
                body: JSON.stringify({ id, newName: user.userid }),
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
                    <div className='w-[550px] flex flex-col rounded-lg bg-zinc-900 p-5'>
                        <div className='flex flex-col gap-5'>
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
                                    (target > curr)?
                                        <BuyButton
                                            id={id}
                                            userid={user.userid}
                                            sellerid={nft.name}
                                            price={nft.price}
                                        /> : null
                                    : null}

                            </div>
                        </div>
                    </div>
                    <div className='w-full h-full flex flex-col g-7 rounded-lg bg-zinc-900 p-5'>
                        <h2 className='font-primary text-white text-xl'>Description</h2>
                        <hr className="w-[500px] h-0.5 my-4 border-0 bg-gradient-to-r from-indigo-700 to-purple-900"></hr>
                        <h2 className='text-white'>{nft.description}</h2>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
