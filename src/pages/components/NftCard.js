import Link from 'next/link'
export default function NftCard({image,title,profile,name,price,currency}){
    return(
        <div style={{height:"448px"}}className="flex flex-col p-6 justify-between rounded-lg bg-zinc-800 w-fit hover:-translate-y-3 transition-all duration-500">
            <div  style={{
                        width:"222px",
                        height:"222px", 
                        backgroundImage: `URL(${image}), url(/placeholder.png)`,
                        backgroundPosition: "center",
                        backgroundSize: "cover" }}
                        className="rounded-lg">
            </div>
            <div className="flex flex-col gap-3">
                <div> {/* Title */}
                    <h2 className="font-primary text-xl font-semibold leading-5 text-white antialiased transition-all duration-400 hover:text-[#6610f2]">{title ? title : "Title"}</h2>
                </div>
                <div className="font-primary flex gap-2 items-center"> {/* Profile Pic & Name */}
                    <div style={{backgroundImage:`URL(${profile}), url(/placeholder.png)`,backgroundPosition: "center",backgroundSize: "cover"}}
                        className="w-14 h-14 rounded-full"
                    ></div>
                        <h2 className="text-lg transition-all text-white duration-400 hover:text-[#6610f2]">@{name ? name : "Username"}</h2>
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-1"> {/* Profile Pic & Name */}
                        <h2 className="font-primary text-white text-lg">{price ? price : "0.23"}</h2>
                        <h2 className="font-primary text-white text-lg">{currency ? currency : "ETH"}</h2>
                    </div>
                    <div>
                        <h2 className="font-primary text-lg">
                            1 of 1
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
