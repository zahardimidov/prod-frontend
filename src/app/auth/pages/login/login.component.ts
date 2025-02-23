import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
	selector: "app-login",
	imports: [
		RouterLink,
		FormsModule,
	],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.css",
})
export default class LoginComponent {
	@ViewChild("passwordContainer") passwordContainer!: ElementRef<HTMLInputElement>;

	password: string = "";
	username: string = "";

	constructor(
		private router: Router,
		private userService: UserService,
	) {}

	showPassword() {
		if (this.passwordContainer.nativeElement.type === "text")
			this.passwordContainer.nativeElement.type = "password";
		else
			this.passwordContainer.nativeElement.type = "text";
	}

	login() {
		this.userService.login({
			username: this.username,
			password: this.password,
		}).catch(error => {
			console.log(error);
		}).then(() => {
			this.router.navigate(["/home"]).then();
		});
	}
}
