import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import { useClickOutside } from '../../utils/utils';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser, photoURL } = useAuth();

    let menuRef = useClickOutside(() => {
        setIsOpen(false);
    });

    // useEffect(() => {
    //     let handler = (event) => {
    //         if (!menuRef.current.contains(event.target)) {
    //             setIsOpen(false);
    //         }
    //     }

    //     document.addEventListener("mousedown", handler);

    //     return () => {
    //         document.removeEventListener("mousedown", handler);
    //     };
    // }, []);

    const dropdownHandler = () => {
        setIsOpen(isOpen => !isOpen);
    }

    const closeDropdownHandler = () => {
        setIsOpen(false);
    }

    const dropdownMenu = <div className={styles['dropdown']}>
        <Link to="/my-profile" onClick={closeDropdownHandler} >My Profile</Link>
        <Link to="/my-causes" onClick={closeDropdownHandler}>My Causes</Link>
        <Link to="/logout" onClick={closeDropdownHandler}>Sign out</Link>
    </div>;

    return (
        <header>
            <nav>
                <div className="left-side">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/catalog">Causes</Link></li>
                        <li><Link to="/search">Search</Link></li>
                        <li><Link to="/donate">Donate</Link></li>
                    </ul>
                </div>
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
                                <div ref={menuRef} >
                                    <li className={styles['profile']}>
                                        <button
                                            type="button"
                                            className={styles['profile-btn']}
                                            id="user-menu-button"
                                            aria-expanded="false"
                                            aria-haspopup="true"
                                            onClick={(dropdownHandler)}
                                        >
                                            <img
                                                className={styles['profile-img']}
                                                src={photoURL}
                                                alt="profilPicture"
                                            />
                                        </button>
                                    </li>
                                    {isOpen && dropdownMenu}
                                </div>
                            </ul>
                        </div>
                    }
                </div>
            </nav>
        </header>
    );
}