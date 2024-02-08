import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { ApiService } from "src/service/api.service";
import { CommonService } from "src/service/common.service";
import { ActionConstants, ConstantsService} from "src/service/constants.service";
import { CompanyStatusEnums, PermissionEnums } from "../constants/status-enum";
import { FilterTypeGeneric } from "./filetype-model";
import { TranslateService } from "@ngx-translate/core";

@Directive()
export abstract class LayoutModel implements OnDestroy {
  siteAnalyticsDataList: any[] = [];
  selectedFilterGeneric: FilterTypeGeneric = {};
  private pageStartTime: Date = new Date();
  private pageEndTime: Date = new Date();
  public timeSpentOnPage: number = 0;
  previousUrl: string = "";
  permission = { view: false, add: false, edit: false, delete: false };
  classRoot!: string;

  constructor(
    public router: Router,
    public consts: ConstantsService,
    public apiservice: ApiService,
    public common: CommonService,
    public translate: TranslateService
  ) {
    // this.getThemes();
    this.previousUrl = this.router.url;
    this.pageStartTime = new Date();
    this.selectedFilterGeneric.uuid = "11122";
    this.selectedFilterGeneric.companyuno = 1;
    //
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     if (this.shouldStopAndRedirect(event.url)) {
    //       // this.router.navigate(["/login"]);
    //     }
    //   }
    // });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToTop();
    }, 1000);
  }

  // getThemes() {
  //   this.common.getThemesObserv().subscribe((theme) => {


  //     this.classRoot = theme?.color;
  //   });
  // }

  // checkPermissionAllPage(pagename: string) {
  //   const allAllowed = this.common.checkPermissionAvailable(
  //     pagename,
  //     PermissionEnums.All
  //   );
  //   if (allAllowed) {
  //     this.permission.view = true;
  //     this.permission.add = true;
  //     this.permission.edit = true;
  //     this.permission.delete = true;
  //   } else {
  //     this.permission.view = this.common.checkPermissionAvailable(
  //       pagename,
  //       PermissionEnums.View
  //     );
  //     this.permission.add = this.common.checkPermissionAvailable(
  //       pagename,
  //       PermissionEnums.Add
  //     );
  //     this.permission.edit = this.common.checkPermissionAvailable(
  //       pagename,
  //       PermissionEnums.Edit
  //     );
  //     this.permission.delete = this.common.checkPermissionAvailable(
  //       pagename,
  //       PermissionEnums.Delete
  //     );
  //   }
  // }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // shouldStopAndRedirect(url: string): boolean {
  //   let loggedIn: boolean = false;
  //   const { useruno } = this.common.getUserDetails();
  //   if (useruno) {
  //     loggedIn = true;
  //   }
  //   return loggedIn;
  // }

  // siteAnalyticsData, call from abstract class
  siteAnalyticsData(payload: { action: string }) {
    let data = {
      action: payload.action,
      timespend: 10,
    };
    this.onSaveSiteAnalyticsData(data);
  }

  onSaveSiteAnalyticsData(payload: { action: string }) {
    this.pageEndTime = new Date();
    this.calculateTimeSpent();
    // const { device, isDesktop, isTablet, isMobile } = this.common;
    const { url } = this.router;
    let url1 = url;
    if (payload.action === ActionConstants.destroy) {
      url1 = this.previousUrl;
    }
    // let data = {
    //   // uuid: uuid,
    //   // companyuno: companyuno,
    //   pagename: this.common.allPagesDetails(url1.replace("/", ""))?.menu, //payload.pagename,
    //   action: payload.action,
    //   browser: device?.browser,
    //   language: this.translate.currentLang,
    //   timespend: this.timeSpentOnPage,
    // };
    // this.siteAnalyticsDataList.push(data);
  }

  ngOnDestroy() {
    // this.timerSubscription.unsubscribe();
    this.siteAnalyticsData({ action: ActionConstants.destroy });
    this.onSaveSiteAnalytics();
  }

  private calculateTimeSpent() {
    const diff = this.pageEndTime.getTime() - this.pageStartTime.getTime();
    this.timeSpentOnPage = Math.floor(diff / 1000); // Convert to seconds
  }

  onSaveSiteAnalytics() {
    this.saveSiteAnalytics();
  }

  saveSiteAnalytics() {
    // this.loading = true;
    const { uuid, companyuno } = this.selectedFilterGeneric;
    const data = {
      uuid: uuid,
      companyuno: companyuno,
      json: this.siteAnalyticsDataList,
    };
    const getLists = this.consts.saveSiteAnalytics;
    this.apiservice.post(getLists, data).subscribe((response: any) => {
      // this.loading = false;
      const dictionary = response;
      if (`${dictionary.responsecode}` === "1") {
        this.siteAnalyticsDataList = [];
      }
    });
  }
}
