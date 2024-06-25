import React, { useState } from 'react';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import ReservationTable from '../ReservationTable/ReservationTable.jsx';
import ListeTable from '../ListeTable/ListeTable.jsx';

import './Home.css';

function Home() {
    const [Log, setLog] = useState(0); //set a 0
    const [Role, setRole] = useState(0); //set a 0

    const toggleLoginRegister = () => {
        setLog(Log === 0 ? 1 : 0);
    }

    const renderComponentForRole = () => {
        switch (Role) {
            case 1:
                return <ReservationTable setRet={setLog} Role={Role} setRole={setRole} />
            case 2:
                return <ListeTable setRet={setLog}/>
            case 3:
                return "PATRON";
            default:
                return <ReservationTable setRet={setLog} Role={Role} setRole={setRole}/>;
        }
    }

    return (
        <div id="home">
            {Log === 2 ? (<>
                {renderComponentForRole()}
            </>) : (<>
                <div id="body_home">
                    {Log ? (
                        <Register toggleLoginRegister={toggleLoginRegister} setLog={setLog} setRole={setRole} />
                    ) : (
                        <Login toggleLoginRegister={toggleLoginRegister} setLog={setLog} setRole={setRole} />
                    )}
                </div>
            </>)}
        </div>
    );
}

export default Home;

