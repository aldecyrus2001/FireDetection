import MapAlert from '@/components/custom/map-alert';
import Modal from '@/components/custom/universal-modal';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { useState, type ReactNode } from 'react';
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

const sampleObject: Coordinate[] = [
    { sensor: 'Front Gate', top: 10.65, left: 20, level: 'Low' },
    { sensor: 'Admin Office', top: 25, left: 40, level: 'High' },
    { sensor: 'Cafeteria', top: 50, left: 60, level: 'Moderate' },
    { sensor: 'Library', top: 70, left: 30, level: 'Moderate' },
    { sensor: 'Back Gate', top: 85, left: 80, level: 'High' },
];

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const [alertModal, setAlertModal] = useState(true);
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
                coordinates={sampleObject}
                isVisible={alertModal}
                onclose={() => setAlertModal(false)}
            />
        </AppLayoutTemplate>
    );
}
