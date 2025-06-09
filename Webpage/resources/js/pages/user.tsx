import { Breadcrumbs } from '@/components/breadcrumbs'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { User2Icon } from 'lucide-react';
import React from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users Lists',
        href: '/users',
    },
];

type User = {
    id: number
    name: string
    email: string
    role: string
}

const sampleUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
]


const user = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Users' />
            <div className='h-full w-full p-6'>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='text-2xl font-semibold'>User List</h1>
                        <p className='text-sm'> Sample Description of this page</p>
                    </div>
                    <div>
                        <button className='py-2 px-4 cursor-pointer rounded-md bg-green-400 font-semibold flex gap-2'><User2Icon /> Add User</button>
                    </div>
                </div>
                <hr className='mt-2 mb-5 border-slate-600' />
                <div className='overflow-x-auto rounded-xl shadow-sm'>
                    <table className='min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-900'>
                        <thead className='bg-gray-50 dark:bg-gray-800'>
                            <tr>
                                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>#</th>
                                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Name</th>
                                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Email</th>
                                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Role</th>
                                <th className='px-6 py-3'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100 dark:divide-gray-700'>
                            {sampleUsers.map((user) => (
                                <tr key={user.id} className='hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>{user.id}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>{user.name}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{user.email}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{user.role}</td>
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
    )
}

export default user