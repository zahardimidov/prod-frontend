import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { UserService } from "./auth/services/user.service";
import { isAuthenticatedGuard } from './core/guards/is-authenticated.guard';

export const routes: Routes = [
	{
		path: "",
		loadChildren: () => import("./auth/auth.routes"),
		canActivate: [
			isAuthenticatedGuard,
		]
	},
	{
		path: "home",
		loadChildren: () => import("./features/home/home.routes"),
		canActivate: [() => inject(UserService).isAuthenticated],
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: '',
	}
];
