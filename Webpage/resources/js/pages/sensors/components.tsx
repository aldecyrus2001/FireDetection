import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types'
import { Head, router, useForm } from '@inertiajs/react';
import { MdCircle, MdOutlineSensors } from "react-icons/md";
import React, { FormEventHandler, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { resolve } from 'path';
import Modal from '@/components/custom/universal-modal';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import MapPreview from '@/components/custom/map-preview';
import { notifyError, notifyPromise } from '@/components/custom/toast';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Components Lists',
        href: '/components'
    }
];

type Components = {
    sensorID: number;
    sensor_name: string;
    sensor_location: string;
    token: string;
    x_axis: number;
    y_axis: number;
    status: string;
    isAlert: number;
}

type sensorForm = {
    sensor_name: string;
    token: string;
    sensor_location: string;
    x_axis: any;
    y_axis: any;
}

const components = () => {
    const [sensors, setSensors] = useState<Components[]>([]);
    const [addModal, setAddModal] = useState(false);
    const [showMapLayout, setMapLayout] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<Required<sensorForm>>({
        sensor_name: '',
        token: '',
        sensor_location: '',
        x_axis: '',
        y_axis: ''
    });

    useEffect(() => {
        fetchSensors();
    }, [])

    const fetchSensors = async () => {
        try {
            const response = await fetch(route('fetch-sensors'));
            const data = await response.json();
            setSensors(data);
            console.log(window.location.origin)
        }
        catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            toast.error(errorMessage);
        }
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formSubmission = new Promise((resolve, reject) => {
            post(route('submit-sensor'), {
                onSuccess: (response) => {
                    resolve(response);
                },
                onError: (e) => {
                    reject(e);
                },
                onFinish: () => {
                    reset();
                    setAddModal(false);
                    fetchSensors();
                }
            });
        });

        notifyPromise(
            formSubmission,
            'Sensor data submitted successfully!',
            'Failed to submit sensor data, Please check Ip Address!',
            'Submitting sensor data...'
        );
    };

    const showMapPreview = (x: string, y: string) => {
        const isNumber = (value: string) => /^-?\d*\.?\d+$/.test(value);
        if (x === '' || y === '') {
            notifyError('Please input data for both the X and Y axis. Thank you!');
        } else if (!isNumber(x) || !isNumber(y)) {
            notifyError('X and Y must be numeric values only.');
        } else {
            setMapLayout(true);
        }
    }

    const ping = async (sensorID: number, ipAddress: string) => {
        try {
            const response = await fetch(route('ping-sensor') + `?sensorID=${sensorID}&ipAddress=${encodeURIComponent(ipAddress)}`);
            const data = await response.json();
            data.success ? toast.success(data.message) : toast.error(data.message)
            fetchSensors();
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            toast.error(errorMessage);
        }
    }

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title='Components' />
                <div className='h-full w-full p-6'>
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-2xl font-semibold'>Components List</h1>
                            <p className='text-sm'> Sample Description of this page</p>
                        </div>
                        <div>
                            <button className='py-2 px-4 cursor-pointer rounded-md bg-green-400 font-semibold flex gap-2 items-center'
                                // onClick={() => router.visit(route('addSensor'))}
                                onClick={() => setAddModal(true)}
                            >
                                <MdOutlineSensors /> Add Sensor
                            </button>
                        </div>
                    </div>
                    <hr className='mt-2 mb-5 border-slate-600' />
                    <div className='overflow-x-auto rounded-xl shadow-sm'>
                        <table className='min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-900'>
                            <thead className='bg-gray-50 dark:bg-gray-800'>
                                <tr>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>#</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Sensor Name</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Token</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Location</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Coordination X, Y</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Status</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-100 dark:divide-gray-700'>
                                {sensors.map((components) => (
                                    <tr key={components.sensorID} className='hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>{components.sensorID}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>{components.sensor_name}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{components.token}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{components.sensor_location}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{components.x_axis}, {components.y_axis}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            <div className="flex items-center justify-center gap-2">
                                                <MdCircle className={components.status == 'Online' ? 'text-green-500' : 'text-red-500'} />
                                                {components.status}
                                            </div>
                                        </td>
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
            <Modal header='Add Sensor' subtitle='sample subtitle' isVisible={addModal} onClose={() => setAddModal(false)} children={
                <>
                    <form onSubmit={submit}>
                        <div className='overflow-x-auto p-4'>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="sensor_name" className='text-black'>Sensor Name</Label>
                                    <Input
                                        className='text-black'
                                        id="sensor_name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        value={data.sensor_name}
                                        onChange={(e) => setData('sensor_name', e.target.value)}
                                        placeholder="Sensor Name"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="sensor_location" className='text-black'>Sensor Location</Label>
                                    <Input
                                        className='text-black'
                                        id="sensor_location"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={2}
                                        value={data.sensor_location}
                                        onChange={(e) => setData('sensor_location', e.target.value)}
                                        placeholder="Sensor Location"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="token" className='text-black'>Sensor Token</Label>
                                    <Input
                                        className='text-black'
                                        id="token"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={3}
                                        value={data.token}
                                        onChange={(e) => setData('token', e.target.value)}
                                        placeholder="Token"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="y_axis" className='text-black'>Y Axis Location</Label>
                                    <Input
                                        className='text-black'
                                        id="y_axis"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={4}
                                        value={data.y_axis}
                                        onChange={(e) => setData('y_axis', e.target.value)}
                                        placeholder="Sensor Y Axis Location"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="x_axis" className='text-black'>X Axis Location</Label>
                                    <Input
                                        className='text-black'
                                        id="x_axis"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={5}
                                        value={data.x_axis}
                                        onChange={(e) => setData('x_axis', e.target.value)}
                                        placeholder="Sensor X Axis Location"
                                    />
                                </div>
                            </div>
                            <div className="mt-10 w-full bottom-10 right-10 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
                                <button className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded-md" onClick={() => { setAddModal(false); reset(); }}>Cancel</button>
                                <div className="cursor-pointer bg-red-500 text-white py-2 px-4 rounded-md" onClick={() => showMapPreview(data.x_axis, data.y_axis)}>Map Preview</div>
                                <button type='submit' className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md">Save</button>
                            </div>
                        </div>
                    </form>
                </>
            } />

            <MapPreview topcoordination={data.y_axis + '%'} leftcoordination={data.x_axis + '%'} isVisible={showMapLayout} onclose={() => setMapLayout(false)}>

            </MapPreview>
        </>
    )
}

export default components