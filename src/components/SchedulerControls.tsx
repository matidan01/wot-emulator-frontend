import React from 'react';
import socket from '../connection/socket'; 

const SchedulerControls: React.FC = () => {
    const sendCommand = (command: string) => {
        socket.emit('schedulerCommand', { command });
        console.log(`Sent: ${command}`);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Scheduler Controls</h1>
            <div className="d-flex justify-content-center">
                <button className="btn btn-success mx-2" onClick={() => sendCommand('start')}>
                    <i className="bi bi-play-fill"></i> Start
                </button>
                <button className="btn btn-warning mx-2" onClick={() => sendCommand('pause')}>
                    <i className="bi bi-pause-fill"></i> Pause
                </button>
                <button className="btn btn-info mx-2 text-white" onClick={() => sendCommand('resume')}>
                    <i className="bi bi-arrow-repeat"></i> Resume
                </button>
                <button className="btn btn-danger mx-2" onClick={() => sendCommand('stop')}>
                    <i className="bi bi-stop-fill"></i> Stop
                </button>
            </div>
        </div>
    );
};

export default SchedulerControls;
