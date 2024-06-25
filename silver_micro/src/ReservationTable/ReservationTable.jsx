import React, { useState } from 'react';
import './ReservationTable.css';
import Table from './Table';
import ErrorDisplay from './ErrorDisplay';
import TimeButtons from './TimeButtons';
import ImageContainer from './ImageContainer';
import CoversControl from './CoversControl';
import Popup from './PopUpReservation';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ApiClient from '../Api/Api';

function ReservationTable(props) {

    const connexionClient = new ApiClient.APIClientConnexion();

    const [nameUser, setNameUser] = useState(sessionStorage.getItem("username"));

    const [tableCount, setTableCount] = useState(0);
    const [scheduleIndex, setScheduleIndex] = useState(0);
    const [scheduleValue, setScheduleValue] = useState(0);
    const [currentTableIndex, setCurrentTableIndex] = useState(0);
    const [error, setError] = useState(0);

    const images = [
        '/asset/1.png',
        '/asset/5.png',
        '/asset/4.png',
        '/asset/2.png'
    ];

    const tables = [
        '1',
        '2',
        '3',
        '4'
    ];

    const incrementTable = (value) => {
        const newTableIndex = currentTableIndex + value;
        setScheduleIndex(0);
        setTableCount(0);
        if (newTableIndex >= 0 && newTableIndex < tables.length)
            setCurrentTableIndex(newTableIndex);
    };

    const checkout = () => {
        setTimeout(() => {
            setError(0);
        }, 5000);

        if (selectedDate == null) {
            setError(1);
            return;
        } else if (!scheduleValue) {
            setError(2);
            return;
        } else if (!scheduleIndex) {
            setError(3);
            return;
        }

        const day = selectedDate.getDate().toString().padStart(2, '0');
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = selectedDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        const checkoutData = {
            name: !props.Role ? "Invité" : sessionStorage.getItem("username"),
            numberOfCovers: scheduleIndex,
            schedule: scheduleValue,
            numberOfTables: Math.ceil(scheduleIndex / 4),
            date: formattedDate,
            numeroReservation: "0"
        };

        setScheduleValue(0);
        setScheduleIndex(0);
        setTableCount(0);
        setSelectedDate(null);
        
        console.log(JSON.stringify(checkoutData));
        //si c'est ok
        checkoutData.numeroReservation = "01334";
        setPopupData((checkoutData));
        setPopup(true);
        //props.setRet(0);
    };

    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [popup, setPopup] = useState(false);
    const [popupData, setPopupData] = useState([]);

    const logout = () => {
        connexionClient.sendLogout();
        sessionStorage.clear();
        props.setRole(0);
        props.setRet(0);
    }

    return (
        <div id="body_home">
            {props.Role < 2 ? (<>
                <div id="retour">
                    <a onClick={logout}> {!!props.Role ? "Déconnexion" : "Retour"}</a>
                </div>
                <div id="table_container">
                    <h5>{!props.Role ? "Connecté en Invité" : "Bonjour " + nameUser + "."}</h5>
                </div>
            </>) : (<>
                <div id="retour">
                    <a onClick={() => props.setRet(0)}>Retour</a>
                </div>
                <Table
                    currentTableIndex={currentTableIndex}
                    incrementTable={incrementTable}
                    tables={tables}
                    setError={setError}
                />
            </>)
            }
            <ErrorDisplay error={error} />
            <div id="date">
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/YYYY"
                    placeholderText="Sélectionnez une date"
                    minDate={new Date()}
                    icon="fa fa-calendar"
                    className="customDatepicker"
                />
            </div>
            <TimeButtons
                setHeur={selectedDate}
                scheduleValue={scheduleValue}
                setScheduleValue={setScheduleValue}
                isMobile={window.innerWidth <= 767}
            />
            <ImageContainer
                scheduleIndex={scheduleIndex}
                tableCount={tableCount}
                images={images}
            />
            <CoversControl
                scheduleIndex={scheduleIndex}
                tableCount={tableCount}
                setScheduleIndex={setScheduleIndex}
                setTableCount={setTableCount}
                setError={setError}
                checkout={checkout}
                role={props.Role}
            />
            {!!popup && (
                <Popup popupData={popupData} setPopup={setPopup}/>
            )}
        </div>
    );
}

export default ReservationTable;
