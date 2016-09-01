import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {LOGIN_URI} from '../provider/config';
import {REGISTER_URI} from '../provider/config';
import {REGISTER_USER_URI} from '../provider/config';
import {SERVER} from '../provider/config';
import { UserProfile } from '../model/user-profile';

@Injectable()
export class UserServices {
    user: UserProfile=new UserProfile();

    constructor(private http: Http) {
    }

    login(body): Observable<any> {
        return this.http.post(SERVER+LOGIN_URI, body)
            .map(res => this.user.id = res.json().key)
            .catch((error: any) => Observable.throw(error|| 'Server error'));
    }
    register(body): Observable<any> {
        return this.http.post(SERVER+REGISTER_URI, body)
            .map(res => res.json()) 
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    update(body): Observable<any> {
        return this.http.post(SERVER+REGISTER_USER_URI, body)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
    get(): Observable<any> {
        let headers = new Headers();
        if (this.user) if (this.user.id) headers.append('Authorization', 'Token '+this.user.id);
        headers.append('Content-Type', 'text/plain');
        let options = new RequestOptions({ headers: headers });
        return this.http.get(SERVER+REGISTER_USER_URI, options)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}