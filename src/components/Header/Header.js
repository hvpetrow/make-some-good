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

    const onBlurDropdownHandler = (e) => {

        console.log(e.currentTarget);

        setDropdownClick(true);
    }

    const closeDropdownHandler = () => {
        setDropdownClick(false);
    }

    const dropdownMenu = <div
        className={styles['dropdown']}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex={-1}
        onBlur={onBlurDropdownHandler}

        id="dropDownMenu"
    >
        <Link
            to="/my-profile"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-0"
            onClick={closeDropdownHandler}
        >
            My Profile
        </Link>
        <Link
            to="/logout"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-2"
            onClick={closeDropdownHandler}
        >
            Sign out
        </Link>
    </div>;

    return (
        <header>
            <nav>
                {/*LEFT SIDE */}
                <div className="left-side">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/catalog">Causes</Link></li>
                        <li><Link to="/superHeroes">Superheroes</Link></li>
                        <li><Link to="/search">Search</Link></li>
                        <li><Link to="/donate">Donate</Link></li>
                    </ul>
                </div>
                {/*RIGHT SIDE */}
                <div className="right-side">
                    {!currentUser
                        ? <ul className='unlogged-ul'>
                            <li><Link to="/login" aria-current="page">Log In</Link></li>
                            <li><Link to="/register" aria-current="page">Sign Up</Link></li>
                        </ul>
                        : <div className="logged-in">
                            <ul className={styles['logged-ul']}>
                                <li><Link to="/create-cause">Create Cause</Link></li>
                                <li><Link to="/joinedCauses">Joined Causes</Link></li>
                                <li><Link to="/my-causes">My Causes</Link></li>
                                <div>
                                    <li className={styles['profile']}>
                                        <button
                                            type="button"
                                            className={styles['profile-btn']}
                                            id="user-menu-button"
                                            aria-expanded="false"
                                            aria-haspopup="true"
                                            onClick={dropdownHandler}
                                        >
                                            <img
                                                className={styles['profile-img']}
                                                src={photoURL}
                                                alt="profilePicture"
                                            />
                                        </button>
                                    </li>
                                    {dropdownClick && dropdownMenu}
                                </div>
                            </ul>
                        </div>
                    }
                </div>
            </nav>
        </header>
    );
}