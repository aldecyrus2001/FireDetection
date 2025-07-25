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
import { DeleteModal } from '@/components/custom/delete-modal';


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
    x_axis: string;
    y_axis: string;
    status: string;
    isAlert: number;
}

type sensorForm = {
    sensorID?: number;
    sensor_name: string;
    token: string;
    sensor_location: string;
    x_axis: any;
    y_axis: any;
}

const Components = () => {
    const [sensors, setSensors] = useState<Components[]>([]);
    const [addModal, setAddModal] = useState(false);
    const [viewSensor, setViewSensor] = useState<Components | null>(null);
    const [updateSensor, setUpdateSensor] = useState<Components | null>(null);
    const [deleteSensor, setDeleteSensor] = useState<Components | null>(null);
    const [showMapLayout, setMapLayout] = useState(false);
    const [previewCoord, setPreviewCoord] = useState<{ x: string, y: string }>({ x: '', y: '' });
    const [previewSource, setPreviewSource] = useState<'add' | 'update' | null>(null);
    const { data: createData, setData: setCreateData, post, processing: creating, errors: createErrors, reset: resetCreateForm } = useForm<sensorForm>({
        sensor_name: '',
        token: '',
        sensor_location: '',
        x_axis: '',
        y_axis: ''
    });


    const { data: updateData, setData: setUpdateData, put, processing: updating, reset: resetUpdateForm, errors: updateErrors } = useForm<sensorForm>({
        sensorID: 0,
        sensor_name: '',
        token: '',
        sensor_location: '',
        x_axis: '',
        y_axis: '',
    })

    const onEditSensor = (sensor: Components) => {
        setUpdateData({
            sensorID: sensor.sensorID,
            sensor_name: sensor.sensor_name,
            token: sensor.token,
            sensor_location: sensor.sensor_location,
            x_axis: String(sensor.x_axis),
            y_axis: String(sensor.y_axis),
        });
        setUpdateSensor(sensor); // this will control the modal visibility

    };

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
                    resetCreateForm();
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

    const showMapPreview = (x: string | number, y: string | number) => {
        const xStr = String(x);
        const yStr = String(y);
        const isNumber = (value: string) => /^-?\d*\.?\d+$/.test(value);

        if (xStr === '' || yStr === '') {
            notifyError('Please input data for both the X and Y axis. Thank you!');
        } else if (!isNumber(xStr) || !isNumber(yStr)) {
            notifyError('X and Y must be numeric values only.');
        } else {
            setPreviewCoord({ x: xStr, y: yStr });  // <-- store values
            setMapLayout(true);
        }
    };

    const updateSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!updateSensor) return;

        put(route('update-sensor', updateSensor.sensorID), {
            onSuccess: () => {
                toast.success('Sensor updated successfully!');
            },
            onError: (e) => {
                const errorMessages = Object.values(e).flat();
                toast.error(errorMessages[0] || "Failed to update sensor");
            },
            onFinish: () => {
                resetUpdateForm();
                setUpdateSensor(null);
                fetchSensors();
            }
        })
    }

    const handleDeleteSensor = async () => {
        if (!deleteSensor) return;

        router.delete(route('delete-sensor', deleteSensor.sensorID), {
            onSuccess: () => {
                toast.success("Sensor deleted successfully!");
            },
            onError: (e) => {
                const errorMessages = Object.values(e).flat();
                toast.error(errorMessages[0] || "Failed to delete sensor");
            },
            onFinish: () => {
                setDeleteSensor(null);
                fetchSensors();
            }
        })
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
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 max-w-[200px] truncate mx-auto'>{components.token}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{components.sensor_location}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{components.x_axis}, {components.y_axis}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            <div className="flex items-center justify-center gap-2">
                                                <MdCircle className={components.status == 'Online' ? 'text-green-500' : 'text-red-500'} />
                                                {components.status}
                                            </div>
                                        </td>
                                        <td className='px-6 py-4  whitespace-nowrap text-sm font-medium flex gap-2 justify-center'>
                                            <button className='px-2 py-1 rounded text-white bg-green-400 hover:bg-green-900 dark:bg-green-400' onClick={() => setViewSensor(components)}>View</button>
                                            <button className='px-2 py-1 rounded text-white bg-indigo-400 hover:bg-indigo-900 dark:bg-indigo-400' onClick={() => onEditSensor(components)}>Edit</button>
                                            <button className='px-2 py-1 rounded text-white bg-red-400 hover:bg-red-900 dark:bg-red-400' onClick={() => setDeleteSensor(components)}>Remove</button>
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
                                        value={createData.sensor_name}
                                        onChange={(e) => setCreateData('sensor_name', e.target.value)}
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
                                        value={createData.sensor_location}
                                        onChange={(e) => setCreateData('sensor_location', e.target.value)}
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
                                        value={createData.token}
                                        onChange={(e) => setCreateData('token', e.target.value)}
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
                                        value={createData.y_axis}
                                        onChange={(e) => setCreateData('y_axis', e.target.value)}
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
                                        value={createData.x_axis}
                                        onChange={(e) => setCreateData('x_axis', e.target.value)}
                                        placeholder="Sensor X Axis Location"
                                    />
                                </div>
                            </div>
                            <div className="mt-10 w-full bottom-10 right-10 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
                                <button className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded-md" onClick={() => { setAddModal(false); resetCreateForm(); }}>Cancel</button>
                                <div className="cursor-pointer bg-red-500 text-white py-2 px-4 rounded-md" onClick={() => showMapPreview(createData.x_axis, createData.y_axis)}>Map Preview</div>
                                <button type='submit' className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md">Save</button>
                            </div>
                        </div>
                    </form>
                </>
            } />

            <MapPreview
                topcoordination={previewCoord.y + '%'}
                leftcoordination={previewCoord.x + '%'}
                isVisible={showMapLayout}
                onclose={() => setMapLayout(false)}
            />

            <Modal header='View Sensor' subtitle='sample subtitle' isVisible={viewSensor !== null} onClose={() => setViewSensor(null)} children={
                <>
                    {
                        viewSensor && (
                            <div className='w-85 gap-3 inline-flex text-sm'>
                                <div className='w-60 flex flex-col text-end font-semibold gap-1'>
                                    <span>Sensor Name : </span>
                                    <span>Sensor Location : </span>
                                    <span>Sensor Status : </span>
                                    <span>Sensor Token : </span>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <span className='truncate w-50'>{viewSensor.sensor_name}</span>
                                    <span className='truncate w-50'>{viewSensor.sensor_location}</span>
                                    <span className='truncate w-50'>{viewSensor.status}</span>
                                    <span className='truncate w-50'>{viewSensor.token}</span>
                                </div>
                            </div>

                        )
                    }
                </>
            } />

            <Modal header='Update Sensor' subtitle='sample' isVisible={updateSensor !== null} onClose={() => setUpdateSensor(null)} children={
                <>
                    {updateSensor && updateData && (
                        <form onSubmit={updateSubmit}>
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
                                            value={updateData.sensor_name}
                                            onChange={(e) => setUpdateData('sensor_name', e.target.value)}
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
                                            value={updateData.sensor_location}
                                            onChange={(e) => setUpdateData('sensor_location', e.target.value)}
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
                                            value={updateData.token}
                                            onChange={(e) => setUpdateData('token', e.target.value)}
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
                                            value={updateData.y_axis}
                                            onChange={(e) => setUpdateData('y_axis', e.target.value)}
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
                                            value={updateData.x_axis}
                                            onChange={(e) => setUpdateData('x_axis', e.target.value)}
                                            placeholder="Sensor X Axis Location"
                                        />
                                    </div>
                                </div>
                                <div className="mt-10 w-full bottom-10 right-10 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
                                    <button className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded-md" onClick={() => { setUpdateSensor(null); resetUpdateForm(); }}>Cancel</button>
                                    <div className="cursor-pointer bg-red-500 text-white py-2 px-4 rounded-md" onClick={() => { showMapPreview(updateData.x_axis, updateData.y_axis); }}>Map Preview</div>
                                    <button type='submit' className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md">Update</button>
                                </div>
                            </div>
                        </form>
                    )}

                </>
            }>
            </Modal>

            <DeleteModal isVisible={deleteSensor !== null} onClose={() => setDeleteSensor(null)} onConfirm={handleDeleteSensor} />

        </>
    )
}

export default Components