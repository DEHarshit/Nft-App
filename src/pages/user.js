import Header from './components/Header'
import Footer from './components/Footer'
import NftCard from './components/NftCard'
import { useRouter } from 'next/router';
import nftData from "./components/nft_data"
import Link from 'next/link'

export default function user() {
    const router = useRouter();
    const { name } = router.query;
    const nft = nftData.find(e => e.name === name);
    if (!nft) {
        return (
            <div>
                Loading
            </div>
        )
    }
    return (
        <div>
            <div>
                <div style={{
                    backgroundImage: `url(/banner.jpg)`,
                }} className="absolute inset-0">
                    <div className=' w-screen lg:h-[38vh]'>
                        <div className='sticky top-0 z-30'>
                            <Header />
                        </div>
                    </div>
                </div>
            </div>
            <div className='hidden lg:block md:block'> {/* Large & Medium Block */}
                <div className='translate-y-[339px] flex'>
                    <div className='absolute inset-0 z-10'>
                        <hr class="-translate-y-6 object-center w-screen h-2 my-4 border-0 bg-gradient-to-r from-indigo-700 to-purple-900"></hr>

                    </div>
                    <div className='flex z-10'>
                        <div className='w-[30%] h-fill bg-zinc-900 flex flex-col items-center'>
                            <div className='-translate-y-[160px]'>
                                <div className='p-2 bg-gradient-to-b from-indigo-700 to-purple-900 w-[315px] h-[315px] rounded-full'>
                                    <div style={{
                                        backgroundImage: `URL(${nft.profile}),URL(/placeholder.png)`,
                                        backgroundPosition: "center",
                                        backgroundSize: "cover"
                                    }} className='rounded-full'>
                                        <div className="flex text-3xl leading-9 tracking-widest items-center justify-center hover:bg-black opacity-80 text-transparent hover:text-white h-[300px] w-[300px] transition-all rounded-full">
                                            {nft.name ? nft.name : "Username"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='-translate-y-[160px]'>
                                <div className='p-6 flex flex-col items-center space-y-10'>
                                    <h2 className='flex flex-col text-primary text-3xl text-semibold tracking-widest leading-9 transition-all text-white duration-400 hover:text-[#6610f2]'>
                                        @{nft.name ? nft.name : "Username"}
                                        <span className='text-sm text-zinc-500'>
                                            Joined May 2024
                                        </span>
                                    </h2>
                                    <h2 className='flex flex-col text-primary text-3xl text-semibold tracking-widest leading-9'>
                                        Description
                                        <span className='text-sm text-zinc-500 py-2'>
                                            We are here to remind you you're never alone in this journey !
                                        </span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className='w-[70%] h-[fill] bg-zinc-900 border-l-2 border-zinc-800'>
                            <div className='p-3 flex flex-col space-y-2'>
                                <div>
                                    <h2 className='text-primary text-3xl text-semibold leading-9 tracking-wide'>USER NFTS</h2>
                                </div>
                                <div className='flex grid grid-cols-4 gap-x-1 gap-y-5'>
                                    {nftData.map((nft, index) => (
                                        nft.name == name ?
                                            (
                                                <NftCard
                                                    key={index}
                                                    id={nft.id}
                                                    image={nft.image}
                                                    title={nft.title}
                                                    profile={nft.profile}
                                                    price={nft.price}
                                                    name={nft.name}
                                                    currency={nft.currency}
                                                />) : null
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}