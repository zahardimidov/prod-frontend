import { Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import { RouterLink } from '@angular/router';
import { Subscription } from "rxjs";
import { SideBarInteractionService } from "../services/side-bar-interaction.service";

@Component({
	selector: "SlideBar",
    imports: [
        RouterLink,
    ],
	styles: `
        .container {
            display:      flex;
            width:        var(--slide-bar-max);
            height:       calc(100vh - var(--header-height));
            max-width:    var(--slide-bar-max);
            background:   var(--background-header);
            border-right: 1px solid var(--border-header);
            overflow-x:   hidden;
            overflow-y:   scroll;

            @media screen and (max-width: 1000px) {
                display:             none;
                position:            absolute;
                top:                 var(--header-height);
                left:                0;
                transform:           translateX(-100%);
                transition-duration: .3s;
                z-index:             1000;
            }

            .content {
                width:          100%;
                display:        flex;
                flex-direction: column;
                gap:            20px;
                padding:        24px 16px;
            }

            .group {
                width:          100%;
                display:        flex;
                flex-direction: column;

                .header {
                    color:         var(--neutral-40);
                    margin-bottom: 14px;
                    font-size:     20px;
                    font-weight:   500;
                }

                .item {
                    text-decoration:  none;
                    color:            var(--text-primary);
                    display:          flex;
                    align-items:      center;
                    font-weight:      400;
                    padding:          10px;
                    font-size:        14px;
                    border-radius:    6px;
                    transition:       0.3s;
                    background-color: transparent;
                    cursor:           pointer;

                    &:hover {
                        background-color: var(--background-neutral);
                    }

                    svg {
                        width:        16px;
                        margin-right: 8px;
                    }

                    @media screen and (min-width: 1000px) {
                        font-size: 19px;
                        svg {
                            width:        19px;
                            margin-right: 10px;
                        }
                    }
                }
            }
        }

        .background {
            position:        absolute;
            top:             var(--header-height);
            left:            0;
            z-index:         999;
            background:      rgba(0, 0, 0, .3);
            backdrop-filter: blur(6px);
            width:           100vw;
            height:          calc(100vh - var(--header-height));
            opacity:         0;
            display:         none;
        }
    `,
	template: `
        <div class="container" #container>
            <div class="content">
                <div class="group">
                    <p class="header">Основное</p>

                    <a routerLink="/home" class="item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-home">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 12l-2 0l9 -9l9 9l-2 0"/>
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/>
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/>
                        </svg>
                        Главная
                    </a>
                    <a routerLink="/community" class="item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-users">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/>
                            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"/>
                        </svg>
                        Комьюнити
                    </a>
                    <a routerLink="/training/all" class="item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10 3a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"/>
                            <path d="M3 14l4 1l.5 -.5"/>
                            <path d="M12 18v-3l-3 -2.923l.75 -5.077"/>
                            <path d="M6 10v-2l4 -1l2.5 2.5l2.5 .5"/>
                            <path d="M21 22a1 1 0 0 0 -1 -1h-16a1 1 0 0 0 -1 1"/>
                            <path d="M18 21l1 -11l2 -1"/>
                        </svg>
                        Тренировки
                    </a>
                    <a routerLink="/workout/all" class="item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M16 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/>
                            <path d="M5 20l5 -.5l1 -2"/>
                            <path d="M18 20v-5h-5.5l2.5 -6.5l-5.5 1l1.5 2"/>
                        </svg>
                        Упражнения
                    </a>
                </div>

                <div class="group">
                    <p class="header">Создать</p>
                    <a routerLink="/create" class="item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 4h6v6h-6zm10 0h6v6h-6zm-10 10h6v6h-6zm10 3h6m-3 -3v6"/>
                        </svg>
                        Создать
                    </a>
                </div>

                <div class="group">
                    <p class="header">Профиль</p>

                    <a routerLink="/shop" class="item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z"/>
                            <path d="M9 11v-5a3 3 0 0 1 6 0v5"/>
                        </svg>
                        Магазин
                    </a>
                    <a routerLink="/profile/progress" class="item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M3 17l6 -6l4 4l8 -8"/>
                            <path d="M14 7l7 0l0 7"/>
                        </svg>
                        Прогресс
                    </a>
                </div>
            </div>
        </div>
        <div class="background" #background></div>
	`,
})
export class SlideBarComponent implements OnDestroy {
    @ViewChild('container') container!: ElementRef<HTMLDivElement>;
    @ViewChild('background') background!: ElementRef<HTMLDivElement>;

	private topBarInteractionSubscription: Subscription;

	constructor(
		private topBarInteractionService: SideBarInteractionService,
	) {
		this.topBarInteractionSubscription = this.topBarInteractionService.state.subscribe(state => {
            if (window.innerWidth >= 1000) return;
			if (state) this.open();
			else this.close();
		});
	}

	ngOnDestroy() {
		this.topBarInteractionSubscription.unsubscribe();
	}

	open() {
        if (this.container === undefined) return;
        const container = this.container.nativeElement;
        const background = this.background.nativeElement;
        container.style.display = 'flex';
        background.style.display = 'flex';
        setTimeout(() => {
            container.style.transform = 'translateX(0)';
            background.style.opacity = '1';
        }, 100);
	}

	close() {
        if (this.container === undefined) return;
        const container = this.container.nativeElement;
        const background = this.background.nativeElement;
        container.style.transform = 'translateX(-100%)';
        background.style.opacity = '0';
        setTimeout(() => {
            container.style.display = 'none';
            background.style.display = 'none';
        }, 300);
    }
}
