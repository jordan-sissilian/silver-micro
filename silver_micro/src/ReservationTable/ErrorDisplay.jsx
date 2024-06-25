import React from 'react';

function ErrorDisplay({ error }) {
    return (
        <div id="error">
            <p>
                {(error === 1) && 'Choisissez une date de réservation'}
                {(error === 2) && 'Choisissez un horaire'}
                {(error === 3) && 'Choisissez le nombre de guest'}
            </p>
        </div>
    );
}

export default ErrorDisplay;
