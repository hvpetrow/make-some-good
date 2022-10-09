
export const Footer = () => {
    return (
        <div className="mt-20 relative top-10">
            <footer className="bg-gray-800 text-center lg:text-left">
                <div
                    className="text-center bg-gray-800 p-4"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                >
                    <p className="text-gray-300">All rights reserved | Copyright &copy; {new Date().getFullYear()} </p>

                    <a className="text-gray-200" href="https://softuni.bg/">
                        Software University
                    </a>
                    <p className="text-gray-100">Hristo Petrov</p>
                </div>
            </footer>
        </div>

    );
}