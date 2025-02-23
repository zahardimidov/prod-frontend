import { provideHttpClient } from "@angular/common/http";
import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { UserService } from "./auth/services/user.service";

export function initAuth(userService: UserService) {
	return () => ( userService.getProfile() );
}

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideHttpClient(),
		{
			provide: APP_INITIALIZER,
			useFactory: initAuth,
			deps: [UserService],
			multi: true,
		},
	],
};
