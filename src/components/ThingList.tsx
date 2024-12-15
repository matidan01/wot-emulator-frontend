import React, { useEffect, useState } from 'react';

const ThingsList = () => {
    const [things, setThings] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/things')
            .then(response => response.json())
            .then(data => {
                setThings(data);
                console.log('Initial data:', data);
            })
            .catch(error => console.error('Error fetching things:', error));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('http://localhost:3000/api/changes')
                .then(response => response.json())
                .then(changes => {
                    updateThings(changes);
                    console.log('Changes:', changes);
                })
                .catch(error => console.error('Error fetching changes:', error));
        }, 2000);

        return () => clearInterval(interval);
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
                                            <p key={key} className="mb-1"><strong>{key}:</strong>{String(value)}</p>
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