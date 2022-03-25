import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    constructor() {
    }
    KEY = 'TOKEN';
    set(token: string) {
        localStorage.setItem(this.KEY, token);
    }
    get() {
        return localStorage.getItem(this.KEY) as string;
    }
    remove() {
        localStorage.removeItem(this.KEY);
    }
    payload() {
        return this.get() ? this.decode(this.get().split(".")[1]) : null as any;
    }
    decode(payload: string) {
        return JSON.parse(this.b64DecodeUnicode(payload));
    }
    private b64DecodeUnicode(str: string) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
}
