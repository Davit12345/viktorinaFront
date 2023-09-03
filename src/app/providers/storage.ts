import {Injectable} from '@angular/core';

const TOKEN = 'TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';
const USER = 'USER';

@Injectable()
export class StorageProvider {
    User: any = null;

    isUserLogined() {
        return localStorage.getItem(TOKEN);
    }

    async LogedIn(data: any) {
        await localStorage.setItem(TOKEN, data.token);
        await localStorage.setItem(REFRESH_TOKEN, data.refresh_token);
        await localStorage.setItem(USER, JSON.stringify(data.user));
    }
    async setUser(user: any) {
        await localStorage.setItem(USER, JSON.stringify(user));
    }

    LogedOut() {
        localStorage.removeItem(TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        localStorage.removeItem(USER)
    }
}
