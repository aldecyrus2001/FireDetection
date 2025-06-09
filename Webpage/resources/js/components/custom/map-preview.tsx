import React from 'react'
import map from '../../assets/sample-map.jpg'
import MapImage from './map-image';
import { MdClose } from 'react-icons/md';

interface MapPreviewProps {
    topcoordination: string;
    leftcoordination: string;
    isVisible: boolean;
    onclose: () => void;
}

const MapPreview = ({ topcoordination, leftcoordination, isVisible, onclose }: MapPreviewProps) => {
    if (!isVisible) return null;
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-40 py-20">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full relative">
                    <button className='absolute top-4 right-5 hover:text-red-400 cursor-pointer text-black text-xl place-self-end' onClick={() => onclose()}><MdClose/></button>
                    <h2 className="text-xl font-semibold mb-4 text-black">Map Plotting Preview</h2>
                    <div className="h-[calc(100%-28px)] relative">
                        {/* Map */}
                        <MapImage />

                        {/* Grid overlay */}
                        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none text-red-600 font-bold text-2xl">
                            {Array.from({ length: 100 }).map((_, i) => {
                                const row = Math.floor(i / 10);
                                const col = i % 10;
                                return (
                                    <div
                                        key={i}
                                        className="border border-black-600 text-[10px] flex items-start justify-start p-0.5"
                                    >
                                        <p className='bg-white p-1 rounded'>{`${row * 10}% x ${col * 10}%`}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Example pins */}
                        <span className="absolute w-4 h-4 rounded-full bg-red-500 opacity-75 animate-ping text-black"
                            style={{ top: topcoordination, left: leftcoordination }} />

                    </div>
                </div>
            </div>

        </>
    )
}

export default MapPreview