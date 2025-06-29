import { useEffect, useState, type ReactNode } from 'react';
import MapAlert from '@/components/custom/map-alert';
import Modal from '@/components/custom/universal-modal';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Slide, ToastContainer } from 'react-toastify';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

type Coordinate = {
    sensor: string;
    top: number;
    left: number;
    level: string;
};

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const [alertModal, setAlertModal] = useState(false);
    const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

    useEffect(() => {
        if (typeof window.Echo !== 'undefined') {
            const channel = window.Echo.channel('public-alert');

            channel.listen('AssignToClassEvent', (e: { coordinates: Coordinate[] }) => {
                console.log('🔥 Event received:', e.coordinates);
                setCoordinates(e.coordinates);
                setAlertModal(true);
            });

            return () => {
                window.Echo.leave('public-alert');
            };
        } else {
            console.error('❌ Echo is not defined');
        }
    }, []);


    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
                transition={Slide}
            />

            <MapAlert
                coordinates={coordinates}
                isVisible={alertModal}
                onclose={() => setAlertModal(false)}
            />
        </AppLayoutTemplate>
    );
}
