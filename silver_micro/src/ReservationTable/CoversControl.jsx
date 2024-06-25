import React from 'react';

function CoversControl({ scheduleIndex, tableCount, setScheduleIndex, setTableCount, setError, checkout }) {

    const Role = 0;

    return (
        <div id="chooseCouvert">
            {!Role ? (<>
                <div id="couvert">
                    <button onClick={() => {
                        setError(0);
                        if (scheduleIndex - 1 > 0) {
                            setScheduleIndex(scheduleIndex - 1);
                            if (!((scheduleIndex - 1) % 4))
                                setTableCount(tableCount - 1);
                        }
                    }}>-</button>
                    <div id="nbCouver">
                        <h6>{scheduleIndex} GUEST</h6>
                    </div>
                    <button onClick={() => {
                        setError(0);
                        if (scheduleIndex < 16) {
                            setScheduleIndex(scheduleIndex + 1);
                            if (!(scheduleIndex % 4))
                                setTableCount(tableCount + 1);
                        }
                    }}>+</button>
                </div>
                <>
                    <button id="valide" onClick={checkout}>Valider</button>
                </>
            </>) : (<>
                <button id="valide">Supprimer la reservation</button>
                <button id="valide">Supprimer la table</button>
            </>)}
        </div>
    );
}

export default CoversControl;