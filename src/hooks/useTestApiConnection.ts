import { useState } from 'react';
import { testApi } from '../api/tankApi';

export const useApiConnection = () => {
    const [apiUrl, setApiUrl] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    const testApiConnection = async () => {
        try {
            const response = await testApi();
            if (response.status === 200) {
                setIsConnected(true);
                return true;
            } else {
                setIsConnected(false);
                return false;
            }
        } catch (error) {
            setIsConnected(false);
            return false;
        }
    };

    return { apiUrl, setApiUrl, isConnected, setIsConnected, testApiConnection };
};
