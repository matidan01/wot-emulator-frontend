import { useEffect, useState } from 'react';
import socket from '../connection/socket'; 

const ThingsList = () => {
    const [things, setThings] = useState<any[]>([]);

    useEffect(() => {
        socket.on("setup", (data) => {
            setThings(data);
            console.log("Data received from server:", data);
        });

        socket.on("update", (data) => {
            updateThings(data);
            console.log("Data received from server:", data);
        });

        return () => {
            socket.off("setup");
            socket.off("update");
        };
    }, []);

    const updateThings = (changes: any[]) => {
        setThings(prevThings => {
            const updatedThings = prevThings.map(thing => {
                const change = changes.find(c => c.title === thing.title);
                if (change) {
                    return { ...thing, ...change }; 
                }
                return thing; 
            });
            return updatedThings;
        });
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
