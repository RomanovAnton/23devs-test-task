import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
    providedIn: 'root',
})
export class BaseService<T extends any> {
    protected entityUrlName: string = '';
    constructor(public http: HttpClient) {}

    getAll(queryParams: object = {}) {
        return this.http.get<T[]>(environment.apiBaseUrl + this.entityUrlName + this.objectToURIParams(queryParams));
    }

    create(element: T, queryParams: object = {}) {
        return this.http.post<T>(
            environment.apiBaseUrl + this.entityUrlName + this.objectToURIParams(queryParams),
            element
        );
    }

    update(data: T) {
        return this.http.patch<null>(environment.apiBaseUrl + this.entityUrlName, data);
    }

    delete(id: number) {
        return this.http.delete<T>(environment.apiBaseUrl + this.entityUrlName + '/' + id);
    }

    protected objectToURIParams(queryParams: any) {
        let str = '';
        for (const key in queryParams) {
            str += str === '' ? '?' : '&';
            str += encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]);
        }
        return str;
    }
}
