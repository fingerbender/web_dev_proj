import React, { useState, useEffect, useMemo } from 'react';
import "./Geolocation.css";

//Geolocation code reference: https://www.educative.io/answers/how-to-use-geolocation-call-in-reactjs
//added my own distance calculating algorithm

function Geolocation() {
    // const variable array to save the users location
    const [userLocation, setUserLocation] = useState(null);

    //React Grocery Store = Meta HQ, see hardcoded coord below:
    const metaLocation = useMemo(() => ({
        latitude: 38.33737,
        longitude: -122.09534
    }), []);

    //calculate straight line distance between user & react grocery store (meta HQ)
    const [distance, setDistance] = useState(0);


    //render when any of the state dependencies change = when user click geolocation button
    useEffect(() => {
        if (userLocation) {
            // distance = sqrt((x2-x1)^2 + (y2-y1)^2)
            //1 deg latitude = 364000 ft; 1 deg longitude = 288200 ft; 5280 feet = 1 mile
            const latitudeDiff = metaLocation.latitude - userLocation.latitude;
            const latitudeDistSq = Math.pow(((latitudeDiff * 364000) / 5280), 2);
            const longitudeDiff = metaLocation.longitude - userLocation.longitude;
            const longitudeDistSq = Math.pow(((longitudeDiff * 288200) / 5280), 2);
            //dont assign calculation directly into setDistance(), it won't work;
            const calcDist = Math.sqrt(latitudeDistSq + longitudeDistSq);
            setDistance(calcDist);

            console.log("user lat & long: ", userLocation.latitude, userLocation.longitude);
            console.log("meta lat & long: ", metaLocation.latitude, metaLocation.longitude);
            console.log("lat diff: ", latitudeDiff);
            console.log("lat dist sq: ", latitudeDistSq);
            console.log("long diff: ", longitudeDiff);
            console.log("long dist sq: ", longitudeDistSq);
            console.log("distance: ", distance);
        }
    }, [userLocation, metaLocation, distance]);


    // define the function that finds the users geolocation
    const getUserLocation = () => {
        // if geolocation is supported by the users browser
        if (navigator.geolocation) {
            // get the current users location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // save the geolocation coordinates in two variables
                    const { latitude, longitude } = position.coords;
                    // update the value of userlocation variable
                    setUserLocation({ latitude, longitude });

                    //calc distance between user & react store (meta HQ) 
                    // when user location update in useEffect

                    //remove button after use.
                    document.getElementById("locBtn").style.display = 'none';
                },
                // if there was an error getting the users location
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        }
        // if geolocation is not supported by the users browser
        else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    // return an HTML page for the user to check their location
    return (
        <div id="geo">
            <h1>Geolocation</h1>
            {/* create a button that is mapped to the function which retrieves the users location */}
            <button id="locBtn" onClick={getUserLocation}>Get User Location</button>
            {/* if the user location variable has a value, print the users location */}
            {userLocation && (
                <div id="geolocpanel">
                    <div id="usercoord">
                        <h2>User Location</h2>
                        <p>Latitude: {userLocation.latitude}</p>
                        <p>Longitude: {userLocation.longitude}</p>
                    </div>
                    <div id="metacoord">
                        <h2>React Grocery Store (Meta HQ) Location:</h2>
                        <p>Latitude: {metaLocation.latitude}</p>
                        <p>Longitude: {metaLocation.longitude}</p>
                    </div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12663.870798559145!2d-122.1667363747698!3d37.48508859216862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbc96de8dc419%3A0x64979e438bf4e3a5!2sMeta%20Headquarters!5e0!3m2!1sen!2sus!4v1733950166900!5m2!1sen!2sus"
                        id="map"
                        title='React Grocery Store (Meta HQ)'
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">

                    </iframe>
                    <div id="resultbox">
                        <h2>Straightline distance between your location & the store:</h2>
                        <p>{distance} miles</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Geolocation;