import client from './client';

export const fetchExternalNews = () => client.get('/api/external-news');
