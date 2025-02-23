import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SideBarInteractionService } from "../services/side-bar-interaction.service";

@Component({
    selector: 'HeaderComp',
    imports: [
        RouterLink,
    ],
    styles: `
        .container {
            display:         flex;
            flex-direction:  row;
            justify-content: space-between;
            width:           100%;
            height:          var(--header-height);
            background:      var(--background-header);
            border-bottom:   1px solid var(--border-header);
            align-items:     center;
            padding:         0 32px;
        }

        .logo {
            font-family:    var(--ff-poppins), sans-serif;
            font-size:      40px;
            margin-top:     5px;
            line-height:    30px;
            letter-spacing: 1px;
            font-weight:    500;
            text-align:     center;
            cursor: pointer;
        }

        .group {
            display:        flex;
            flex-direction: row;
            gap:            10px;
            align-items:    center;

            svg {
                width:  25px;
                height: 25px;
                cursor: pointer;
            }

            img {
                width:         32px;
                height:        32px;
                border-radius: 50%;
                -o-object-fit: cover;
                object-fit:    cover;
                border:        2px solid var(--neutral-0);
                margin-left:   22px;
                cursor:        pointer;
            }
        }

        .hamburger {
            --size:             30px;
            --hamburger-height: 3px;
            --hamburger-gap:    5px;
            width:              var(--size);
            height:             var(--size);
            flex-direction:     column;
            align-items:        center;
            justify-content:    center;
            gap:                var(--hamburger-gap);
            cursor:             pointer;
            display:            none;

            @media screen and (max-width: 1000px) {
                display: flex;
            }

            .line {
                width:               var(--size);
                height:              var(--hamburger-height);
                border-radius:       var(--br-100);
                background:          var(--neutral-0);
                transition-duration: .3s;
            }
        }
	`,
    template: `
        <div class="container">
            <div style="gap: 20px;" class="group">
                <div (click)="interactSideBar()" class="hamburger">
                    <div class="line" #line></div>
                    <div class="line" #line></div>
                    <div class="line" #line></div>
                </div>
                <a routerLink="/home" class="logo">Спортик</a>
            </div>
            <div class="group">
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell">
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"></path>
                </svg>
                <img routerLink="/profile" class="profile-img" src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80" alt="">
            </div>
        </div>
    `,
})
export class HeaderComponent {
    @ViewChildren('line') hamburgerLines!: QueryList<ElementRef<HTMLDivElement>>;

    constructor(
        private sideBarInteractionService: SideBarInteractionService,
    ) {
        this.sideBarInteractionService.state.subscribe(state => {
            if (state) this.open();
            else this.close();
        })
    }

    open() {
        if (this.hamburgerLines === undefined) return;
        const line1 = this.hamburgerLines.get(0)?.nativeElement!;
        const line2 = this.hamburgerLines.get(1)?.nativeElement!;
        const line3 = this.hamburgerLines.get(2)?.nativeElement!;

        line2.style.width = '0';
        line1.style.transform = 'translateY(calc(var(--hamburger-gap) + var(--hamburger-height))) rotate(45deg)';
        line3.style.transform = 'translateY(calc(-1 * (var(--hamburger-gap) + var(--hamburger-height)))) rotate(-45deg)';
    }

    close() {
        if (this.hamburgerLines === undefined) return;
        const line1 = this.hamburgerLines.get(0)?.nativeElement!;
        const line2 = this.hamburgerLines.get(1)?.nativeElement!;
        const line3 = this.hamburgerLines.get(2)?.nativeElement!;

        line2.style.width = 'var(--size)';
        line1.style.transform = 'translateY(0) rotate(0)';
        line3.style.transform = 'translateY(0) rotate(0)';
    }

    interactSideBar() {
        const state = this.sideBarInteractionService.state.value;
        if (state) this.sideBarInteractionService.close();
        else this.sideBarInteractionService.open();
    }
}
