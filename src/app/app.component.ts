import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  ViewChild,
  HostListener,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Direction } from '@angular/cdk/bidi';
import { CommonService } from 'src/service/common.service';
import { MatDrawer } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core'; //vincy
import { Keepalive } from '@ng-idle/keepalive';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { GlossaryService } from 'src/service/glossary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  idleState = 'NOT_STARTED'; //
  countdown?: number;
  lastPing?: Date;
  userwasIdle: boolean = false;
  @ViewChild('drawer') drawer!: MatDrawer;
  userprofile: any;
  @HostBinding('class') classRoot = 'theme-default';
  userloggedin: boolean = false;
  lcauserloggedin: boolean = false;
  username: string = '';
  companyname: string = '';
  copyrightyear: string = '';
  version = environment.appdetails.version;
  idle_timeout = environment.appdetails.idletime_out;
  session_timeout = environment.appdetails.session_timeout;
  selectedlanguage: string = '';
  selectedpalette: string = '';

  title = 'uaemofa';
  overlayContainer: any;

  fontSize = 'sm';

  toggle(size: string) {
    this.fontSize = size;
  }

  resolved(captchaResponse: string) {
    // console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  preventCloseOnClickOut() {
    this.overlayContainer
      .getContainerElement()
      .classList.add('disable-backdrop-click');
  }

  allowCloseOnClickOut() {
    this.overlayContainer
      .getContainerElement()
      .classList.remove('disable-backdrop-click');
  }

  topmenu01: boolean = false;
  topmenu02: boolean = false;
  clickEvent() {
    this.topmenu01 = !this.topmenu01;
    this.topmenu02 = !this.topmenu02;
  }

  toggleChange(event: { source: any; value: any[] }) {
    let toggle = event.source;
    if (toggle) {
      let group = toggle.buttonToggleGroup;
      if (event.value.some((item) => item == toggle.value)) {
        group.value = [toggle.value];
      }
    }
  }

  showToggle = false;
  currentLanguageDirection!: Direction | 'auto';
  bigScreen = false;

  role: any;

  ngOnInit(): void {
    // this.getcopyright();
    // console.log(this.userloggedin);
    // console.log(this.lcauserloggedin);

    this.reset();
    this.bigScreen = window.innerWidth > 786;
    window.addEventListener('resize', (event) => {
      this.bigScreen = window.innerWidth > 786;
    });
  }

  onToggle() {
    this.showToggle = !this.showToggle;
    this.toggleDrawer();
  }

  toggleDrawer(): void {
    if (this.drawer) {
      this.drawer.toggle();
      const dataObj: { key: string; value: object } = {
        key: 'drawer_scrolltoactive',
        value: {},
      };
      const dataObjStr = JSON.stringify(dataObj);
      this.common.setData(dataObjStr);
    }
  }

  toggleCloseDrawer(): void {
    if (this.drawer) {
      this.drawer.close();
    }
  }

  // toggleDrawer(): void {
  //   this.drawer.toggle();
  // }
  userrole: string = '';
  role2: string = '';
  showHead: boolean = false;
  private userRoleSubscription!: Subscription;
  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
    private router: Router,
    private translate: TranslateService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public common: CommonService,
    private idle: Idle,
    keepalive: Keepalive,
    private gloss: GlossaryService,
    cd: ChangeDetectorRef //vincy
  ) {
    let role2 = this.auth.getLCAUser();
    this.role2 = role2;
    // console.log(role2);

    let role = this.auth.userRole;
    if (!role) {
      this.userRoleSubscription = this.auth.userRole$.subscribe(() => {
        // this.getMenuItemLists();
        const userRole = this.auth.userRole;
        this.userrole = userRole;
        this.role2 = this.userrole;
        // console.log(userRole);
      });
    } else {
      this.userrole = role;
    }
    // if (this.userloggedin || this.lcauserloggedin) {
    idle.setIdle(30000); // how long can they be inactive before considered idle, in seconds 1200
    idle.setTimeout(30000); // how long can they be idle before considered timed out, in seconds 600
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleStart.subscribe(() => {
      if (this.userloggedin || this.lcauserloggedin) {
        this.idleState = 'IDLE';
        // $('.modal').modal('hide');
        // console.log(
        //   'User is now idle. Logout will occur after ' +
        //     idle.getTimeout() +
        //     ' seconds of inactivity.'
        // );
        this.closeAllModals();
        // console.log('popup has to appear now');
        this.userwasIdle = true;
        //this.common.showSuccessMessage("popup has to appear now");
      }
    });
    // do something when the user is no longer idle

    idle.onTimeoutWarning.subscribe(
      (countdown) =>
        (this.idleState = 'You will time out in ' + countdown + ' seconds!')
    );

    idle.onIdleEnd.subscribe(() => {
      // this.userwasIdle = false;
      if (!this.userwasIdle) {
        this.idleState = 'NOT_IDLE';
        // console.log(`User is no longer idle. Last activity at ${new Date()}.`);

        // console.log(`${this.idleState} ${new Date()}`);
        this.countdown = 0;
      }
      cd.detectChanges(); // how do i avoid this kludge?
    });
    // do something when the user has timed out
    idle.onTimeout.subscribe(() => {
      if (this.userloggedin || this.lcauserloggedin) {
        this.userwasIdle = false;
        this.idleState = 'TIMED_OUT';
        // console.log('session timeout');

        this.common.showWarningMessage('session timeout');
        this.userloggedin = false;
        this.lcauserloggedin = false;
        this.common.setlogoutreason('session');
        this.auth.logout();

        //not clearing session here
        //  window.location.reload();
      }
    });
    // do something as the timeout countdown does its thing
    idle.onTimeoutWarning.subscribe((seconds) => (this.countdown = seconds));

    // set keepalive parameters, omit if not using keepalive
    keepalive.interval(15); // will ping at this interval while not idle, in seconds
    keepalive.onPing.subscribe(() => (this.lastPing = new Date())); // do something when it pings

    // start the keepalive service

    this.reset();
    // }

    iconRegistry.addSvgIcon(
      'profile-dropdownarrow-icon',
      sanitizer.bypassSecurityTrustResourceUrl(
        './assets/svg/profil-dropdown-arrow.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'main-menu-arrow-down-icon',
      sanitizer.bypassSecurityTrustResourceUrl(
        './assets/svg/main-menu-arrow-down.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'menu-icon',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/menu-icon.svg')
    );
    iconRegistry.addSvgIcon(
      'text-size-icon',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/text-size.svg')
    );
    //added by 25102023
    iconRegistry.addSvgIcon(
      'vex_icon',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/unfold.svg')
    );
    //added by 25102023
    iconRegistry.addSvgIcon(
      'company_switch',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/v_cozy.svg')
    );
    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if ((event['url'] == '/login', '/approvestatus')) {
          this.showHead = false;
        } else {
          // console.log("NU")
          this.showHead = true;
        }
      }
    });

    this.selectedlanguage = sessionStorage.getItem('language') || '';
    this.selectedpalette = sessionStorage.getItem('Palette') || '';
    if (this.selectedpalette === '') {
      this.classRoot = 'theme-default';
    } else {
      this.classRoot = this.selectedpalette;
    }

    if (this.selectedlanguage === '') {
      translate.addLangs(['en', 'ar']);
      translate.setDefaultLang('en');
    } else {
      if (this.selectedlanguage === 'ar') {
        translate.setDefaultLang('ar');
        this.currentLanguageDirection = 'rtl';
      } else {
        translate.setDefaultLang('en');
        this.currentLanguageDirection = 'ltr';
      }
    }
    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'ar' || event.lang === 'he') {
        this.currentLanguageDirection = 'rtl';
      } else {
        this.currentLanguageDirection = 'ltr';
      }
    });

    //added Nov 08
    this.auth.userloggedin$.subscribe((loggedIn) => {
      this.userloggedin = loggedIn;
    });

    this.auth.lcauserloggedin$.subscribe((lcaloggedIn) => {
      this.lcauserloggedin = lcaloggedIn;
    });
  }

  useLanguage(language: string) {
    sessionStorage.setItem('language', language);
    this.selectedlanguage = language;
    this.translate.use(language);
    this.gloss.setLanguage(language);
  }

  usePalette(palette: string) {
    sessionStorage.setItem('Palette', palette);
    this.selectedpalette = palette;
    this.classRoot = palette;
    // this.translate.use(language);
  }

  goToHome() {
    this.router.navigate(['/shared/']); // Replace '/home' with the desired URL
    window.location.reload();
  }

  closeDrawer(drawer: MatDrawer) {
    // console.log('in app component after drawer change');
    drawer.close();
  }

  reset() {
    // we'll call this method when we want to start/reset the idle process
    // reset any component state and be sure to call idle.watch()
    if (this.userloggedin || this.lcauserloggedin) {
      if (!this.userwasIdle) {
        // console.log('reset');
        this.userwasIdle = false;
        this.idle.watch();
        this.idleState = 'NOT_IDLE';
        this.countdown = 0;
        this.lastPing;
      }
    }
  }

  resetfromhtml() {
    // we'll call this method when we want to start/reset the idle process
    // reset any component state and be sure to call idle.watch()
    // if (this.userloggedin || this.lcauserloggedin) {
    // if(!this.userwasIdle){
    // console.log('reset');
    this.userwasIdle = false;
    this.idle.watch();
    this.idleState = 'NOT_IDLE';
    this.countdown = 0;
    this.lastPing;

    // }
    // }
  }

  logout() {
    sessionStorage.clear();
    this.common.setlogoutreason('manuallogout');
    this.auth.logout();
  }
  @HostListener('mouseover') onMouseOver() {
    // Call your reset method when the mouse is over
    // console.log('reset');
    this.reset();
  }

  closeAllModals() {
    this.dialog.closeAll();
  }

  // getcopyright(){
  //  this.copyrightyear= this.common.getMyCopyrightYear()

  //  if(!this.copyrightyear){
  //   this.copyrightyear = environment.appdetails.year;
  //  }
  //  //  copyrightyear = environment.appdetails.year;
  // }
}
// function useLanguage(language: any, string: any) {
//   throw new Error('Function not implemented.');
// }
