import React from 'react'

type Props = {
    name: string;
    subtitle: string;
    price: number;

}

export default function Item({name,subtitle,price}: Props){
    return (
        <div className='flex flex-row items-center justify-between px-3 py-2 rounded-lg shadow-md' style={{
            width: '94%',
            margin: 'auto'
        }}>
            <img src="./assests/product.png" alt="jeans" className="w-24 h-24" />
            <div className='flex flex-col items-start'>
                <h2 className='myFont text-black font-bold text-20'>{name}</h2>
                <p className='myFont text-black font-extralight text-16'>{subtitle}</p>
                <p className='myFont text-black font-bold text-20'>${price}</p>
                <div className='flex flex-row items-center p-2 bg-primary rounded-lg'>
                    <p className='myFont text-white font-semibold text-16'>Buy</p>
                </div>
            </div>
            <div className='flex flex-col items-center justify-between gap-4'>
                <img src="./assests/bookmark.svg" alt="heart" className="w-6 h-6" />
                <img src="./assests/share.svg" alt="share" className="w-6 h-6" />
                <img src="./assests/favorite.svg" alt="more" className="w-6 h-6" />
            </div>
        </div>
    )
}