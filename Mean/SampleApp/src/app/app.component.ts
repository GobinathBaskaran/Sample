import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  users: Array<any> = [];
  constructor(private _http: HttpClient) {

  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this._http.get('api/user/all').subscribe((response) => {
      if (response) {
        this.users = [];
        const users = (response as Array<any>);
        for (const user of users) {
          this.users.push(user);
        }
      }
    }, (error) => {
      console.log('error' + error);
    });
  }

  addUser() {
    const user = {
      name: 'T1',
      userName: 'Test',
      password: 'TestPass'
    };

    this._http.post('api/user/add', user, { responseType: 'json' }).subscribe((response) => {
      if (response) {
        this.users.push(response);
      }
    }, (error) => {
      console.log('error' + error);
    });
  }


  updateUser(id: string) {
    const user = {
      name: 'Updated Name',
      userName: 'Test',
      password: 'TestPass'
    };

    this._http.put('api/user/' + id, user, { responseType: 'json' }).subscribe((response) => {
      if (response) {
        this.getUsers();
      }
    }, (error) => {
      console.log('error' + error);
    });
  }

  deleteUser(id: string) {
    this._http.delete('api/user/' + id, { responseType: 'json' }).subscribe((response) => {
      if (response) {
        this.getUsers();
      }
    }, (error) => {
      console.log('error' + error);
    });
  }
}
