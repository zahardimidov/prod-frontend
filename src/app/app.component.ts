import { Component, computed, OnDestroy } from "@angular/core";
import { NavigationEnd, Router, RouterEvent, RouterOutlet } from "@angular/router";
import { filter, Subscription } from "rxjs";
import { UserService } from "./auth/services/user.service";
import { HeaderComponent } from "./core/components/header.component";
import { SlideBarComponent } from "./core/components/slide-bar.component";

@Component({
	selector: "app-root",
	imports: [
		RouterOutlet,
		HeaderComponent,
		SlideBarComponent,
	],
	template: `
        <div class="container">
            @if (userService.isAuthenticated()) {
                <HeaderComp/>
            }
            <div class="content">
                @if (userService.isAuthenticated()) {
                    <SlideBar/>
                }
                <div [style.height]="(userService.isAuthenticated()) ? 'calc(100vh - var(--header-height)' : '100vh'" class="scroll-container">
                    <div class="scroll-content">
                        <router-outlet/>
                    </div>
                </div>
            </div>
        </div>
	`,
	styles: `
        .container {
            width:          100vw;
            min-height:     100vh;
            position:       relative;
            display:        flex;
            flex-direction: column;
            gap:            0;

            .content {
                width:          100%;
                height:         calc(100vh - var(--header-height));
                display:        flex;
                flex-direction: row;
                gap:            0;
            }

            .scroll-container {
                width:          100%;
                display:        flex;
                flex-direction: column;
                align-items:    center;
                position:       relative;

                .scroll-content {
                    max-width:  1100px;
                    padding:    24px;
                    width:      100%;
                    height:     100%;
                    overflow-y: scroll;
                }
            }
        }
	`,
})
export class AppComponent implements OnDestroy {
	private routerSubscription: Subscription;

	constructor(
		private router: Router,
		public userService: UserService,
	) {
		this.routerSubscription = this.router.events
			.pipe(filter((e) => e instanceof NavigationEnd))
			.subscribe((ev: RouterEvent) => {});
	}

	ngOnDestroy() {
		this.routerSubscription.unsubscribe();
	}
}
