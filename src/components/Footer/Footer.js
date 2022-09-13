
export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-center lg:text-left">
            <div className="container p-6 text-gray-300">
                <div className="grid lg:grid-cols-2 gap-4">
                    <div className="mb-6 md:mb-0">
                        <h5 className="font-medium mb-2 uppercase">Footer text</h5>
                        <p className="mb-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque
                            ea quis molestias. Fugiat pariatur maxime quis culpa corporis vitae
                            repudiandae aliquam voluptatem veniam, est atque cumque eum delectus
                            sint!
                        </p>
                    </div>
                    <div className="mb-6 md:mb-0">
                        <h5 className="font-medium mb-2 uppercase">Footer text</h5>
                        <p className="mb-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque
                            ea quis molestias. Fugiat pariatur maxime quis culpa corporis vitae
                            repudiandae aliquam voluptatem veniam, est atque cumque eum delectus
                            sint!
                        </p>
                    </div>
                </div>
            </div>
            <div
                className="text-center bg-gray-800 p-4"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
            <p className="text-gray-300">All rights reserved | Copyright &copy; {new Date().getFullYear()} </p>

                <a className="text-gray-100" href="https://tailwind-elements.com/">
                    Tailwind Elements
                </a>
            </div>
        </footer>

    );
}