import axios from 'axios';
import api from './api'
import IClawInitControl from '../types/IClawInitControl';
import IImageData from '../types/IImageData';

export const motorControl = async (action: string) => {
  try {
    const response = await api.post('/motor-control', { action });
    return response.data;
  } catch (error) {

    const errorResponse = (error as { response?: { data: any } }).response;
    throw errorResponse ? errorResponse.data : new Error('Could not connect to server');
  }
};

export const captureImage = async (): Promise<IImageData> => {
  try {
    const response = await api.get('/image');
    const imageData = response.data.imageData;
    const fileName = response.data.fileName;

    // Return the image data and filename
    return { imageData, fileName };
  } catch (error) {
    const errorResponse = (error as { response?: { data: any } }).response;
    throw errorResponse ? errorResponse.data : new Error('Could not control claw');
  }
};

export const clawControl = async (model: IClawInitControl) => {
  try {
    const response = await api.post('/claw-control', { model });
    return response.data;
  } catch (error) {

    const errorResponse = (error as { response?: { data: any } }).response;
    throw errorResponse ? errorResponse.data : new Error('Could not control claw');
  }
};

export const initClawControl = async () => {
  try {
    const response = await api.get('/claw-control');
    return response;
  } catch (error) {

    const errorResponse = (error as { response?: { data: any } }).response;
    throw errorResponse ? errorResponse.data : new Error('Could not init claw control');
  }
};


export const getDistance = async () => {
  try {
    const response = await api.get('/distance');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error || 'Failed to get distance');
  }
};

export const testApi = async () => {
  try {
    const response = await api.get('/test');
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.error || 'Error connecting to API');
  }
};