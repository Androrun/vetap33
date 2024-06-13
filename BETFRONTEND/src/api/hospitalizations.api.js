import axios from './axios';

export const getAllHospitalizationsRequest = () => axios.get('/veterinario/hospitalization');

export const getHospitalizationRequest = (id) => axios.get(`/veterinario/hospitalization/${id}`);

export const createHospitalizationRequest = (hospitalization) => axios.post('/veterinario/hospitalization', hospitalization);

export const updateHospitalizationRequest = (id, hospitalization) => axios.put(`/veterinario/hospitalization/${id}`, hospitalization);

export const deleteHospitalizationRequest = (id) => axios.delete(`/veterinario/hospitalization/${id}`);
