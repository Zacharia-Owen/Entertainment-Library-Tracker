import { User, LoginPayload, RegisterPayload } from '../interfaces/User';


const login = async (payload: LoginPayload): Promise<User> => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }
    const user: User = await response.json();
    return user;
};

const register = async (payload: RegisterPayload): Promise<User> => {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        throw new Error('Registration failed');
    }
    const user: User = await response.json();
    return user;
};

export { login, register };