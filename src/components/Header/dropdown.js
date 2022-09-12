import { Link } from 'react-router-dom';


<div
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex={-1}
            >
              {/* Active: "bg-gray-100", Not Active: "" */}
              <Link
                to="#"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-0"
              >
                Your Profile
              </Link>
              <Link
                to="#"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-1"
              >
                Settings
              </Link>
              <Link
                to="#"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-2"
              >
                Sign out
              </Link>
            </div>