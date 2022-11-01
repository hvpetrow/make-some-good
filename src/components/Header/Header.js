import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

export const Header = () => {
    const [dropdownClick, setDropdownClick] = useState(false);
    const { currentUser, photoURL } = useAuth();

    if (currentUser) {
        console.log("Log from header " + currentUser.email);
    }

    const dropdownHandler = () => {
        setDropdownClick(!dropdownClick);
    }

    const dropdownMenu = <div
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex={-1}
        onBlur={dropdownHandler}

    >
        {/* Active: "bg-gray-100", Not Active: "" */}
        <Link
            to="/my-profile"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-0"
        >
            Your Profile
        </Link>
        <Link
            to="/logout"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-2"
        >
            Sign out
        </Link>
    </div>;

    return (
        <header>
            <div className="left-side">
                <ul>
                    <li>
                        <Link
                            to="/"
                            className=""
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/catalog"
                            className=""
                        >
                            Causes
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/superHeroes"
                            className=""
                        >
                            Superheroes
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/search"
                            className=""
                        >
                            Search
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/donate"
                            className=""
                        >
                            Donate
                        </Link>
                    </li>
                </ul>
            </div>
            {/*RIGHT SIDE className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0  */}
            <div className="right-side">
                {!currentUser
                    ? <ul className='unlogged-ul'>
                        <li>
                            <Link
                                to="/login"
                                className=""
                                aria-current="page"
                            >
                                Log In
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register"
                                className=""
                                aria-current="page"
                            >
                                Sign Up
                            </Link>
                        </li>
                    </ul>

                    : <ul className='unlogged-ul'>
                        <li>
                            <Link
                                to="/create-cause"
                                className=""
                            >
                                Create Cause
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/joinedCauses"
                                className=""
                            >
                                Joined Causes
                            </Link>

                        </li>
                        <li>
                            <Link
                                to="/my-causes"
                                className=""
                            >
                                My Causes
                            </Link>
                        </li>
                        <div className="relative ml-3">
                            <div>
                                <button
                                    type="button"
                                    className="flex rounded-full bg-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                    onClick={dropdownHandler}
                                    onBlur={dropdownHandler}
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={photoURL}
                                        alt="profile"
                                    />
                                </button>
                            </div>
                            {dropdownClick && dropdownMenu}
                        </div>
                    </ul>
                }
            </div>
        </header>
    );
}