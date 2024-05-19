import { Request } from 'express';

export default interface AuthenticatedRequest extends Request { //TODO: refactor code?
    userId?: string; // userId có kiểu string, hoặc kiểu dữ liệu tương ứng 
    role?: string; // role có kiểu string, hoặc kiểu dữ liệu tương ứng
}
