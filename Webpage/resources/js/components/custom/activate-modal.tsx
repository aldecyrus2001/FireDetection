import { AlertCircle } from 'lucide-react';
import React from 'react'

interface AModalProps {
    onClose: () => void;
    onConfirm: () => void;
    isVisible: boolean;
}

export const ActivateModal = ({onClose, onConfirm, isVisible} : AModalProps) => {
    if(!isVisible) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-40 py-20">
            <div className="bg-white p-6 rounded-lg shadow-lg  relative">
                <div className='flex justify-center flex-col items-center gap-5 px-5'>
                    <AlertCircle className='w-20 h-20 text-yellow-400' />
                    <label className='text-3xl font-bold'>Are you sure?</label>
                    <span className='w-100 text-center text-slate-500'>Do you really want to activate these message?</span>
                    <div className='inline-flex gap-4'>
                        <button className='bg-slate-300 px-5 py-2 rounded-xl font-bold text-slate-800 cursor-pointer' onClick={() => onClose()}>Close</button>
                        <button className='bg-red-400 px-5 py-2 rounded-xl font-bold text-slate-100 cursor-pointer' onClick={() => onConfirm()}>Confirm</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
