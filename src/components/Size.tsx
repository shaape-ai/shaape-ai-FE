import React from 'react';
import "../App.css";

type Props = {
    name: string;
    size: number | string;
};

export default function Size({ name, size }: Props) {
    return (
        <div className="flex flex-row items-center px-3 py-2 justify-between ">
            <div className="flex flex-col items-center p-4 w-46 h-40 shadow-md rounded-lg">
                <h3 className="myFont text-20 text-black">My Size Is ?</h3>
                <div className="flex flex-row justify-center items-center rounded-lg w-18 h-24 bg-primary p-4">
                    <h1 className="myFont text-4xl  text-white" style={{
                        fontWeight: "bold",
                    }}>{size}</h1>
                </div>
                <p className="myFont text-14 text-primary mt-2">Not {name}?</p>
            </div>
            <div className="flex flex-col items-center p-4 w-46 h-40 shadow-md rounded-lg">
                <h3 className="myFont text-20 text-black">Occassion!</h3>
                <img src="./assests/party.svg" alt="occasion" className="w-24 h-24" />
                <p className="myFont text-14 text-primary">Party Vibes</p>
            </div>
        </div>
    );
}
