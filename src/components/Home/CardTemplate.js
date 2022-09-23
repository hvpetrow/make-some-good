import { Link } from "react-router-dom";

export const CardTemplate = ({id,cause}) => {
    return (
        <div className="rounded-lg shadow-lg bg-white max-w-sm transition duration-500 hover:scale-105 hover:bg-gray-300">
            <Link to={`/details/${id}`}>
                <img
                    className="rounded-t-lg"
                    src={cause.imgUrl}
                    alt="causeImg"
                />
            </Link>
            <div className="p-6">
                <h5 className="text-gray-900 text-xl font-medium mb-2">{cause.title}</h5>
                <p className="text-gray-700 text-base mb-4">
                    {cause.place}
                </p>
                <Link
                    to={`/details/${id}`}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    Details
                </Link>
            </div>
        </div>
    );
}