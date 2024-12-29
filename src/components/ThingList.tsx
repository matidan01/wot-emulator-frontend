import { useEffect, useState } from 'react';
import socket from '../connection/socket'; 

const ThingsList = () => {
    // State to store the list of "things" received from the server.
    const [things, setThings] = useState<any[]>([]);

    useEffect(() => {

        // Set up a listener for the "setup" event from the server.
        socket.on("setup", (data) => {
            setThings(data);
            console.log("Data received from server:", data);
        });

        // Set up a listener for the "update" event to handle incremental updates.
        socket.on("update", (data) => {
            setThings(prevThings => updateThings(data, prevThings));
            console.log("Data received from server:", data);
        });

        // Listen for "serverStopped" to refresh the page
        socket.on("serverStopped", () => {
            console.log("Server stopped. Refreshing the page...");
            window.location.reload(); // Refreshes the page
        });

        // Cleanup: Remove all socket listeners when the component unmounts.
        return () => {
            socket.off("setup");
            socket.off("update");
            socket.off("serverStopped");
        };
    }, []);

    // Function to update the list of "things" with changes received from the server.
    const updateThings = (changes: any[], prevThings: any[]) => {
        const updatedThings = prevThings.map(thing => {
            const change = changes.find(c => c.title === thing.title);
            if (change) {
                return { ...thing, ...change }; 
            }
            return thing; 
        });
        return updatedThings;
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Things</h1>
            <div className="row">
                {things.map((thing, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title text-primary">{thing.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Type: {thing.type}</h6>
                                <div className="card-text">
                                    {Object.entries(thing).map(([key, value]) => (
                                        key !== 'title' && key !== 'type' && (
                                            <p key={key} className="mb-1"><strong>{key}:</strong> {String(value)}</p>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThingsList;
