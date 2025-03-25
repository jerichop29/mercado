import React ,{ useEffect , useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import  { MenuData }  from '../../utils/MenuData.jsx'
import Logo from '/assets/img/logo.png';
const Sidebar = () => {
    const [menuItems, setMenuItems] = useState({ Data: [] });
    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const data = await MenuData();
                setMenuItems(data);
            } catch (error) {
                console.error("Error fetching menu data:", error);
            } 
        };

        fetchMenuData();
    }, []);
    return (
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
            <div className="app-brand demo">
                <Link aria-label="Navigate to user homepage" to="/user/dashboard" className="app-brand-link">
                    <span className="app-brand-logo demo">
                        <img src={Logo} alt="logo" aria-label="logo image" />
                    </span>
                </Link>

                <a href="#" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                    <i className="bx bx-chevron-left bx-sm align-middle"></i>
                </a>
            </div>

            <div className="menu-inner-shadow"></div>

            <ul className="menu-inner py-1">
                {menuItems.Data.map((section) => (
                    <React.Fragment key={section.header}>
                        {section.header && (
                            <li className="menu-header small text-uppercase">
                                <span className="menu-header-text">{section.header}</span>
                            </li>
                        )}
                        {section.items.map((item, index) => (
                            <MenuItem key={item.id || index} item={item} />
                        ))}
                    </React.Fragment>
                ))}
            </ul>
        </aside>
    );
};

const MenuItem = ({ item }) => {
    const location = useLocation();
    const isActive = location.pathname === item.link;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isSubmenuActive = hasSubmenu && item.submenu.some(subitem => location.pathname === subitem.link);

    return (
        <li className={`menu-item ${isActive || isSubmenuActive ? 'active' : ''} ${hasSubmenu && isSubmenuActive ? 'open' : ''}`}>
            <NavLink
                aria-label={`Navigate to ${item.text} ${!item.available ? 'Pro' : ''}`}
                to={item.link}
                className={`menu-link ${item.submenu ? 'menu-toggle' : ''}`}
                target={item.link.includes('http') ? '_blank' : undefined}
            >
                <i className={`menu-icon tf-icons ${item.icon}`}></i>
                <div>{item.text}</div> {item.available === false && (
                    <div className="badge bg-label-primary fs-tiny rounded-pill ms-auto">Pro</div>
                )}
            </NavLink>
            {hasSubmenu && (
                <ul className="menu-sub">
                    {item.submenu.map((subitem, subIndex) => (
                        <MenuItem key={subitem.id || subIndex} item={subitem} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Sidebar;
