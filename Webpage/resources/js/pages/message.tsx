import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react';
import React from 'react'
import { MdOutlineMessage } from 'react-icons/md';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Message',
        href: '/message'
    }
]

type Message = {
    messageID: number;
    messageTitle: string;
    messageContent: string;
    messageDate: string;
    messageStatus: string;
};

const sampleMessages: Message[] = [
    {
        messageID: 1,
        messageTitle: 'Message 1',
        messageContent: 'Message 1 Content',
        messageDate: '2021-01-01',
        messageStatus: 'Active'
    },
    {
        messageID: 2,
        messageTitle: 'Message 2',
        messageContent: 'Message 2 Content',
        messageDate: '2021-01-02',
        messageStatus: 'Inactive'
    }
]

const message = () => {
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title='Message' />
                <div className='h-full w-full p-6'>
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-2xl font-semibold'>Message List</h1>
                            <p className='text-sm'>Sample Description of this page</p>
                        </div>
                        <div>
                            <button className='py-2 px-4 cursor-pointer rounded-md bg-green-400 font-semibold flex gap-2 items-center'><MdOutlineMessage /> Add Message</button>
                        </div>
                    </div>
                    <hr className='mt-2 mb-5 border-slate-600' />
                    <div className='overflow-x-auto rounded-xl shadow-sm'>
                        <table className='min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-900'>
                            <thead className='bg-gray-50 dark:bg-gray-800'>
                                <tr>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>#</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Title</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Content</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Date</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Status</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-100 dark:divide-gray-700'>
                                {sampleMessages.map((message) => (
                                    <tr key={message.messageID} className='hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>{message.messageID}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>{message.messageTitle}</td>
                                        <td className='px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-300'>
                                            <div className='max-w-[200px] truncate mx-auto'>{message.messageContent}</div>
                                        </td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{message.messageDate}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{message.messageStatus}</td>
                                        <td className='px-6 py-4  whitespace-nowrap text-sm font-medium flex gap-2 justify-center'>
                                            <button className='px-2 py-1 rounded text-white bg-green-400 hover:bg-green-900 dark:bg-green-400'>View</button>
                                            <button className='px-2 py-1 rounded text-white bg-indigo-400 hover:bg-indigo-900 dark:bg-indigo-400'>Edit</button>
                                            {message.messageStatus === 'Active' ? (
                                                <></>
                                            ) : (
                                                <button className='px-2 py-1 rounded text-white bg-blue-400 hover:bg-blue-900 dark:bg-blue-400'>Activate</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}

export default message