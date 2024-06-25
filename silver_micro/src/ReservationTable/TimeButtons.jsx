import React from 'react';

function TimeButtons({ scheduleValue, setScheduleValue, isMobile, setHeur }) {
    const schedule = [
        '0',
        '12H/14H',
        '14H/16H',
        '19H/21H',
        '21H/23H'
    ];

    return (
        <div id="heur">
            {setHeur != null && (
                <div className={isMobile ? "mobile-only" : "pc-only"}>
                    {[1, 2, 3, 4].map(time => (
                        <React.Fragment key={time}>
                            <button
                                className={scheduleValue === time ? "selected" : ""}
                                onClick={() => setScheduleValue(time)}
                            >
                                {schedule[time]}
                            </button>
                            {isMobile && time % 2 === 0 && <br />}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TimeButtons;
