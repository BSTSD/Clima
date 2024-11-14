import React, { useEffect } from 'react';

const AdComponent = ({ slot }) => {
    useEffect(() => {
        try {
            // Asegúrate de que window.adsbygoogle está disponible
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.error('Error al cargar el anuncio:', error);
        }
    }, []);

    return (
        <div className="ad-container">
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-TU_ID_DE_CLIENTE"
                data-ad-slot={slot}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default AdComponent; 