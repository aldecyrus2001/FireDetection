import { DeleteModal } from '@/components/custom/delete-modal'
import Modal from '@/components/custom/universal-modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head, router, useForm } from '@inertiajs/react'
import React, { FormEventHandler, useEffect, useState } from 'react'
import { MdContactPhone } from 'react-icons/md'
import { toast } from 'react-toastify'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contacts',
        href: '/contact-list'
    }
]

type Contact = {
    id: number;
    name: string,
    phone: string,
    email: string,
    priority_level: string,
}
type contactForm = {
    id?: number,
    name: string,
    phone: string,
    priority_level: string,
    email: string,
}

const contacts = () => {
    const [viewContact, setViewContact] = useState<Contact | null>(null);
    const [updateContact, setUpdateContact] = useState<Contact | null>(null);
    const [deleteContact, setDeleteContact] = useState<Contact | null>(null);
    const [addContact, setAddContact] = useState(false);
    const [contact, setContact] = useState<Contact[]>([]);
    const { data: createData, setData: setCreateData, post, processing: createProcessing, errors: errorsCreate, reset: resetCreate } = useForm<contactForm>({
        name: '',
        phone: '',
        priority_level: '',
        email: '',
    });

    const onEditContact = (contact: Contact) => {
        setUpdateContact(contact);
        updateSetData({
            id: contact.id,
            name: contact.name,
            phone: contact.phone,
            priority_level: contact.priority_level,
            email: contact.email,
        });
    }


    const { data: updateData, setData: updateSetData, put, processing: updateProcessing, errors: updateErrors, reset: resetUpdate } = useForm<contactForm>({
        id: 0,
        name: '',
        phone: '',
        priority_level: '',
        email: '',
    });

    
    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch(route('get-contacts'));
            const data = await response.json();
            setContact(data);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            toast.error(errorMessage);
        }
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('add-contact'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Contact added successfully!');
                setAddContact(false);
                resetCreate();
                fetchContacts();
            },
            onError: (errors) => {
                const errorMessages = Object.values(errors).flat();
                toast.error(errorMessages[0] || 'Failed to create contact!');
            }
        });
    }

    const updateSubmit : FormEventHandler = (e) => {
        e.preventDefault();

        if(!updateContact) return;

        put(route('update-contact', updateContact.id), {
            onSuccess: () => {
                toast.success("Contact updated successfully!");
            },
            onError: (e) => {
                const errorMessages = Object.values(e).flat();
                toast.error(errorMessages[0] || "Failed to update contact");
            },
            onFinish: () => {
                resetUpdate();
                setUpdateContact(null);
                fetchContacts();
            }
        })
    }

    const handleDeleteContact = async() => {
        if(!deleteContact) return;

        router.delete(route('delete-contact', deleteContact.id), {
            onSuccess: () => {
                toast.success("Contact deleted successfully!");
            },
            onError: (e) => {
                const errorMessages = Object.values(e).flat();
                toast.error(errorMessages[0] || "Failed to deleted contact.");
            },
            onFinish: () => {
                setDeleteContact(null);
                fetchContacts();
            }
        })
    }

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
                            <button onClick={() => setAddContact(true)} className='py-2 px-4 cursor-pointer rounded-md bg-green-400 font-semibold flex gap-2 items-center'><MdContactPhone /> Add Contact</button>
                        </div>
                    </div>
                    <hr className='mt-2 mb-5 border-slate-600' />
                    <div className='overflow-x-auto rounded-xl shadow-sm'>
                        <table className='min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-900'>
                            <thead className='bg-gray-50 dark:bg-gray-800'>
                                <tr>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>#</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Name</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Phone</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Email Address</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Contact Level</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-100 dark:divide-gray-700'>
                                {contact.map((contacts) => (
                                    <tr key={contacts.id} className='hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>{contacts.id}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>{contacts.name}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{contacts.phone}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{contacts.email}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{contacts.priority_level}</td>
                                        <td className='px-6 py-4  whitespace-nowrap text-sm font-medium flex gap-2 justify-center'>
                                            <button className='px-2 py-1 rounded text-white bg-green-400 hover:bg-green-900 dark:bg-green-400' onClick={() => setViewContact(contacts)}>View</button>
                                            <button className='px-2 py-1 rounded text-white bg-indigo-400 hover:bg-indigo-900 dark:bg-indigo-400' onClick={() => onEditContact(contacts)}>Edit</button>
                                            <button className='px-2 py-1 rounded text-white bg-red-400 hover:bg-red-900 dark:bg-red-400' onClick={() => setDeleteContact(contacts)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AppLayout>
            <Modal header='Add Contact' subtitle='sample subtitle' isVisible={addContact} onClose={() => setAddContact(false)} children={
                <>
                    <form onSubmit={submit}>
                        <div className='overflow-x-auto p-4'>
                            <div className="flex flex-col gap-4 w-200">
                                <div className="grid gap-2">
                                    <Label htmlFor="contact_name" className='text-black'>Contact Name</Label>
                                    <Input
                                        className='text-black'
                                        id="contact_name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        value={createData.name}
                                        onChange={(e) => setCreateData('name', e.target.value)}
                                        placeholder="Contact Name"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone" className='text-black'>Phone Number</Label>
                                    <Input
                                        className='text-black'
                                        id="phone"
                                        type="text"
                                        required
                                        tabIndex={2}
                                        value={createData.phone}
                                        onChange={(e) => setCreateData('phone', e.target.value)}
                                        placeholder="+63 XXX XXXX XXX"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className='text-black'>Email Address</Label>
                                    <Input
                                        className='text-black'
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        value={createData.email}
                                        onChange={(e) => setCreateData('email', e.target.value)}
                                        placeholder="Email Address"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone" className='text-black'>Priority Level</Label>
                                    <p className='text-xs px-2'>Note: The Priority Level indicates how important a contact is during emergencies—those marked as High will be contacted first in urgent situations, Medium for moderate importance, and Low if others are unavailable or for general updates. Please choose the level that best reflects the contact’s urgency in emergency scenarios.</p>
                                    <Select
                                        value={createData.priority_level}
                                        onValueChange={(value) => setCreateData('priority_level', value)}
                                    >
                                        <SelectTrigger id="priority" className="text-black">
                                            <SelectValue placeholder="Select Priority Level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="High">High</SelectItem>
                                            <SelectItem value="Moderate">Moderate</SelectItem>
                                            <SelectItem value="Low">Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="mt-10 w-full bottom-10 right-10 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
                                <button className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded-md" onClick={() => { setAddContact(false); resetCreate(); }}>Cancel</button>
                                <button type='submit' className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md">Create</button>
                            </div>
                        </div>
                    </form>
                </>
            }>

            </Modal>
            <Modal
                header='Contact Details'
                subtitle=''
                isVisible={viewContact !== null}
                onClose={() => setViewContact(null)}
            >
                {viewContact && (
                    <div className=' text-black space-y-4 w-100'>
                        <div className='m-0'>
                            <Label>Name: {viewContact.name}</Label>
                        </div>
                        <div className='m-0'>
                            <Label>Phone: {viewContact.phone}</Label>
                        </div>
                        <div className='m-0'>
                            <Label>Email: {viewContact.email}</Label>
                        </div>
                        <div className='m-0'>
                            <Label>Priority Level: {viewContact.priority_level}</Label>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal header='Update Contact' subtitle='sample subtitle' isVisible={updateContact !== null} onClose={() => setUpdateContact(null)} children={
                <>
                    <form onSubmit={updateSubmit}>
                        <div className='overflow-x-auto p-4'>
                            <div className="flex flex-col gap-4 w-200">
                                <div className="grid gap-2">
                                    <Label htmlFor="contact_name" className='text-black'>Contact Name</Label>
                                    <Input
                                        className='text-black'
                                        id="contact_name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        value={updateData.name}
                                        onChange={(e) => updateSetData('name', e.target.value)}
                                        placeholder="Contact Name"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone" className='text-black'>Phone Number</Label>
                                    <Input
                                        className='text-black'
                                        id="phone"
                                        type="text"
                                        required
                                        tabIndex={2}
                                        value={updateData.phone}
                                        onChange={(e) => updateSetData('phone', e.target.value)}
                                        placeholder="+63 XXX XXXX XXX"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className='text-black'>Email Address</Label>
                                    <Input
                                        className='text-black'
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        value={updateData.email}
                                        onChange={(e) => updateSetData('email', e.target.value)}
                                        placeholder="Email Address"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone" className='text-black'>Priority Level</Label>
                                    <p className='text-xs px-2'>Note: The Priority Level indicates how important a contact is during emergencies—those marked as High will be contacted first in urgent situations, Medium for moderate importance, and Low if others are unavailable or for general updates. Please choose the level that best reflects the contact’s urgency in emergency scenarios.</p>
                                    <Select
                                        value={updateData.priority_level}
                                        onValueChange={(value) => updateSetData('priority_level', value)}
                                    >
                                        <SelectTrigger id="priority" className="text-black">
                                            <SelectValue placeholder="Select Priority Level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="High">High</SelectItem>
                                            <SelectItem value="Moderate">Moderate</SelectItem>
                                            <SelectItem value="Low">Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="mt-10 w-full bottom-10 right-10 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
                                <button className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded-md" onClick={() => { setUpdateContact(null); resetUpdate(); }}>Cancel</button>
                                <button type='submit' className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md">Update</button>
                            </div>
                        </div>
                    </form>
                </>
            }>

            </Modal>

            <DeleteModal isVisible={deleteContact !== null} onClose={() => setDeleteContact(null)} onConfirm={handleDeleteContact} />
        </>
    )
}

export default contacts