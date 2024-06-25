
import React, { useState } from 'react';
import QRCode from 'qrcode.react';

function Popup(props) {

    return (
        <div>
            <div className="popup-overlay">
                <div className="popup">
                    <div className="popup-content">
                        <div id="infoQr">
                            <h3>Voici votre QR Code de réservation</h3>
                            <h6>Pensez à l'enregistrer pour le montrer à votre arrivée.</h6>
                        </div>
                        <QRCode value={"Reservation de " + props.popupData["name"] + " pour " + props.popupData["numberOfCovers"] + " personne en date du " + props.popupData["date"] + " Numero: " + props.popupData["numeroReservation"] + "."} />
                        <button onClick={() => props.setPopup(false)}>Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup;

