import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageTaskService {
  constructor(private http: HttpClient) { }

    getDashboardData() {
    return this.http.get('assets/db.json');
  }
}
