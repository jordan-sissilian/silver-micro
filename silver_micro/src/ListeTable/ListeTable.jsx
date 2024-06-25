import React, { useState } from 'react';
import Table from './Table';

import './ListeTable.css';

function ListeTable(props) {
    const [Log, setLog] = useState(0);

    const logout = () => {
        alert("Déconnexion")
    };

    const tables = [
        '1',
        '2',
        '3',
        '4'
    ];

    return (
        <div id="listeTable">
            <div id="liste">
                <div id="listeDetail">
                    <div id="title">
                        <h2>Liste des table</h2>
                    </div>
                    <div id="body">
                        <div id="listeTable_table">
                            <div style={{ height: '90%' }}>
                                {tables.map((table, index) => (
                                    <Table key={index} index={index} />
                                ))}
                            </div>
                            <div>
                                <button>Ajouter une table</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <a onClick={() => { logout(); props.setRet(0) }}>Se Déconnecter</a>
            </div>
        </div>
    );
}

export default ListeTable;

