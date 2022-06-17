import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html'
})
export class AppConfigComponent implements OnInit {

    componentThemes: any[];

    constructor(public layoutService: LayoutService) {}

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    get menuMode(): string {
        return this.layoutService.config.menuMode;
    }

    set menuMode(_val: string) {
        this.layoutService.config.menuMode = _val;
    }

    get colorScheme(): string {
        return this.layoutService.config.colorScheme;
    }

    set colorScheme(_val: string) {
        this.changeColorScheme(_val);
    }

    get inputStyle(): string {
        return this.layoutService.config.inputStyle;
    }

    set inputStyle(_val: string) {
        this.layoutService.config.inputStyle = _val;
    }

    get ripple(): boolean {
        return this.layoutService.config.ripple;
    }

    set ripple(_val: boolean) {
        this.layoutService.config.ripple = _val;
    }

    ngOnInit() {
        this.componentThemes = [
            {name: 'blue', color: '#3B82F6'},
            {name: 'indigo', color: '#6366F1'},
            {name: 'purple', color: '#8B5CF6'},
            {name: 'teal', color: '#14B8A6'}
        ];
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    changeColorScheme(colorScheme: string) {
        const themeLink = <HTMLLinkElement> document.getElementById('theme-link');
        const themeLinkHref = themeLink.getAttribute('href');
        const currentColorScheme = 'theme-' + this.layoutService.config.colorScheme;
        const newColorScheme = 'theme-' + colorScheme;
        const newHref = themeLinkHref.replace(currentColorScheme, newColorScheme);
        this.replaceThemeLink(newHref);
        this.layoutService.config.colorScheme = colorScheme;
    }

    changeTheme(theme: string) {
        const themeLink = <HTMLLinkElement> document.getElementById('theme-link');
        const newHref = themeLink.getAttribute('href').replace(this.layoutService.config.theme, theme);
        this.replaceThemeLink(newHref);
        this.layoutService.config.theme = theme;
    }

    replaceThemeLink(href: string) {
        const id = 'theme-link';
        const themeLink = <HTMLLinkElement> document.getElementById('theme-link');
        const cloneLinkElement = <HTMLLinkElement> themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode.insertBefore(cloneLinkElement, themeLink.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
        });
    }
}
