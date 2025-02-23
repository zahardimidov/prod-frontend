import { HttpClient } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { LoginRequest, LoginResponse, RegisterRequest, UserResponse } from "../../../generated";
import { ApiService } from "../../core/services/api.service";
import { JwtService } from "./jwt";

@Injectable({
	providedIn: "root",
})
export class UserService {
	public currentUser = signal<UserResponse | null>(null);

	public isAuthenticated = computed(() => this.currentUser() !== null);

	public readonly validationTemplates: Record<string, any> = {
		email: {
			type: "string",
			min: undefined,
			max: undefined,
			schema: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
		},
		name: {
			type: "string",
			min: undefined,
			max: undefined,
			schema: undefined,
		},
		age: {
			type: "number",
			min: 1,
			max: 100,
			schema: undefined,
		},
		weight: {
			type: "number",
			min: 50,
			max: 200,
			schema: undefined,
		},
		height: {
			type: "number",
			min: 80,
			max: 200,
			schema: undefined,
		},
	};

	constructor(
		private readonly http: HttpClient,
		private readonly jwtService: JwtService,
		private router: Router,
		private api: ApiService,
	) {}

	async register(dto: RegisterRequest): Promise<LoginResponse | null> {
		try {
			await firstValueFrom(this.api.apiService.registerUserAuthRegisterPost(dto));
			const user_login = dto as LoginRequest;
			return await this.login(user_login);
		} catch (registerError: any) {
			throw registerError.error.detail;
		}
	}

	async login(dto: LoginRequest): Promise<LoginResponse | null> {
		try {
			const resp = await firstValueFrom(this.api.apiService.loginAuthLoginPost(dto));
			await this.setAuth(resp);
			return resp;
		} catch (loginError: any) {
			throw loginError.error.detail;
		}
	}

	async getProfile(): Promise<UserResponse> {
		try {
			if (!this.jwtService.checkTokenSetUp()) this.jwtService.setTokenToApi();
			const resp = await firstValueFrom(this.api.apiService.handlerUsersMeGet());
			await this.setAuthUser(resp);
			return resp;
		} catch (profileError: any) {
			this.purgeAuth();
			return profileError.error.detail;
		}
	}

	async logout() {
		this.purgeAuth();
	}

	async setAuthUser(user: UserResponse | string) {
		if (typeof user === "string") {
			this.purgeAuth();
			return;
		}
		this.currentUser.set(user);
	}

	async setAuth(user: LoginResponse) {
		this.jwtService.saveToken(user.access_token);
		await this.getProfile();
	}

	purgeAuth() {
		this.jwtService.destroyToken();
		this.currentUser.set(null);
	}
}
