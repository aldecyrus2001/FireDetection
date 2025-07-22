import { Trash2Icon } from 'lucide-react'
import React from 'react'
import { CustomButton } from './button';

interface ConfirmationModalProps {
    Title: string;
    Content: string;
    onCancle: () => void;
    onConfirm: () => void;
    isVisible: boolean;
}

export const ConfirmationModal = ({Title, Content, onCancle, onConfirm, isVisible} : ConfirmationModalProps) => {
    if(!isVisible) return null;
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-40 py-20">
                <div className="bg-white p-6 rounded-lg shadow-lg  relative py-5 px-10">
                    <div className='w-full flex items-center justify-center flex-col gap-2 text-center'>
                        <Trash2Icon className='w-10 h-10 text-red-600' />
                        <h1 className='text-xl font-semibold text-slate-900'>{Title}</h1>
                        <span className='w-80'>{Content}</span>
                    </div>
                    <div className='inline-flex gap-3 justify-center items-center w-full mt-3'>
                        <CustomButton title='Cancel' className='bg-slate-200 hover:bg-stone-300' onClick={onCancle} />
                        <CustomButton title='Confirm' className='bg-red-300 hover:bg-red-400' onClick={onConfirm} />
                    </div>

                </div>
            </div>
        </>
    )
}
