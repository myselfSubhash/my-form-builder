import React, { useState } from "react";

const FormBuilder = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [formElements, setFormElements] = useState<any[]>([]);
    const [isThemeSidebarExpanded, setIsThemeSidebarExpanded] = useState(false);
    const [showThemes, setShowThemes] = useState(false);
    const [theme, setTheme] = useState("theme1");
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    const handleAddElementClick = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    const handleDragStart = (e: React.DragEvent, type: string) => {
        e.dataTransfer.setData("elementType", type);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const elementType = e.dataTransfer.getData("elementType");

        const newElement = { type: elementType, id: Date.now() };

        setFormElements([...formElements, newElement]);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleRemoveElement = (id: number) => {
        setFormElements(formElements.filter((el) => el.id !== id));
    };

    const handleThemeButtonClick = () => {
        setIsThemeSidebarExpanded(!isThemeSidebarExpanded);
        setShowThemes(false); //reset
    };

    const handleShowThemes = () => {
        setShowThemes(!showThemes);
    };

    const applyTheme = (selectedTheme: string) => {
        setTheme(selectedTheme);
    };

    const themeStyles: { [key: string]: string } = {
        theme1: "bg-blue-100 font-sans text-base",
        theme2: "bg-green-100 font-serif text-lg",
        theme3: "bg-yellow-100 font-mono text-xl",
    };

    const submitButtonColors: { [key: string]: string } = {
        theme1: "bg-blue-500",
        theme2: "bg-green-500",
        theme3: "bg-yellow-500",
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Top Navigation */}
            <nav className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-4 flex justify-between items-center">
                <h1 className="text-lg font-bold">Form Builder</h1>
                <div className="flex items-center gap-2">
                    <span>Preview Form</span>
                    <input
                        type="checkbox"
                        className="toggle"
                        checked={isPreviewMode}
                        onChange={() => setIsPreviewMode(!isPreviewMode)}
                    />
                </div>
            </nav>

            <div className="flex flex-1 flex-col md:flex-row">
                {/* Left Sidebar - Add Elements */}
                {!isPreviewMode && (
                <aside
                    className={`bg-gray-800 text-white p-4 transition-all duration-300 ${isSidebarExpanded ? "w-64" : "w-40"
                        }`}
                >
                    <button
                        onClick={handleAddElementClick}
                        className="bg-gray-700 p-2 rounded flex items-center w-full md:w-auto"
                    >
                        {isSidebarExpanded ? "Close Sidebar -" : "Add Element +"}{" "}

                    </button>

                    {isSidebarExpanded && (
                        <div className="mt-4">
                            {/* Draggable Items */}
                            <div
                                className="p-2 bg-gray-600 rounded cursor-pointer mb-2 flex items-center"
                                draggable
                                onDragStart={(e) => handleDragStart(e, "fullName")}
                            >
                                <span className="mr-2">👤</span> Full Name
                            </div>
                            <div
                                className="p-2 bg-gray-600 rounded cursor-pointer mb-2 flex items-center"
                                draggable
                                onDragStart={(e) => handleDragStart(e, "email")}
                            >
                                <span className="mr-2">📧</span> Email
                            </div>
                            <div
                                className="p-2 bg-gray-600 rounded cursor-pointer mb-2 flex items-center"
                                draggable
                                onDragStart={(e) => handleDragStart(e, "phone")}
                            >
                                <span className="mr-2">📞</span> Phone
                            </div>
                        </div>
                    )}
                </aside>
                )}

                {/* Form Builder Canvas */}
                <main
                    className={`flex-1 bg-gray-100 flex justify-center items-start pt-20 p-4 transition-all duration-300 ${themeStyles[theme]}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-2/3 text-center">
                        <h2 className="text-2xl font-bold">Form</h2>

                        {/* Render Form Elements */}
                        {formElements.map((element) => (
                            <div key={element.id} className="mt-10 border p-3 rounded relative">
                                {element.type === "fullName" && (
                                    <>
                                        <label className="block text-left font-bold">Name</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                className="border p-2 rounded w-1/2"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                className="border p-2 rounded w-1/2"
                                            />
                                        </div>
                                    </>
                                )}
                                {element.type === "email" && (
                                    <>
                                        <label className="block text-left font-bold">Email</label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="border p-2 rounded w-full"
                                        />
                                    </>
                                )}
                                {element.type === "phone" && (
                                    <>
                                        <label className="block text-left font-bold">Phone</label>
                                        <input
                                            type="tel"
                                            placeholder="Enter your phone number"
                                            className="border p-2 rounded w-full"
                                        />
                                    </>
                                )}

                                {/* Remove Button */}
                                {!isPreviewMode && (
                                <button
                                    onClick={() => handleRemoveElement(element.id)}
                                    className="absolute size-6 top-1.5 right-1.5 bg-red-500 text-white  rounded-full"
                                >
                                    🗑
                                </button>
                                )}
                            </div>
                        ))}

                        <button className={`text-white p-2 rounded mt-4 w-1/3 ${submitButtonColors[theme]}`}>
                            Submit
                        </button>
                    </div>
                </main>

                {/* Right Sidebar - Theme Settings */}
                {!isPreviewMode && (
                <aside
                    className={`bg-gray-800 text-white p-4 transition-all duration-300 ${isThemeSidebarExpanded ? "w-64" : "w-16"
                        } flex flex-col items-center`}
                >
                    <button onClick={handleThemeButtonClick}
                        className="bg-blue-500 text-white p-3 rounded-full">
                        🎨
                    </button>

                    {isThemeSidebarExpanded && (
                        <div className="mt-4 w-full">
                            <button onClick={handleShowThemes}
                                className="bg-gray-700 text-white p-2 rounded w-full">
                                {showThemes ? "Close Themes -" : "Themes +"}
                            </button>

                            {showThemes && (
                                <div className="mt-2 flex flex-col gap-2">
                                <div onClick={() => applyTheme("theme1")} className="bg-blue-500 text-white p-2 rounded cursor-pointer">Theme 1</div>
                                <div onClick={() => applyTheme("theme2")} className="bg-green-500 text-white p-2 rounded cursor-pointer">Theme 2</div>
                                <div onClick={() => applyTheme("theme3")} className="bg-yellow-500 text-white p-2 rounded cursor-pointer">Theme 3</div>
                            </div>
                            )}
                        </div>
                    )}
                </aside>
                )}
            </div>
        </div>
    );
};

export default FormBuilder;

