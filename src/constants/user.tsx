export type SubscriptionDatetime = {
    seconds: number;
    nanoseconds: number;
};

export type UserData = {
    id:string;
    company: string;
    suscription_expire_datetime: SubscriptionDatetime;
    last_name: string;
    created_datetime: SubscriptionDatetime;
    last_login_datetime: SubscriptionDatetime;
    suscription: number;
    first_name: string;
    role: number;
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
