import React, { Children } from 'react'
import { MdClose } from 'react-icons/md';

interface UModalProps {
    header: string;
    subtitle: string;
    children: any;
    isVisible: boolean;
    onClose: () => void;
}

const Modal = ({ header, children, isVisible, onClose , subtitle}: UModalProps) => {
    if (!isVisible) return null;
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-40 py-20">
                <div className="bg-white p-6 rounded-lg shadow-lg  relative">
                    <button className='absolute top-4 right-5 hover:text-red-400 cursor-pointer text-black text-xl place-self-end' onClick={() => onClose()}><MdClose/></button>
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-2xl font-semibold text-slate-900'>{header}</h1>
                            <p className='text-sm text-slate-900'>{subtitle}</p>
                        </div>
                    </div>
                    <hr className='mt-2 mb-5 border-slate-600' />
                    <>
                    {children}
                    </>
                </div>
            </div>
        </>
    )
}

export default Modal