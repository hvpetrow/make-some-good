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

        setTimeout(() => {
            setDropdownClick(false);
        }, 5000)
    }

    const onBlurDropdownHandler = (e) => {

        console.log(e.currentTarget);

        setDropdownClick(false);
    }

    const closeDropdownHandler = () => {
        setDropdownClick(false);
    }

    const dropdownMenu = <div className={styles['dropdown']} onClick={() => setDropdownClick(true)} tabIndex="0">
        <Link to="/my-profile" onClick={closeDropdownHandler}>My Profile</Link>
        <Link to="/my-causes" onClick={closeDropdownHandler}>My Causes</Link>
        <Link to="/logout" onClick={closeDropdownHandler}>Sign out</Link>
    </div>;

    return (
        <header>
            <nav>
                {/*LEFT SIDE */}
                <div className="left-side">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/catalog">Causes</Link></li>
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
                                <div onBlur={onBlurDropdownHandler} tabIndex="0" >
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