// DistributorCard.jsx
import React from "react";

const DistributorCard = ({ countryName, companyName, poBox, address, address2, tel, fax }) => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md shadow-blue-950 mb-8">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">{countryName}</h2>
            <p className="text-gray-900 font-medium mb-2">{companyName}</p>
            {poBox && <p className="text-gray-800 mb-2">PO Box: {poBox}</p>}
            <p className="text-gray-800 mb-2 font-normal">{address}</p>
            <p className="text-gray-800 mb-2 font-normal">{address2}</p>
            <p className="text-gray-900 mb-2 font-light">Tel: {tel}</p>
            {fax && <p className="text-gray-900 font-light">Fax: {fax}</p>}
        </div>
    );
};

export default DistributorCard;
