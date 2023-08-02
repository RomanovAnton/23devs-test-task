export type User = {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    age: {
        year: number;
        month: number;
        day: number;
    };
    confirmPassword: string;
};
