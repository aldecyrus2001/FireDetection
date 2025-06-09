import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react'
import React from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Fire Logs',
        href: '/logs'
    }
];

const sampleLogs = [
    {
        id: 1,
        sensorName: 'Sensor 1',
        location: 'Location 1',
        level: 10.3,
        dateTimeActivated: '2021-01-01 12:00:00'
    },
    {
        id: 2,
        sensorName: 'Sensor 2',
        location: 'Location 2',
        level: 9.21,
        dateTimeActivated: '2021-01-01 12:00:00'
    },
    {
        id: 3,
        sensorName: 'Sensor 3',
        location: 'Location 3',
        level: 15.7,
        dateTimeActivated: '2021-01-01 12:00:00'
    },
    {
        id: 4,
        sensorName: 'Sensor 4',
        location: 'Location 4',
        level: 20.4,
        dateTimeActivated: '2021-01-01 12:00:00'
    }
]

const logs = () => {
  return (
    <>
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title='Fire Logs' />
        <div className='h-full w-full p-6'>
            <div className='flex justify-between'>
                <div>
                    <h1 className='text-2xl font-semibold'>Fire Logs</h1>
                    <p className='text-sm'>Sample Description of this page</p>
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
                            <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Level</th>
                            <th className='px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Date & Time Activated</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100 dark:divide-gray-700'>
                        {sampleLogs.map((logs) => {
                            let fireLevel = '';
                            if (logs.level >= 15) {
                                fireLevel = 'Severe';
                            } else if (logs.level >= 10) {
                                fireLevel = 'Moderate';
                            } else if (logs.level >= 5) {
                                fireLevel = 'Minor';
                            }
                            return (
                                <tr key={logs.id} className='hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
                                    <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>{logs.id}</td>
                                    <td className='px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>{logs.sensorName}</td>
                                    <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{logs.location}</td>
                                    <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{fireLevel}</td>
                                    <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{logs.dateTimeActivated}</td>
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
            </div>
        </div>
    </AppLayout>

    </>
  )
}

export default logs