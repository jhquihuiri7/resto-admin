export type SubscriptionDatetime = {
    seconds: number;
    nanoseconds: number;
};

export type UserData = {
    id:string;
    email: string;
    company: string;
    last_name: string;
    suscription: number;
    first_name: string;
    role: number;
    password:string;
};

export class User {
    private data: UserData;

    constructor(userData: UserData) {
        this.data = userData;
    }

    static createNewUser(data: UserData): User {
        return new User(data);
    }

    getUserData(): UserData {
        return this.data;
    }
}
