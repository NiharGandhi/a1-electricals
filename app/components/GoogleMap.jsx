import { Map, GoogleApiWrapper, Marker } from "google-maps-react"

const mapStyles = {
    width: '100%',
    height: '50%'
};

export const GoogleMap = () => {

    return (
        //The <Map></Map> need the following props
        //initialCenter={} will be the center on the Map
        <Map
            google={window.google}
            zoom={17}
            style={mapStyles}
            initialCenter={
                {
                    
                    lat: 22.236130772325065,
                    lng: 70.67275681349308
                }
            }
        >
           {/* //The Maker Component have a prop positio={ }
           //in which you decide the position of it */}
            <Marker
                position={
                    {
                        lat: 22.236130772325065,
                        lng: 70.67275681349308
                    }
                }
            />

        </Map>
    )
}


//Here we use GoogleApiWrapper() that we import of the package
export default GoogleApiWrapper({
    apiKey: process.env.GOOGLE_MAPS_API
})(MapGoogle);