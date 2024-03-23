import React from 'react';

// import "./styles.css";
// import PlaceIcon from '@mui/icons-material/Place';
// HiLocationMarkerImLocation

const styles = `* {
  box-sizing: border-box;
}

body {
    display: flex;
    justify - content: center;
    align - items: center;
    width: 100vw;
    height: 500px;
}
`;
const position = {
    lat: 37.772,
    lng: -122.214,
};

const centers = [
    {
        lat: 37.772,
        lng: -122.214,
    },
    {
        lat: 37.672,
        lng: -122.219,
    },
    {
        lat: 37.832,
        lng: -122.424,
    },
];

const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
};

const MapView = ({ q }) => {
    const url = 'https://www.google.com/maps/embed/v1/place?zoom=17&language=ja&region=JP';
    const key = 'AIzaSyB6TCMr7mR6lwj9z_KJBvrXStVYwT-Mtr8';

    return (
        <div className="flex flex-col items-center">
            <iframe
                width="1344"
                height="756"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`${url}&key=${key}&q=${q}`}
            ></iframe>
        </div>
    );
};

export default MapView;
