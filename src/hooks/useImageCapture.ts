import { useCallback, useState } from 'react';
import { message } from 'antd';
import { captureImage } from '../api/tankApi';
import IImageData from '../types/IImageData';

export const useImageCapture = () => {
    const [imageData, setImageData] = useState<IImageData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleImageCapture = useCallback(async () => {
        try {
            setLoading(true);
            const imageData = await captureImage();
            setImageData(imageData);
            setLoading(false);
        } catch (error: any) {
            message.error(`Image capture error: ${error}`);
            setLoading(false);
        }
    }, []);

    return { handleImageCapture, imageData, loading };
};