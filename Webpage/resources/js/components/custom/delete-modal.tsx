import { AlertTriangleIcon } from 'lucide-react'
import React from 'react'

interface DModalProps {
    onClose: () => void;
    onConfirm: () => void;
    isVisible: boolean;
}

export const DeleteModal = ({onClose, onConfirm, isVisible}: DModalProps) => {
    if(!isVisible) return null;
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-40 py-20">
                <div className="bg-white p-6 rounded-lg shadow-lg  relative">
                    <div className='flex justify-center flex-col items-center gap-5 px-5'>
                        <AlertTriangleIcon className='w-20 h-20 text-red-400' />
                        <label className='text-3xl font-bold'>Are you sure?</label>
                        <span className='w-100 text-center text-slate-500'>Do you really want to delete these records? This process cannot be undone.</span>
                        <div className='inline-flex gap-4'>
                            <button className='bg-slate-300 px-5 py-2 rounded-xl font-bold text-slate-800 cursor-pointer' onClick={() => onClose()}>Close</button>
                            <button className='bg-red-400 px-5 py-2 rounded-xl font-bold text-slate-100 cursor-pointer' onClick={() => onConfirm()}>Confirm</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
