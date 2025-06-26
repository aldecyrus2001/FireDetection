import React from 'react'
import MapImage from './map-image';


interface MapAlertInterface {
    coordinates: { sensor: string, top: number, left: number, level: string }[];
    isVisible: boolean;
    onclose: () => void;
}

const MapAlert = ({ coordinates, isVisible, onclose }: MapAlertInterface) => {
    if (!isVisible) return null;
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-40 py-20">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full relative">
                    <button className='absolute top-2 right-2 not-odd:cursor-pointer text-black text-xl place-self-end' onClick={() => onclose()}>X</button>
                    <h2 className="text-xl font-semibold">Map Alert</h2>
                    <div className='w-full inline-flex justify-center gap-2'>
                        <span className='text-sm font-semibold'>Legend :</span>
                        <div className='inline-flex items-center gap-2'>
                            <div className='bg-red-500 w-2 h-2 rounded-full'></div>
                            <span className='text-sm italic'>High</span>
                        </div>
                        <div className='inline-flex items-center gap-2'>
                            <div className='bg-yellow-500 w-2 h-2 rounded-full'></div>
                            <span className='text-sm italic'>Moderate</span>
                        </div>
                        <div className='inline-flex items-center gap-2'>
                            <div className='bg-green-500 w-2 h-2 rounded-full'></div>
                            <span className='text-sm italic'>Low</span>
                        </div>
                    </div>
                    <div className="h-[calc(100%-28px)] relative">
                        {/* Map */}
                        <MapImage />

                        {/* Grid overlay 
                        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none">
                            {Array.from({ length: 100 }).map((_, i) => {
                                const row = Math.floor(i / 10);
                                const col = i % 10;
                                return (
                                    <div
                                        key={i}
                                        className="border border-gray-300 text-[10px] flex items-start justify-start p-0.5"
                                    >
                                        {`${row * 10}% x ${col * 10}%`}
                                    </div>
                                );
                            })}
                        </div>

                        Example pins */}
                        {coordinates.map((coord, index) => {
                            let bgColor = '';

                            switch (coord.level) {
                                case 'High':
                                    bgColor = 'bg-red-500';
                                    break;
                                case 'Moderate':
                                    bgColor = 'bg-yellow-500';
                                    break;
                                case 'Low':
                                    bgColor = 'bg-green-500';
                                    break;
                                default:
                                    bgColor = 'bg-gray-400'; // Fallback color
                            }

                            return (
                                <span
                                    key={index}
                                    title={coord.sensor}
                                    className={`absolute w-4 h-4 rounded-full opacity-75 animate-ping ${bgColor}`}
                                    style={{ top: `${coord.top}%`, left: `${coord.left}%` }}
                                />
                            );
                        })}

                    </div>

                </div>
            </div>

        </>
    )
}

export default MapAlert