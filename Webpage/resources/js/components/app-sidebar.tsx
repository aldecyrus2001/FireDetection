import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Contact, Folder, LayoutGrid, Logs, MessageCircleMoreIcon, PanelTopClose, ParkingMeter, User } from 'lucide-react';
import AppLogo from './app-logo';
import { MdElectricMeter } from 'react-icons/md';


const mainNavItems: (NavItem & { hiddenForRoles?: string[] })[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: '/users',
        icon: User,
        hiddenForRoles: ['user'],
    },
    {
        title: 'Components',
        href: '/components',
        icon: PanelTopClose,
    },
    {
        title: 'Readings',
        href: '/readings',
        icon: ParkingMeter,
    },
    {
        title: 'Fire Logs',
        href: '/logs',
        icon: Logs,
    },
    {
        title: 'Contacts List',
        href: '/contact-list',
        icon: Contact,
    },
    {
        title: 'Message',
        href: '/message',
        icon: MessageCircleMoreIcon,
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props; // ✅ Now inside the function component

    const filteredNavItems = mainNavItems.filter(
        item => !item.hiddenForRoles || !item.hiddenForRoles.includes(auth.user.role)
    );

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

