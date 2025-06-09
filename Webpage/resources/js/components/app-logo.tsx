import AppLogoIcon from './app-logo-icon';
import logo from '../assets/flame-svgrepo-com.svg'

export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <img src={logo} alt="" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Fire Protection</span>
            </div>
        </>
    );
}
