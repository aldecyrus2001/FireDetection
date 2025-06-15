import React from 'react';
import { IconType } from 'react-icons'; // or your actual source

interface Card {
    name: string;
    value: string | number;
    image: string;
}

const DashboardCard = ({ name, value, image }: Card) => {

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-50 overflow-hidden rounded-xl border p-3">
            <h3 className='mb-2 text-sm font-semibold'>{name}</h3>

            <div className='w-full grid grid-cols-2 h-[calc(100%-30px)]'>
                <div className='flex items-center justify-center'>
                    <h1 className='text-8xl font-bold font-mono'>{value}</h1>
                </div>
                <div className='flex items-center justify-center'>
                    <img src={image} alt="" className='w-30 h-30 text-gray-700'/>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
