import { Breadcrumbs } from '@/components/breadcrumbs'
import { DeleteModal } from '@/components/custom/delete-modal';
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
import { AlertTriangleIcon, Edit, Trash2Icon, User2Icon } from 'lucide-react';
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



const User = () => {
    const { auth } = usePage<SharedData>().props;
    const [userList, setUsers] = useState<User[]>([]);
    const [addUser, setAddUser] = useState(false);
    const [viewUser, setViewUser] = useState<User | null>(null);
    const [updateUser, setUpdateUser] = useState<User | null>(null);
    const [deleteUser, setDeleteUser] = useState<User | null>(null);
    const { data: createData, setData: setCreateData, post, processing: creating, reset: resetCreateForm, errors: createErrors, } = useForm<userForm>({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        role: '',
    });

    const onEditUser = (user: User) => {
        setUpdateUser(user);
        setUpdateData({
            id: user.id,
            name: user.name,
            email: user.email,
            password: '',
            confirm_password: '',
            role: user.role,
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

    const updateSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!updateUser) return;

        put(route('update-user', updateUser.id), {
            onSuccess: () => {
                toast.success('User updated Successfully!');
            },
            onError: (e) => {
                const errorMessages = Object.values(e).flat();
                toast.error(errorMessages[0] || "Failed to update user.");
            },
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
            },
            onError: (e) => {
                const errorMessages = Object.values(e).flat();
                toast.error(errorMessages[0] || "Failed to delete user.");
            },
            onFinish: () => {
                setDeleteUser(null);
                fetchUsers();
            }
        });
    }

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
                            {auth.user.role === 'admin' ? <button onClick={() => setAddUser(true)} className='py-2 px-4 cursor-pointer rounded-md bg-green-400 font-semibold flex gap-2'><User2Icon /> Add User</button> : <></>}
                        </div>
                    </div>
                    <hr className='mt-2 mb-5 border-slate-600' />
                    <div className='overflow-x-auto rounded-xl shadow-sm'>
                        <UserTable userList={userList} onEditUser={onEditUser} setDeleteUser={setDeleteUser} setViewUser={setViewUser} auth={auth} />
                    </div>
                </div>
            </AppLayout>

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

            <Modal header='Add User' subtitle='sample' isVisible={addUser} onClose={() => setAddUser(false)} children={
                <>
                    <UserForm mode='add' data={createData} onChange={(field, value) => setCreateData(prev => ({ ...prev, [field]: value }))} onSubmit={submit} onCancel={() => setAddUser(false)} processing={false} errors={{}}
                    />
                </>
            }>
            </Modal>

            <Modal header='Update User' subtitle='sample' isVisible={updateUser !== null} onClose={() => setUpdateUser(null)} children={
                <>
                    <UserForm mode='edit' data={updateData} onChange={(field, value) => setUpdateData(prev => ({ ...prev, [field]: value }))} onSubmit={updateSubmit} onCancel={() => setUpdateUser(null)} processing={updating} errors={updateErrors} />
                </>
            }>
            </Modal>

            <DeleteModal isVisible={deleteUser !== null} onClose={() => setDeleteUser(null)} onConfirm={handleDeleteUser} />
        </>
    )
}

export default User