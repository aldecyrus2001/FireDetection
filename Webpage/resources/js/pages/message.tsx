import Modal from '@/components/custom/universal-modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select'
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types'
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler, useEffect, useState } from 'react'
import { MdOutlineMessage } from 'react-icons/md';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Message',
        href: '/message'
    }
]

type messageForm = {
    title: string,
    content: string,
    priority: string,
    isActive: boolean,
}

type messages = {
    id: number
    created_at: string;
} & messageForm;

const message = () => {
    const [addMessage, setAddMessage] = useState(false);
    const [viewMessage, setViewMessage] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<messages | null>(null);
    const [messages, setMessages] = useState<messages[]>([]);
    const { data, setData, post, processing, errors, reset } = useForm<Required<messageForm>>({
        title: '',
        content: '',
        priority: '',
        isActive: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('add-message'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Message created successfully!');
                setAddMessage(false);
                reset();
                fetchMessages();
            },
            onError: (errors) => {
                const errorMessages = Object.values(errors).flat();
                toast.error(errorMessages[0] || 'Failed to create message!');
            }
        })
    }

    useEffect(() => {
        fetchMessages();
    }, [])

    const fetchMessages = async () => {
        try {
            const response = await fetch(route('get-messages'));
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            toast.error(errorMessage);
        }
    }

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
                            <button onClick={() => setAddMessage(true)} className='py-2 px-4 cursor-pointer rounded-md bg-green-400 font-semibold flex gap-2 items-center'><MdOutlineMessage /> Add Message</button>
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
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Status</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-100 dark:divide-gray-700'>
                                {messages.map((message) => (
                                    <tr key={message.id} className='hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>{message.id}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>{message.title}</td>
                                        <td className='px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-300'>
                                            <div className='max-w-[200px] truncate mx-auto'>{message.content}</div>
                                        </td>
                                        {message.isActive === true ? (
                                            <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>Active {message.priority}</td>
                                        ) : <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>Inactive</td>}
                                        <td className='px-6 py-4  whitespace-nowrap text-sm font-medium flex gap-2 justify-center'>
                                            <button className='px-2 py-1 rounded text-white bg-green-400 hover:bg-green-900 dark:bg-green-400'
                                                onClick={() => {
                                                    setSelectedMessage(message);
                                                    setViewMessage(true);
                                                }}>View</button>
                                            <button className='px-2 py-1 rounded text-white bg-indigo-400 hover:bg-indigo-900 dark:bg-indigo-400'>Edit</button>
                                            {message.isActive === true ? (
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
            <Modal header='Add Message' subtitle='sample subtitle' isVisible={addMessage} onClose={() => setAddMessage(false)} children={
                <>
                    <form onSubmit={submit}>
                        <div className='overflow-x-auto p-4'>
                            <div className="flex flex-col gap-4 w-200">
                                <div className="grid gap-2">
                                    <Label htmlFor="title" className='text-black'>Message Title</Label>
                                    <Input
                                        className='text-black'
                                        id="title"
                                        type="text"
                                        required
                                        tabIndex={1}
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Title"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="priority" className='text-black'>Priority Level</Label>
                                    <p className='text-xs px-2'>Note: The Priority Level indicates how important a contact is during emergencies—those marked as High will be contacted first in urgent situations, Medium for moderate importance, and Low if others are unavailable or for general updates. Please choose the level that best reflects the contact’s urgency in emergency scenarios.</p>
                                    <Select
                                        value={data.priority}
                                        onValueChange={(value) => setData('priority', value)}
                                    >
                                        <SelectTrigger id="priority" className="text-black">
                                            <SelectValue placeholder="Select Priority Level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="High">High</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="Low">Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="content" className='text-black'>Message Content</Label>
                                    <textarea placeholder='Meesage Content' name="content" id="content" className={cn(
                                        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                        "min-h-[12rem] resize-y"
                                    )} value={data.content} onChange={(e) => setData('content', e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="mt-10 w-full bottom-10 right-10 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
                                <button className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded-md" onClick={() => { setAddMessage(false); }}>Cancel</button>
                                <button type='submit' className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md">Save</button>
                            </div>
                        </div>
                    </form>
                </>
            } />

            <Modal header='View Message' subtitle='Please read the entire message carefully and follow all safety instructions immediately.' isVisible={viewMessage} onClose={() => setViewMessage(false)} children={
                selectedMessage && (
                    <>
                        <div className='overflow-x-auto px-4'>
                            <div className="flex flex-col gap-3 w-200">
                                <div className='inline-flex justify-between'>
                                    <div className='font-semibold'>{selectedMessage.title}</div>
                                    <div className='font-light text-sm'>
                                        {new Date(selectedMessage.created_at).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            hour12: true,
                                        })}
                                    </div>
                                </div>
                                <div className="text-sm max-h-80 overflow-y-auto whitespace-pre-wrap text-justify p-2">
                                    {selectedMessage.content}
                                </div>
                            </div>
                            <div className="mt-10 w-full bottom-10 right-10 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
                                <button
                                    type="button"
                                    className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded-md"
                                    onClick={() => setViewMessage(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </>
                )
            } />
        </>
    )
}

export default message