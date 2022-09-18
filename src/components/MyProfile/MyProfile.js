import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export const MyProfile = () => {
    const {currentUser} = useAuth();

    return (
        <div className="p-16">
            <div className="p-8 bg-white shadow mt-24">
                {" "}
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {" "}
                    <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                        {" "}
                        <div>
                            {" "}
                            <p className="font-bold text-gray-700 text-xl">22</p>{" "}
                            <p className="text-gray-400">Causes</p>{" "}
                        </div>{" "}
                        <div>
                            {" "}
                            <p className="font-bold text-gray-700 text-xl">10</p>{" "}
                            <p className="text-gray-400">My Causes</p>{" "}
                        </div>{" "}
                        <div>
                            {" "}
                            <p className="font-bold text-gray-700 text-xl">89</p>{" "}
                            <p className="text-gray-400">Rating</p>{" "}
                        </div>{" "}
                    </div>{" "}
                    <div className="relative">
                        {" "}
                        <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-24 w-24"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                {" "}
                                <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                />
                            </svg>{" "}
                        </div>{" "}
                    </div>{" "}
                    <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                        <Link to="/" className="text-white py-4 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-sm transition transform hover:-translate-y-0.5">
                            {" "}
                            Change Profile Picture
                        </Link>{" "}
                        <Link to="/change-password" className="text-white py-4 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-sm transition transform hover:-translate-y-0.5">
                            {" "}
                            Change Password
                        </Link>{" "}
                    </div>
                </div>{" "}
                <div className="mt-20 text-center border-b pb-12">
                    {" "}
                    <h1 className="text-4xl font-medium text-gray-700">
                        Jessica Jones
                    </h1>{" "}
                    <p className="font-light text-gray-600 mt-3">Bucharest, Romania</p>{" "}
                    <p className="mt-8 text-gray-500">
                        Solution Manager - Creative Tim Officer
                    </p>{" "}
                    <p className="mt-2 text-gray-500">University of Computer Science</p>
                </div>{" "}
                <div className="mt-12 flex flex-col justify-center">
                    <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
                        {" "}
                        Show more
                    </button>
                </div>
            </div>
        </div>
    )
}
