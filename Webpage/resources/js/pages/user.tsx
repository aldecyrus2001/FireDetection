import { Breadcrumbs } from '@/components/breadcrumbs'
<<<<<<< HEAD
import { DeleteModal } from '@/components/custom/delete-modal';
=======
import { CustomButton } from '@/components/custom/button';
import { ConfirmationModal } from '@/components/custom/confirmation-modal';
>>>>>>> 2c8d97afb56158ff6fd4ae7f733c0d3965bb1202
import { notifyPromise } from '@/components/custom/toast';
import Modal from '@/components/custom/universal-modal';
import { UserForm } from '@/components/custom/user/user-form';
import { UserTable } from '@/components/custom/user/user-table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';
<<<<<<< HEAD
import { AlertTriangleIcon, Edit, Trash2Icon, User2Icon } from 'lucide-react';
=======
import { Trash2Icon, User2Icon } from 'lucide-react';
>>>>>>> 2c8d97afb56158ff6fd4ae7f733c0d3965bb1202
import { resolve } from 'path';
import React, { FormEventHandler, useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';


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

type userForm = {
    id?: number,
    name: string,
    email: string,
    password: string,
    confirm_password: string,
    role: string
}



<<<<<<< HEAD
const User = () => {
=======
const user = () => {
    const [deleteModal, setDeleteModal] = useState(false);
    const { delete: destroy } = useForm();
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
>>>>>>> 2c8d97afb56158ff6fd4ae7f733c0d3965bb1202
    const { auth } = usePage<SharedData>().props;
    const [userList, setUsers] = useState<User[]>([]);
    const [addUser, setAddUser] = useState(false);
    const [viewUser, setViewUser] = useState<User | null>(null);
<<<<<<< HEAD
    const [updateUser, setUpdateUser] = useState<User | null>(null);
    const [deleteUser, setDeleteUser] = useState<User | null>(null);
    const { data: createData, setData: setCreateData, post, processing: creating, reset: resetCreateForm, errors: createErrors, } = useForm<userForm>({
=======
    const [editModal, setEditModal] = useState<User | null>(null);
    const { data, setData, post, processing, errors, reset } = useForm<Required<userForm>>({
>>>>>>> 2c8d97afb56158ff6fd4ae7f733c0d3965bb1202
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        role: '',
    });

<<<<<<< HEAD
    const onEditUser = (user: User) => {
        setUpdateUser(user);
        setUpdateData({
            id: user.id,
=======
    const handleEditClick = (user: User) => {
        setEditModal(user); // open the modal
        setData({
>>>>>>> 2c8d97afb56158ff6fd4ae7f733c0d3965bb1202
            name: user.name,
            email: user.email,
            password: '',
            confirm_password: '',
            role: user.role,
<<<<<<< HEAD
        });
    };

    const { data: updateData, setData: setUpdateData, put, processing: updating, reset: resetUpdateForm, errors: updateErrors, } = useForm<userForm>({
        id: 0,
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        role: '',
    });


=======
        }); // preload the form data
    };

>>>>>>> 2c8d97afb56158ff6fd4ae7f733c0d3965bb1202
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(route('fetch-users'));
            const data = await response.json();
            console.log(data);
            setUsers(data);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            toast.error(errorMessage);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (createData.password !== createData.confirm_password) {
            toast.error("Password not match");
            return;
        }

        post(route('submit-user'), {
            onSuccess: (response) => {
                toast.success('User added successfully!')
            },
            onError: (e) => {
                const errorMessages = Object.values(e).flat();
                console.log("Error messages:", errorMessages);

                if (errorMessages.length > 0) {
                    toast.error(errorMessages[0]);
                } else {
                    toast.error("Failed to submit user data.");
                }

            },
            onFinish: () => {
                resetCreateForm();
                setAddUser(false);
                fetchUsers();
            }
        })


    };

<<<<<<< HEAD
    const updateSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!updateUser) return;

        put(route('update-user', updateUser.id), {
            onSuccess: () => {
                toast.success('User updated Successfully!');
=======
    const editUser: FormEventHandler = (e) => {
        e.preventDefault();

        if (!editModal) return;

        post(route('update-user', editModal.id), {
            method: 'put',
            onSuccess: () => {
                toast.success("User updated successfully!");
                setEditModal(null);
                fetchUsers();
                reset();
>>>>>>> 2c8d97afb56158ff6fd4ae7f733c0d3965bb1202
            },
            onError: (e) => {
                const errorMessages = Object.values(e).flat();
                toast.error(errorMessages[0] || "Failed to update user.");
            },
<<<<<<< HEAD
            onFinish: () => {
                resetUpdateForm();
                setUpdateUser(null);
                fetchUsers();
            }
        });
    };

    const handleDeleteUser = async () => {
        if (!deleteUser) return;

        router.delete(route('delete-user', deleteUser.id), {
            onSuccess: () => {
                toast.success("User deleted successfully!");
=======
        });
    };

    
    const handleDelete = (userID: number) => {
        destroy(route('delete-user', userID), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("User Deleted Successfully!");
                fetchUsers();
>>>>>>> 2c8d97afb56158ff6fd4ae7f733c0d3965bb1202
            },
            onError: (e) => {
                const errorMessages = Object.values(e).flat();
                toast.error(errorMessages[0] || "Failed to delete user.");
<<<<<<< HEAD
            },
            onFinish: () => {
                setDeleteUser(null);
                fetchUsers();
            }
        });
    }
=======
            }
        });
    };
>>>>>>> 2c8d97afb56158ff6fd4ae7f733c0d3965bb1202

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title='Users' />
                <div className='h-full w-full p-6'>
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-2xl font-semibold'>User List</h1>
                            <p className='text-sm'> Sample Description of this page</p>
                        </div>
                        <div>
<<<<<<< HEAD
                            {auth.user.role === 'admin' ? <button onClick={() => setAddUser(true)} className='py-2 px-4 cursor-pointer rounded-md bg-green-400 font-semibold flex gap-2'><User2Icon /> Add User</button> : <></>}
=======
                            <button onClick={() => {
                                reset();
                                setAddUser(true);
                            }} className='py-2 px-4 cursor-pointer rounded-md bg-green-400 font-semibold flex gap-2'><User2Icon /> Add User</button>
>>>>>>> 2c8d97afb56158ff6fd4ae7f733c0d3965bb1202
                        </div>
                    </div>
                    <hr className='mt-2 mb-5 border-slate-600' />
                    <div className='overflow-x-auto rounded-xl shadow-sm'>
<<<<<<< HEAD
                        <UserTable userList={userList} onEditUser={onEditUser} setDeleteUser={setDeleteUser} setViewUser={setViewUser} auth={auth} />
                    </div>
                </div>
            </AppLayout>
=======
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
                                        <td className='px-6 py-4  whitespace-nowrap text-sm font-medium flex gap-2 justify-center'>
                                            <button className='px-2 py-1 rounded text-white bg-green-400 hover:bg-green-900 dark:bg-green-400' onClick={() => setViewUser(user)}>View</button>
                                            <button className='px-2 py-1 rounded text-white bg-indigo-400 hover:bg-indigo-900 dark:bg-indigo-400' onClick={() => handleEditClick(user)}>Edit</button>
                                            {user.role === 'admin' || auth.user.role === 'User' ? <></> : <button className='px-2 py-1 rounded text-white bg-red-400 hover:bg-red-900 dark:bg-red-400' onClick={() => { setSelectedUserId(user.id); setDeleteModal(true); }}>Remove</button>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AppLayout>
            <Modal header='Add User' subtitle='sample' isVisible={addUser} onClose={() => setAddUser(false)} children={
                <>
                    <form onSubmit={submit}>
                        <div className='overflow-x-auto p-4'>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="fullname" className='text-black'>Full Name</Label>
                                    <Input
                                        className='text-black'
                                        id="fullname"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Full Name"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email" className='text-black'>Email</Label>
                                    <Input
                                        className='text-black'
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Email"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="role" className='text-black'>Role</Label>
                                    <Input
                                        className='text-black'
                                        id="role"
                                        type="text"
                                        required
                                        tabIndex={3}
                                        value={data.role}
                                        placeholder="Role"
                                        disabled
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password" className='text-black'>Password</Label>
                                    <Input
                                        className='text-black'
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Password"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="confirm_password" className='text-black'>Confirm Password</Label>
                                    <Input
                                        className='text-black'
                                        id="confirm_password"
                                        type="password"
                                        required
                                        tabIndex={5}
                                        value={data.confirm_password}
                                        onChange={(e) => setData('confirm_password', e.target.value)}
                                        placeholder="Confirm Password"
                                    />
                                </div>

                            </div>
                            <div className="mt-10 w-full bottom-10 right-10 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
                                <button className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded-md" onClick={() => { setAddUser(false); reset(); }}>Cancel</button>
                                <button type='submit' className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md">Save</button>
                            </div>
                        </div>
                    </form>
                </>
            }>
            </Modal>
>>>>>>> 2c8d97afb56158ff6fd4ae7f733c0d3965bb1202

            <Modal header='View User' subtitle='sample' isVisible={viewUser !== null} onClose={() => setViewUser(null)} children={
                <>
                    {viewUser && (
                        <div className='w-80 gap-3 inline-flex text-sm'>
                            <div className='flex flex-col text-end font-semibold'>
                                <span>Fullname : </span>
                                <span>Email : </span>
                                <span>Role : </span>
                            </div>
                            <div className='flex flex-col'>
                                <span>{viewUser.name}</span>
                                <span>{viewUser.email}</span>
                                <span>{viewUser.role}</span>
                            </div>
                        </div>
                    )}
                </>
            }>
            </Modal>

<<<<<<< HEAD
            <Modal header='Add User' subtitle='sample' isVisible={addUser} onClose={() => setAddUser(false)} children={
                <>
                    <UserForm mode='add' data={createData} onChange={(field, value) => setCreateData(prev => ({ ...prev, [field]: value }))} onSubmit={submit} onCancel={() => setAddUser(false)} processing={false} errors={{}}
                    />
=======
            <Modal header='Edit User' subtitle='sample' isVisible={editModal !== null} onClose={() => setEditModal(null)} children={
                <>
                    {editModal && (
                        <form onSubmit={editUser}>
                            <div className='overflow-x-auto p-4'>
                                <div className="grid grid-cols-1 gap-4 w-100">
                                    <div className="grid gap-2">
                                        <Label htmlFor="fullname" className='text-black'>Full Name</Label>
                                        <Input
                                            className='text-black'
                                            id="fullname"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Full Name"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className='text-black'>Email</Label>
                                        <Input
                                            className='text-black'
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="Email"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="role" className='text-black'>Role</Label>
                                        <Input
                                            className='text-black'
                                            id="role"
                                            type="text"
                                            required
                                            tabIndex={3}
                                            value={data.role}
                                            placeholder="Role"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="mt-10 w-full bottom-10 right-10 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
                                    <button className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded-md" onClick={() => { setEditModal(null); reset(); }}>Cancel</button>
                                    <button type='submit' className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md">Save</button>
                                </div>
                            </div>
                        </form>
                    )}
>>>>>>> 2c8d97afb56158ff6fd4ae7f733c0d3965bb1202
                </>
            }>
            </Modal>

<<<<<<< HEAD
            <Modal header='Update User' subtitle='sample' isVisible={updateUser !== null} onClose={() => setUpdateUser(null)} children={
                <>
                    <UserForm mode='edit' data={updateData} onChange={(field, value) => setUpdateData(prev => ({ ...prev, [field]: value }))} onSubmit={updateSubmit} onCancel={() => setUpdateUser(null)} processing={updating} errors={updateErrors} />
                </>
            }>
            </Modal>

            <DeleteModal isVisible={deleteUser !== null} onClose={() => setDeleteUser(null)} onConfirm={handleDeleteUser} />
=======
            <ConfirmationModal Title='Confirm Deletion' Content='This action cannot be undone. The data will permanently deleted.' onCancle={() => setDeleteModal(false)} onConfirm={() => {
                if (selectedUserId !== null) {
                    handleDelete(selectedUserId);
                    setDeleteModal(false);
                }
            }} isVisible={deleteModal} />

>>>>>>> 2c8d97afb56158ff6fd4ae7f733c0d3965bb1202
        </>
    )
}

export default User