import { Request } from 'express';

export interface AuthenticatedRequest extends Request { //TODO: refactor code?
    userId?: string; // userId có kiểu string, hoặc kiểu dữ liệu tương ứng 
}
