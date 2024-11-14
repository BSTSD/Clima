export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocalización no soportada'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            position => {
                resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },
            error => {
                reject(error);
            }
        );
    });
};

export const getUserLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    return browserLang;
};

export const getIPLocation = async () => {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return {
            lat: data.latitude,
            lon: data.longitude,
            city: data.city,
            country: data.country
        };
    } catch (error) {
        console.error('Error getting IP location:', error);
        throw error;
    }
}; 