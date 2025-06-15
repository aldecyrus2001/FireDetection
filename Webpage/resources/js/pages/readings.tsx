import Modal from '@/components/custom/universal-modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { MdOutlineSensors } from 'react-icons/md';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Readings',
        href: '/readings'
    }
];

type sensorData = {
    id: number,
    sensor_name: string,
    sensor_location: string,
    lpg_value: number,
    co_value: number,
    smoke_value: number,
    fire_value: number,
    date: string,
}

type sensorForm = {
    co_value: number,
    lpg_value: number,
    smoke_value: number,
    fire_value: number,
}

const Readings = () => {

    const [sensor, setSensor] = useState<sensorData[]>([]);
    const [calibrateModal, setCalibrateModal] = useState(false);
    const { data, setData, put, processing, errors, reset } = useForm<Required<sensorForm>>({
        co_value: 0,
        lpg_value: 0,
        smoke_value: 0,
        fire_value: 0
    });

    useEffect(() => {
        fetchReadings();
    }, []);

    useEffect(() => {
        fetchThresholds();
    }, [])

    const fetchReadings = async () => {
        try {
            const response = await fetch(route('fetch-readings'));
            const data = await response.json();
            setSensor(data);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            toast.error(errorMessage);
        }
    }

    const fetchThresholds = async () => {
        try {
            const response = await fetch(route('fetch-threshold'));
            const data = await response.json();
            if (data) {
                setData({
                    co_value: data.co_value,
                    lpg_value: data.lpg_value,
                    smoke_value: data.smoke_value,
                    fire_value: data.fire_value
                });
            }
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            toast.error(errorMessage);
        }
    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('update-threshold'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Threshold updated successfully.");
                setCalibrateModal(false);
                reset();
            },
            onError: (errors) => {
                const errorMessages = Object.values(errors).flat();
                toast.error(errorMessages[0] || 'Failed to update threshold.');
            }
        });
    }

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title='Readings' />
                <div className='h-full w-full p-6'>
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-2xl font-semibold'>Readings</h1>
                            <p className='text-sm'> Sample Description of this page</p>
                        </div>
                        <div>
                            <button onClick={() => setCalibrateModal(true)} className='py-2 px-4 cursor-pointer rounded-md bg-yellow-400 font-semibold flex gap-2 items-center'><MdOutlineSensors /> Calibrate Sensor Threshold</button>
                        </div>
                    </div>
                    <hr className='mt-2 mb-5 border-slate-600' />
                    <div className='overflow-x-auto rounded-xl shadow-sm'>
                        <table className='min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-900'>
                            <thead className='bg-gray-50 dark:bg-gray-800'>
                                <tr>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>#</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Sensor Name</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Location</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>LPG</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>CO</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Smoke</th>
                                    <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Fire</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-100 dark:divide-gray-700'>
                                {sensor.map((components) => (
                                    <tr key={components.id} className='hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>{components.id}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>{components.sensor_name}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{components.sensor_location}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{components.lpg_value}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{components.co_value}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{components.smoke_value}</td>
                                        <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{components.fire_value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AppLayout>
            <Modal header='Calibrate Sensor Activation' subtitle='sample subtitle' isVisible={calibrateModal} onClose={() => setCalibrateModal(false)} children={
                <>
                    <form onSubmit={submit}>
                        <div className='overflow-x-auto p-4 w-200'>
                            <div className="flex flex-col gap-4">
                                <div className="">
                                    <div className='flex flex-col py-1'>
                                        <Label htmlFor="co_value" className='text-black my-auto'>Carbon Monoxide Value Calibration</Label>
                                        <p className='text-xs'>Note: Enter the Carbon Monoxide (CO) concentration (in ppm) at which the alarm should be triggered. Recommended threshold for safety is 50 ppm for prolonged exposure and 100 ppm for immediate danger. Set a value based on your environment and safety requirements.</p>
                                    </div>
                                    <Input
                                        className='text-black'
                                        id="co_value"
                                        type="number"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        value={data.co_value}
                                        onChange={(e) => setData('co_value', Number(e.target.value))}
                                        placeholder="Carbon Monoxide"
                                    />
                                </div>
                                <div className="">
                                    <div className='flex flex-col py-1'>
                                        <Label htmlFor="lpg_value" className='text-black my-auto'>Liquefied Petroleum Gas (LPG) Value Calibration</Label>
                                        <p className='text-xs'>Note: Enter the LPG gas concentration (in ppm) at which the alarm should activate. LPG is highly flammable — a typical safety threshold is around 200–300 ppm, but this can vary depending on ventilation and environment. Set a value appropriate for your location's risk level.</p>
                                    </div>
                                    <Input
                                        className='text-black'
                                        id="lpg_value"
                                        type="number"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        value={data.lpg_value}
                                        onChange={(e) => setData('lpg_value', Number(e.target.value))}
                                        placeholder="LPG"
                                    />
                                </div>
                                <div className="">
                                    <div className='flex flex-col py-1'>
                                        <Label htmlFor="smoke_value" className='text-black my-auto'>Smoke Value Calibration</Label>
                                        <p className='text-xs'>Note: Enter the smoke level (in ppm or relative sensor value) that should trigger the alarm. Smoke detection is typically used to identify potential fires early. Recommended values depend on the sensor sensitivity, but values above 300–400 usually indicate a hazardous condition.</p>
                                    </div>
                                    <Input
                                        className='text-black'
                                        id="smoke_value"
                                        type="number"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        value={data.smoke_value}
                                        onChange={(e) => setData('smoke_value', Number(e.target.value))}
                                        placeholder="Smoke"
                                    />
                                </div>
                                <div className="">
                                    <div className='flex flex-col py-1'>
                                        <Label htmlFor="fire_value" className='text-black my-auto'>Fire Analog Value Calibration</Label>
                                        <p className='text-xs'>Note: Enter the analog value that will trigger the fire alarm. The fire sensor detects infrared light (flames), and lower values typically indicate stronger fire presence. A common threshold is below 300–400, but this depends on sensor placement and environment. Adjust based on your testing.</p>
                                    </div>
                                    <Input
                                        className='text-black'
                                        id="fire_value"
                                        type="number"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        value={data.fire_value}
                                        onChange={(e) => setData('fire_value', Number(e.target.value))}
                                        placeholder="Fire Analog Value"
                                    />
                                </div>
                            </div>
                            <div className="mt-10 w-full bottom-10 right-10 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
                                <button className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded-md" onClick={() => { setCalibrateModal(false); reset(); }}>Cancel</button>
                                <button type='submit' className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md">Save</button>
                            </div>
                        </div>
                    </form>
                </>
            }></Modal>
        </>
    )
}

export default Readings