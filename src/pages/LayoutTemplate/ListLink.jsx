import React from 'react';

const UlContainer = ({ children }) => <ul className="text-blue-200 underline">{children}</ul>;

const LiLink = ({ text, onClick }) => (
    <li>
        <span className="cursor-pointer" onClick={onClick}>
            {text}
        </span>
    </li>
);
export { UlContainer, LiLink };
