
interface Manager {
    getDatas?: (input: { [key: string]: any }) => Promise<any[]>;
    addData?: (input: { [key: string]: any }) => Promise<{ message: string }>;
    updateData?: (input: { [key: string]: any }) => Promise<{ message: string }>;
    deleteData?: (input: { [key: string]: any }) => Promise<{ message: string }>;
}

export default Manager;