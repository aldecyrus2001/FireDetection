import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Graphcard from '@/components/custom/graph-card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardCard from '@/components/custom/dashboard-card';
import sensor from '../assets/motion-sensor.png'
import user from '../assets/working.png'
import offline from '../assets/offline.png'
import map from '../assets/sample-map.jpg'
import MapPreview from '@/components/custom/map-preview';
import MapAlert from '@/components/custom/map-alert';
import { toast } from 'react-toastify';
import message from './message';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type Sensor = {
    sensorID: string;
    sensor_name: string;
    isAlert: number;
    readings: any;
}

type Coordinate = {
    sensor: string;
    top: number;
    left: number;
};

const sampleObject: Coordinate[] = [
    { sensor: 'Front Gate', top: 10.65, left: 20 },
    { sensor: 'Admin Office', top: 25, left: 40 },
    { sensor: 'Cafeteria', top: 50, left: 60 },
    { sensor: 'Library', top: 70, left: 30 },
    { sensor: 'Back Gate', top: 85, left: 80 },
];

export default function Dashboard() {
    const [counts, setCounts] = useState({
        users: 0,
        sensors: 0,
        offlineSensors: 0,
        fireIncidents: 0,
    });
    const [sensorData, setSensorData] = useState<Sensor[]>([]);
    const [alertModal, setAlertModal] = useState(false);

    useEffect(() => {
        fetchSensorData();
        
    }, [])

    useEffect(() => {
        fetchDashboardWidgets();
    }, []);


    const fetchSensorData = async () => {
        try {
            const response = await axios.post<Sensor[]>(route('fetch.sensor.data'));


            const limitedData = response.data.map(sensor => ({
                ...sensor,
                readings: Array.isArray(sensor.readings) ? sensor.readings.slice(-10) : []
            }));

            limitedData.forEach(sensor => {
                if (sensor.isAlert === 1) {
                    // IF SENSOR WAS ALERT OR ACTIVE
                }
            });

            setSensorData(limitedData);
        } catch (e) {
            console.error("Failed to fetch sensor data: ", e);
        }
    };

    const fetchDashboardWidgets = async () => {
        try {
            const response = await fetch(route('fetch-dashboards-widgets'));
            const data = await response.json();
            setCounts(data);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message: String(error);
            toast.error(message);
        }
    };

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="grid auto-rows-min gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <DashboardCard name='Users' value={counts.users} image={user} />
                        <DashboardCard name='Sensors' value={counts.sensors} image={sensor} />
                        <DashboardCard name='Offline Sensors' value={counts.offlineSensors} image={offline} />
                        

                    </div>
                    <div className="grid auto-rows-min gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {sensorData.map((sensor) => (
                            <Graphcard key={sensor.sensorID} name={sensor.sensor_name} data={sensor.readings} />
                        ))}

                    </div>
                </div>
            </AppLayout>
            <MapPreview topcoordination='50%' leftcoordination='60%' isVisible={alertModal} onclose={() => setAlertModal(false)}>

            </MapPreview>
            {/* <MapAlert coordinates={sampleObject} isVisible={alertModal} onclose={() => setAlertModal(false)}/> */}
        </>
    );
}
