import { Router } from 'express';

interface API {
    path: string;
    router: Router;
}

export default API;