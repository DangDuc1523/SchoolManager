import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private baseUrl = 'http://localhost:3000/api/admin';

    constructor(private http: HttpClient) {}

    getTotalUsers(): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/users/count`);
    }

    getTotalClasses(): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/classes/count`);
    }

    getTotalSubjects(): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/subjects/count`);
    }

    getPendingReports(): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/reports/pending-count`);
    }
}
