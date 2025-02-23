import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from "../../services/user.service";

@Component({
    selector: 'app-register',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export default class RegisterComponent {
    @ViewChild('passwordContainer') passwordContainer!: ElementRef<HTMLInputElement>;

    password: string = '';
    email: string = '';
    username: string = '';

    constructor(
        private router: Router,
        private userService: UserService,
    ) {}

    showPassword() {
        if (this.passwordContainer.nativeElement.type === 'text')
            this.passwordContainer.nativeElement.type = 'password';
        else
            this.passwordContainer.nativeElement.type = 'text';
    }

    login() {
        this.userService.register({
            username: this.username,
            password: this.password,
        }).catch((error) => {
            console.log(error);
        }).then(() => {
            this.router.navigate(['/home']).then();
        })
    }
}
