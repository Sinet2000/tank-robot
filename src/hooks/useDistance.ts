import { useState, useEffect } from 'react';
import { message } from 'antd';
import { getDistance } from '../api/tankApi';

export const useDistance = (interval: number) => {
    const [distance, setDistance] = useState<number>(0);

    useEffect(() => {
        const fetchDistance = async () => {
            try {
                const data = await getDistance();
                setDistance(data.distance);
            } catch (error: any) {
                message.error(`Distance measurement error: ${error.message}`);
            }
        };

        const timer = setInterval(fetchDistance, interval);
        return () => clearInterval(timer);
    }, [interval]);

    return distance;
};