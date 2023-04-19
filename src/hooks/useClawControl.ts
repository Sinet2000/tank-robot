import { useCallback } from 'react';
import { message } from 'antd';
import { clawControl } from '../api/tankApi';
import IClawInitControl from '../types/IClawInitControl';

export const useClawControl = () => {

    const handleClawControl = useCallback(async (model: IClawInitControl) => {
        try {
            await clawControl(model);
        } catch (error: any) {
            message.error(`Claw control error: ${error.message}`);
        }
    }, []);

    return handleClawControl;
};