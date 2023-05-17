import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Students } from "../models/Students";

@Injectable({
    providedIn: 'root'
})

export class StudentsServices {
    private apiUrl = 'http://localhost:3000/Students';

    constructor (private http: HttpClient) { }

    getStudents(): Observable<Students[]> {
        return this.http.get<Students[]>(this.apiUrl)
    }
    createStudent(student: Students): Observable<Students> {
        return this.http.post<Students>(this.apiUrl, student);
    }
    editStudent(student: Students): Observable<any> {
        const url = `${this.apiUrl}/${student.id}`;
        return this.http.put(url, student);
    }
    deleteStudent(student: Students): Observable<Students> {
        const url = `${this.apiUrl}/${student.id}`;
        return this.http.delete<Students>(url);
    }
}