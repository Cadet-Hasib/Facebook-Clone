import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./Header.css";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";
import { ReactComponent as AddIcon } from "./icons/plusicon.svg";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { ReactComponent as HomeIcon } from "./icons/home.svg";
import { ReactComponent as PeopleOutlineIcon } from "./icons/friends.svg";
import { ReactComponent as SupervisedUserCircleRoundedIcon } from "./icons/groups.svg";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SignOut from "../SignOut/SignOut";
import { useAuthState } from "react-firebase-hooks/auth";
import "../../firebase";
import { auth } from "../../firebase";

//* Rendered App
function Header() {
    const [user] = useAuthState(auth);

    const user_photo = user.photoURL;

    return (
        <div className="Header">
            <div className="header__left">
                <div className="header__logo">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                        alt="Logo"
                    />
                </div>

                <div className="header__input">
                    <SearchIcon />
                    <input type="text" placeholder="Search" />
                </div>
            </div>

            <div className="header__middle">
                <div className="header__component active">
                    <HomeIcon />
                    <span></span>
                </div>

                <div className="header__component">
                    <PeopleOutlineIcon />
                </div>

                <div className="header__component">
                    <SupervisedUserCircleRoundedIcon />
                </div>
            </div>

            <div className="header__right">
                <Navbar>
                    <NavItem icon={<AddIcon />} className="addicon" />
                    <NavItem icon={<NotificationsActiveIcon />} />
                    <NavItem icon={<MessengerIcon />} />

                    <NavItem
                        icon={
                            <Avatar src={user_photo} className="nav_avatar" />
                        }
                    >
                        <DropdownMenu></DropdownMenu>
                    </NavItem>
                </Navbar>
            </div>
        </div>
    );
}

//* All the header right styling and components

function Navbar(props) {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">{props.children}</ul>
        </nav>
    );
}

function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
        <li className="nav-item">
            {/* eslint-disable-next-line */}
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}
        </li>
    );
}

function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
    }, []);

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props) {
        return (
            // eslint-disable-next-line
            <a
                href="#"
                className="menu-item"
                onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
            >
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        );
    }

    const [user] = useAuthState(auth);

    const user_name = user.displayName;
    const user_photo = user.photoURL;

    return (
        <div
            className="dropdown"
            style={{ height: menuHeight }}
            ref={dropdownRef}
        >
            <CSSTransition
                in={activeMenu === "main"}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem
                        leftIcon={
                            <Avatar src={user_photo} className="avatar" />
                        }
                    >
                        <header>{user_name}</header>
                    </DropdownItem>
                    <DropdownItem
                        leftIcon={<CogIcon />}
                        rightIcon={<ChevronIcon />}
                        goToMenu="settings"
                    >
                        Settings
                    </DropdownItem>

                    <DropdownItem leftIcon={<ExitToAppIcon />}>
                        <SignOut />
                    </DropdownItem>

                    <DropdownItem
                        leftIcon="🦧"
                        rightIcon={<ChevronIcon />}
                        goToMenu="animals"
                    >
                        Animals
                    </DropdownItem>

                    <p>Facebook 2021 License @Copyright</p>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === "settings"}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h2>My Tutorial</h2>
                    </DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon />}>
                        JavaScript
                    </DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon />}>
                        Awesome!
                    </DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === "animals"}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h2>Animals</h2>
                    </DropdownItem>
                    <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
                    <DropdownItem leftIcon="🐸">Frog</DropdownItem>
                    <DropdownItem leftIcon="🐱">Cat</DropdownItem>
                    <DropdownItem leftIcon="🐶">Dog</DropdownItem>
                </div>
            </CSSTransition>
        </div>
    );
}

export default Header;
