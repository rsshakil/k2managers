import React from 'react';
import DragHorizontally from '../../components/Draggables/DragHorizontally';
import LayoutWrapper from '../../components/Wrapper/LayoutWrapper';

const DragHorizontallyPage = () => {
    
    return (
        <LayoutWrapper>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left bg-white text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            {[
                                "Apple MacBook Pro 17",
                                "silver",
                                "Laptop",
                                "$299",
                            ].map((item, index) => (
                                <DragHorizontally key={index}>
                                    {index === 0 ? (
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                        >
                                            {item}
                                        </th>
                                    ) : (
                                        <td className="px-6 py-4">{item}</td>
                                    )}
                                </DragHorizontally>
                            ))}
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            {[
                                "Asus",
                                "Black",
                                "Laptop",
                                "$499",
                            ].map((item, index) => (
                                <DragHorizontally key={index}>
                                    {index === 0 ? (
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                        >
                                            {item}
                                        </th>
                                    ) : (
                                        <td className="px-6 py-4">{item}</td>
                                    )}
                                </DragHorizontally>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </LayoutWrapper>
    );
};

export default DragHorizontallyPage;