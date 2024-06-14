import Header from './components/Header';
import Footer from './components/Footer';
import NftCard from './components/NftCard';
import { useRouter } from 'next/router';
import nftData from "./components/form.json";
import Link from 'next/link';
import urform from './components/urform.json';
import { useAccount } from 'wagmi';
import { useState } from 'react';

export default function User() {
    const { address, isConnected } = useAccount();
    const router = useRouter();
    const { name } = router.query;
    const user = urform.find(e => e.userid === name);
    const curruser = urform.find(e => e.useraddr === address);

    const [nfts, setNfts] = useState(nftData);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedNftId, setSelectedNftId] = useState(null);
    const [salePrice, setSalePrice] = useState('');
    const [saleEndDate, setSaleEndDate] = useState('');


    const userNfts = nfts.filter(nft => nft.name === name);
    const userSales = nfts.filter(nft => nft.saleEndDate !== null).length;
    const userNotSales = nfts.filter(nft => nft.saleEndDate === null).length;
    const userNftCount = userNfts.length;

    if (!user || !curruser) {
        return (
            <div>
                Loading
            </div>
        )
    }

    const openModal = (nftId) => {
        setSelectedNftId(nftId);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedNftId(null);
        setSalePrice('');
        setSaleEndDate('');
    };

    const handleListForSale = async () => {
        if (salePrice && saleEndDate && selectedNftId) {
            try {
                const response = await fetch('./api/updateNft', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nftId: selectedNftId,
                        price: parseFloat(salePrice),
                        saleEndDate: saleEndDate
                    })
                });

                if (response.ok) {
                    const updatedNfts = nfts.map(nft => {
                        if (nft.id === selectedNftId) {
                            return {
                                ...nft,
                                price: parseFloat(salePrice),
                                saleEndDate: saleEndDate
                            };
                        }
                        return nft;
                    });
                    setNfts(updatedNfts);
                    closeModal();
                } else {
                    alert('Failed to update NFT');
                }
            } catch (error) {
                console.error('Error updating NFT:', error);
                alert('Failed to update NFT');
            }
        } else {
            alert('Please enter sale price and end date');
        }
    };

    const handleCancelSale = async (nftId) => {
        try {
            const response = await fetch('./api/removeNftFromSale', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nftId: nftId
                })
            });

            if (response.ok) {
                const updatedNfts = nfts.map(nft => {
                    if (nft.id === nftId) {
                        return {
                            ...nft,
                            saleEndDate: null
                        };
                    }
                    return nft;
                });
                setNfts(updatedNfts);
            } else {
                alert('Failed to cancel sale');
            }
        } catch (error) {
            console.error('Error canceling sale:', error);
            alert('Failed to cancel sale');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-zinc-900 relative">
            <div className="flex-1" style={{ backgroundImage: `url(/banner.jpg)` }}>
                <div className='w-screen lg:h-[38vh]'>
                    <div className='sticky top-0 z-30'>
                        <Header />
                    </div>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row relative'>
                <div className='hidden lg:block md:block w-full lg:w-auto'>
                    <div className='flex flex-1'>
                        <div className='absolute inset-0 z-10'>
                            <hr className="-translate-y-6 object-center w-screen h-2 my-4 border-0 bg-gradient-to-r from-indigo-700 to-purple-900"></hr>
                        </div>
                        <div className='flex z-10 w-full'>
                            <div className='w-full lg:w-[512px] bg-zinc-900 flex flex-col items-center'>
                                <div className='-translate-y-[160px]'>
                                    <div className='p-2 bg-gradient-to-b from-indigo-700 to-purple-900 w-[315px] h-[315px] rounded-full'>
                                        <div style={{
                                            backgroundImage: `URL(${user.image}),URL(/placeholder.png)`,
                                            backgroundPosition: "center",
                                            backgroundSize: "cover"
                                        }} className='rounded-full'>
                                            <div className="flex text-3xl leading-9 tracking-widest items-center justify-center hover:bg-black opacity-80 text-transparent hover:text-white h-[300px] w-[300px] transition-all rounded-full">
                                                {user.userid ? user.userid : "Username"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='-translate-y-[160px]'>
                                    <div className='p-6 flex flex-col items-center space-y-10'>
                                        <h2 className='flex flex-col text-primary text-3xl text-semibold tracking-widest leading-9 transition-all text-white duration-400 hover:text-[#6610f2]'>
                                            @{user.userid ? user.userid : "Username"}
                                            <span className='text-sm text-zinc-500'>
                                                Joined May 2024
                                            </span>
                                        </h2>
                                        <h2 className='flex flex-col text-primary text-3xl text-semibold tracking-widest leading-9'>
                                            Bio
                                            <span className='text-sm text-zinc-500 py-2'>
                                                {user.description}
                                            </span>
                                        </h2>
                                    </div>
                                </div >
                                <div className='flex font-primary'>
                                    <div className="p-4 bg-gradient-to-b from-indigo-700 to-purple-900 rounded-l-lg border-r border-zinc-900 mt-2 mb-4 hover:scale-[1.01] transition-all">
                                        <span className="block text-lg text-white font-bold mb-1">Total NFTs</span>
                                        <span className="block text-4xl text-white">{userNftCount}</span>
                                    </div>
                                    <div className="p-4 bg-gradient-to-b from-indigo-700 to-purple-900 mt-2 border-l border-r border-zinc-900 mb-4 hover:scale-[1.01] transition-all">
                                        <span className="block text-lg text-white font-bold mb-1">On Sale</span>
                                        <span className="block text-4xl text-white">{userSales}</span>
                                    </div>
                                    <div className="p-4 bg-gradient-to-b from-indigo-700 to-purple-900 rounded-r-lg border-l border-zinc-900 mt-2 mb-4 hover:scale-[1.01] transition-all">
                                        <span className="block text-lg text-white font-bold mb-1">Not On Sale</span>
                                        <span className="block text-4xl text-white">{userNotSales}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex-1 bg-zinc-900 border-l-2 border-zinc-800'>
                                <div className='p-3 flex flex-col space-y-2'>
                                    <div>
                                        <h2 className='text-primary text-3xl text-semibold leading-9 tracking-wide'>
                                            {user.userid !== curruser.userid ? "USER NFTS" : "MY NFTS"}
                                        </h2>
                                    </div>
                                    <div className='grid grid-cols-4 gap-5'>
                                        {nfts.map((nft, index) => (
                                            nft.name === name ?
                                                (
                                                    <div key={index}>
                                                        <NftCard
                                                            id={nft.id}
                                                            image={nft.image}
                                                            title={nft.title}
                                                            profile={nft.profile}
                                                            price={nft.price}
                                                            name={nft.name}
                                                            currency={nft.currency}
                                                        />
                                                        {user.userid === curruser.userid && !nft.saleEndDate && (
                                                            <button
                                                                onClick={() => openModal(nft.id)}
                                                                className="mt-2 p-2 bg-purple-900 text-white rounded -translate-y-[70px] translate-x-[165px] shadow-md hover:bg-white hover:text-black hover:shadow-purple-900 hover:scale-[1.1] transition-all"
                                                            >
                                                                List for Sale
                                                            </button>
                                                        )}
                                                        {user.userid === curruser.userid && nft.saleEndDate && (
                                                            <button
                                                                onClick={() => handleCancelSale(nft.id)}
                                                                className="mt-2 p-2 bg-red-500 text-white rounded -translate-y-[70px] translate-x-[165px]  shadow-md  hover:bg-white hover:text-black hover:shadow-red-500 hover:scale-[1.1] transition-all"
                                                            >
                                                                Cancel Sale
                                                            </button>
                                                        )}
                                                    </div>
                                                ) : null
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-black p-8 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">List NFT for Sale</h2>
                        <label className="block mb-2 text-white">
                            Sale Price (ETH):
                            <input
                                type="number"
                                step="0.0001"
                                className="border border-gray-300 bg-grey rounded px-2 py-1 w-full text-black"
                                value={salePrice}
                                onChange={(e) => setSalePrice(e.target.value)}
                            />
                        </label>
                        <label className="block mb-4 text-white">
                            Sale End Date (YYYY-MM-DD):
                            <input
                                type="date"
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                value={saleEndDate}
                                onChange={(e) => setSaleEndDate(e.target.value)}
                            />
                        </label>
                        <div className="flex justify-end">
                            <button
                                onClick={handleListForSale}
                                className="text-white px-4 py-2 rounded hover:bg-white hover:text-black"
                            >
                                List for Sale
                            </button>
                            <button
                                onClick={closeModal}
                                className="ml-2 bg-white text-black px-4 py-2 rounded hover:bg-black hover:text-white"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
