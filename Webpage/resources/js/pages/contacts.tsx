import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import React from 'react'
import { MdContactPhone } from 'react-icons/md'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contacts',
        href: '/contact-list'
    }
]

type Contact = {
    contactID: number;
    contactName: string;
    contactDescription: string;
    contactPhone: string;
    contactLevel: string;
}

const sampleContacts: Contact[] = [
    {
        contactID: 1,
        contactName: 'John Doe',
        contactDescription: 'John Doe Description',
        contactPhone: '1234567890',
        contactLevel: 'Level 1'
    },
    {
        contactID: 2,
        contactName: 'Jane Doe',
        contactDescription: 'Jane Doe Description',
        contactPhone: '1234567890',
        contactLevel: 'Level 2'
    }
]

const contacts = () => {
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title='Contacts' />
                <div className='h-full w-full p-6'>
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-2xl font-semibold'>Contacts List</h1>
                            <p className='text-sm'>Sample Description of this page</p>
                        </div>
                        <div>
                            <button className='py-2 px-4 cursor-pointer rounded-md bg-green-400 font-semibold flex gap-2 items-center'><MdContactPhone /> Add Contact</button>
                        </div>
                    </div>
                    <hr className='mt-2 mb-5 border-slate-600' />
                    <div className='overflow-x-auto rounded-xl shadow-sm'>
                        <table className='min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-900'>
                            <thead className='bg-gray-50 dark:bg-gray-800'>
                                <tr>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>#</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Name</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Description</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Phone</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Contact Level</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-100 dark:divide-gray-700'>
                                {sampleContacts.map((contact) => (
                                    <tr key={contact.contactID} className='hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>{contact.contactID}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>{contact.contactName}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{contact.contactDescription}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{contact.contactPhone}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{contact.contactLevel}</td>
                                        <td className='px-6 py-4  whitespace-nowrap text-sm font-medium flex gap-2 justify-center'>
                                            <button className='px-2 py-1 rounded text-white bg-green-400 hover:bg-green-900 dark:bg-green-400'>View</button>
                                            <button className='px-2 py-1 rounded text-white bg-indigo-400 hover:bg-indigo-900 dark:bg-indigo-400'>Edit</button>
                                            <button className='px-2 py-1 rounded text-white bg-red-400 hover:bg-red-900 dark:bg-red-400'>Remove</button>
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

export default contacts