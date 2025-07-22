    import React from 'react'

    interface User {
        id: number;
        name: string;
        email: string;
        role: string;
    }

    interface UserTableProps {
        userList: User[];
        onEditUser: (user: User) => void;
        setDeleteUser: (user: User) => void;
        setViewUser: (user: User) => void;
        auth: any;
    }

    export const UserTable = ({ userList, onEditUser, setDeleteUser, setViewUser, auth } : UserTableProps) => {
        return (
            <>

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
                        {userList.map((user) => (
                            <tr key={user.id} className='hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>{user.id}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>{user.name}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{user.email}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{user.role}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2 justify-center'>
                                    <button className='px-2 py-1 rounded text-white bg-green-400 hover:bg-green-900 dark:bg-green-400' onClick={() => setViewUser(user)}>View</button>
                                    <button className='px-2 py-1 rounded text-white bg-indigo-400 hover:bg-indigo-900 dark:bg-indigo-400' onClick={() => onEditUser(user)}>Edit</button>
                                    {user.role === 'admin' || auth.user.role === 'User' ? null : (
                                        <button className='px-2 py-1 rounded text-white bg-red-400 hover:bg-red-900 dark:bg-red-400' onClick={() => setDeleteUser(user)}>Remove</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        )
    }
