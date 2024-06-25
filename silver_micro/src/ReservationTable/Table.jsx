import React from 'react';

function Table({ currentTableIndex, incrementTable, tables, setError }) {
    return (
        <div id="table_container">
            <div id="table">
                <div>
                    <button onClick={() => { incrementTable(-1); setError(0) }}>❮</button>
                </div>
                <div>
                    <h5>Table {' ' + tables[currentTableIndex]} </h5>
                </div>
                <div>
                    <button onClick={() => { incrementTable(1); setError(0) }}>❯</button>
                </div>
            </div>
        </div>
    );
}

export default Table;
