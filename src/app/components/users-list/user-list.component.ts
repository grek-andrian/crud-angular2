import { Component, OnInit } from '@angular/core';
import 'rxjs';

import { UsersService } from './../../services/users.service';

@Component({
    selector: 'hg-user-list',
    template: `
        <div>Users list</div>
        <ul>
            <li *ngFor="let user of users" >
               <a [routerLink]="['/edit', user.id]">{{user.name}}</a>
               <button class="btn btn-danger" (click)="deleteUser(user.id)">x</button>
            </li>
        </ul>
        <button class="btn btn-primary" [routerLink]="['/add']">Add user</button>
    `,
})
export class UsersListComponent implements OnInit {
    users;
    constructor(private userService: UsersService) { }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.userService.getUsers().subscribe(
            users => this.users = users,
            error => console.error('Error: ', error)
        )
    }

    deleteUser(id) {
        this.userService.deleteUser(id).subscribe(
            res => this.getUsers(),
            error => console.error('Error: ', error)
        )
    }
}
