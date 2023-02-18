import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useState } from 'react';
import { useClickOutside } from '../../../utils/utils';

export const Header = () => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
    const { currentUser, defaultPhotoURL } = useAuth();
    //TO DO: HOOK TO CHANGE FOR HEADER PHOTO

    // useEffect(() => {
    //     console.log("rerendering header due to the setPhotoChanging in useEffect");
    //     setPhotoChanged(state => !state);
    // }, [currentUser.photoURL])

    console.log(currentUser?.email);

    let profileMenuRef = useClickOutside(() => {
        setIsProfileMenuOpen(false);
    });

    let mainMenuRef = useClickOutside(() => {
        setIsMainMenuOpen(false);
    });

    const dropdownHandler = (e) => {
        if (e.currentTarget.id === 'mobileMenuBtn') {
            setIsMainMenuOpen(isMainMenuOpen => !isMainMenuOpen);
        } else if (e.currentTarget.id === 'profileMenuBtn') {
            setIsProfileMenuOpen(isProfileMenuOpen => !isProfileMenuOpen);
        }
    }

    const closeDropdownHandler = (e) => {
        setIsMainMenuOpen(false);
        setIsProfileMenuOpen(false);
    }

    const profileDropdownMenu = <div className={styles['dropdown']}>
        <Link to="/my-profile" onClick={(closeDropdownHandler)} >My Profile</Link>
        <Link to="/my-causes" onClick={(closeDropdownHandler)}>My Causes</Link>
        <Link to="/joinedCauses" onClick={(closeDropdownHandler)}>Joined Causes</Link>
        <Link to="/logout" onClick={(closeDropdownHandler)}>Sign out</Link>
    </div>;

    const mainDropdownMenu = <div className={styles['main-dropdown']}>
        {currentUser &&
            <Link to="/create-cause" onClick={(closeDropdownHandler)}>Create Cause</Link>
        }
        <Link to="/" onClick={(closeDropdownHandler)} >Home</Link>
        <Link to="/catalog" onClick={(closeDropdownHandler)}>Catalog</Link>
        <Link to="/search" onClick={(closeDropdownHandler)}>Search</Link>
        <Link to="/donate" onClick={(closeDropdownHandler)}>Donate</Link>
    </div>;

    const mobileMenu = <div ref={mainMenuRef} className={styles['mobile-menu']}>
        {/* Mobile menu button*/}
        <button
            type="button"
            id='mobileMenuBtn'
            className={styles['mobile-menu-btn']}
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={(dropdownHandler)}
        >
            <svg
                className={!isMainMenuOpen ? styles['dropdownMenu-svg'] : styles['hidden']}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
            </svg>
            {/*
        Icon when menu is open.
        Menu open: "block", Menu closed: "hidden"
      */}
            <svg
                className={isMainMenuOpen ? styles['dropdownMenu-svg'] : styles['hidden']}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
        {isMainMenuOpen && mainDropdownMenu}
    </div>

    return (
        <header>
            <nav>
                <div className="left-side">
                    <ul>
                        <li className={styles['nav-link']}><Link to="/">Home</Link></li>
                        <li className={styles['nav-link']}><Link to="/catalog">Causes</Link></li>
                        <li className={styles['nav-link']}><Link to="/search">Search</Link></li>
                        <li className={styles['nav-link']}><Link to="/donate">Donate</Link></li>
                        {mobileMenu}
                    </ul>
                </div>
                <div className={styles['right-side']}>
                    {!currentUser
                        ? <ul className={styles['unlogged-ul']}>
                            <li className={`${styles['nav-link']} ${styles['visible-link']}`}><Link to="/login" className={styles['mobile-nav-link']} aria-current="page">Log In</Link></li>
                            <li className={`${styles['nav-link']} ${styles['visible-link']}`}><Link to="/register" className={styles['mobile-nav-link']} aria-current="page">Sign Up</Link></li>
                        </ul>
                        : <div className="logged-in">
                            <ul className={styles['logged-ul']}>
                                <li className={styles['nav-link']}><Link to="/create-cause">Create Cause</Link></li>
                                <div ref={profileMenuRef} >
                                    <li className={styles['profile']}>
                                        <button
                                            type="button"
                                            className={styles['profile-btn']}
                                            id="profileMenuBtn"
                                            aria-expanded="false"
                                            aria-haspopup="true"
                                            onClick={(dropdownHandler)}
                                        >
                                            <img
                                                className={styles['profile-img']}
                                                src={defaultPhotoURL}
                                                alt="profilPicture"
                                            />
                                        </button>
                                    </li>
                                    {isProfileMenuOpen && profileDropdownMenu}
                                </div>
                            </ul>
                        </div>
                    }
                </div>
            </nav>
        </header >
    );
}