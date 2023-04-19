import { useCallback } from 'react';
import { message } from 'antd';
import { motorControl } from '../api/tankApi';

export const useMotorControl = () => {
    // const [motorStatus, setMotorStatus] = useState('');

    const handleMotorControl = useCallback(async (action: string) => {
        try {
            await motorControl(action);
        } catch (error: any) {
            message.error(`Motor control error: ${error.message}`);
        }
    }, []);

    return handleMotorControl;
};