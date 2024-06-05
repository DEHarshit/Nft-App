import NftCard from "./components/NftCard";
import Header from './components/Header'
import Footer from './components/Footer'
import nftData from "./components/form.json"
import Link from 'next/link'

export default function nft() {
    return (
        <div>
            <div className='sticky top-0 z-30'>
                <Header />
            </div>
            <div className="flex p-10 justify-center bg-black">
                <div className="flex flex-col gap-8 bg-black">
                    <div className="inline-flex items-center gap-4">
                        <h2 className="font-primary font-semibold text-lg bg-gradient-to-r from-indigo-700 to-purple-900 inline-block text-transparent bg-clip-text">AUCTIONS</h2>
                        <hr class="w-10 h-0.5 my-4 border-0 bg-gradient-to-r from-indigo-700 to-purple-900"></hr>
                    </div>
                    <div>
                        <h2 class="font-primary text-white text-3xl font-semibold leading-5 antialiased">Live Auctions</h2>
                    </div>
                    <div className="flex gap-6 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2">
                        {nftData.map((nft, index) => (
                            <NftCard
                                id={nft.id}
                                key={index}
                                image={nft.image}
                                title={nft.title}
                                profile={nft.profile}
                                price={nft.price}
                                name={nft.name}
                                currency={nft.currency}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}