import React from 'react';

function ImageContainer({ scheduleIndex, tableCount, images }) {
    return (
        <div id="images">
            {!scheduleIndex && (
                <div className="image-container">
                    <img className="imgTable" src={process.env.PUBLIC_URL + '/asset/3.png'} alt="" />
                </div>
            )}
            {Array.from({ length: tableCount }, (_, i) => {
                const Index = scheduleIndex - (4 * i);
                const containerClass = i === 0 && window.innerWidth <= 767 ? "mobile-only" : "pc-only";
                return (
                    <div key={i} className={"image-container " + containerClass}>
                        {images.slice(0, Index).map((imgSrc, j) => (
                            <img key={j} className="imgTable" src={process.env.PUBLIC_URL + imgSrc} alt="" />
                        ))}
                        <img className="imgTable" src={process.env.PUBLIC_URL + '/asset/3.png'} alt="" />
                    </div>
                );
            })}
        </div>
    );
}

export default ImageContainer;
