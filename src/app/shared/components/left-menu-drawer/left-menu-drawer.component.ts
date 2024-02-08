import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { CommonService } from 'src/service/common.service';
import { EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/service/auth.service';

interface MenuModel {
  role:string;
  id: number;
  menu: string;
  icon: string;
  link?: string;
  hasubMenu: boolean;
  subMenus?: {
    id: number;
    menu: string;
    icon: string;
    link?: string;
    param?: string;
  }[];
}

@Component({
  selector: 'app-left-menu-drawer',
  templateUrl: './left-menu-drawer.component.html',
  styleUrls: ['./left-menu-drawer.component.css'],
})
export class LeftMenuDrawerComponent implements OnInit {
  currentlyExpandedIndex: number = -1;

  @Output() submenuClicked: EventEmitter<void> = new EventEmitter<void>();
  selectedMenuIndex: number = -1; // Initialize with an invalid index
  selectedMenu: MenuModel = {} as MenuModel;
  recentlyusedList: MenuModel[] = [];

  username: any;
  companyname: any;
  rolename:string='';
  usertype: string = '';
  isAdmin: boolean = false;
  menuList: MenuModel[] = [];
  companyprofile:any;
  @ViewChild('myPanel') myPanel!: MatExpansionPanel;
  private userRoleSubscription!: Subscription;
  constructor(
    private router: Router,
    public common: CommonService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.common.getData().subscribe((data) => {
      // if (data && data != '') {
      //   const dataObj: { key: string; value: object } = JSON.parse(data);
      //   if (dataObj.key === 'drawer_scrolltoactive') {
      //     setTimeout(() => {
      //       // this.scrollToTarget();
      //       this.stylingMenus();
      //     }, 1000);
      //   }
      // }

      if (data && typeof data === 'string') {
        try {
            const dataObj: { key: string; value: object } = JSON.parse(data);
    
            if (dataObj.key === 'drawer_scrolltoactive') {
                setTimeout(() => {
                    // this.scrollToTarget();
                    this.stylingMenus();
                }, 1000);
            }
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            console.error('Invalid JSON format. Unable to parse the data:', data);
    
            // You might want to consider providing a default value for dataObj or any other appropriate fallback
            // const dataObj: { key: string; value: object } = { key: 'defaultKey', value: {} };
        }
    }

    

    });
    //start of LCA user user flow
    this.userRoleSubscription = this.auth.userRole$.subscribe(() => {
      this.setusername();
      this.getMenuItemLists();
    });
    this.setusername();
    let usertype = this.auth.getLCAUser() || '';
    if (usertype == '' || usertype == null) {
      this.common.userType$.subscribe((usertype_) => {
        this.usertype = usertype_;
        console.log(this.usertype);
        this.setusername();
      });
    } else {
      this.usertype = usertype;
      this.getMenuItemLists();
    }
    //end of LCA user user flow

    if (usertype == '11' || usertype == '12') {
    } else {
      this.auth.userCompanyProfile$.subscribe((loggedIn) => {
        this.companyprofile=loggedIn
        console.log(this.companyprofile);
        this.companyname = this.companyprofile?.nameofbusiness;
        this.rolename=this.companyprofile?.rolename;
        this.setusername();
      });

      //this is not getting updated during page load
      let companyname2 = this.auth.getSelectedCompany() || '';
      console.log(companyname2)
      if(companyname2){
      let companyname1=(companyname2);

        console.log(companyname1);
        this.companyname = companyname1?.business_name || '';
        this.rolename=companyname1?.role;
      }
      this.auth.isAdmin$.subscribe((isAdmin_) => {
      console.log('company switched!!')
        this.isAdmin = isAdmin_;
        if (this.usertype == '11' || this.usertype == '12') {
        } else {
          this.getMenuItemLists();
        }
        console.log(this.isAdmin);
      });
    }
  }

  getMenuItemLists() {
    this.menuList = [];
   


    console.log(this.usertype);

    const userRole = this.auth.userRole;

    if (userRole) {
      this.usertype = userRole;
    }
    console.log(userRole);

    if (this.usertype == '11' || this.usertype == '12') {
      console.log('menu for LCA Admin is loading');

      this.menuList.push(
        {
          role:'All',
          id: 1,
          menu: 'Dashboard',
          icon: 'dashboard',
          link: '/lca-login/lcadashboard',
          hasubMenu: false,
        },
        {
          role:'All',
          id: 2,
          menu: 'Attestations',
          hasubMenu: true,
          icon: 'feed',
          subMenus: [
            {
              id: 1,
              menu: 'Import',
              icon: 'play_arrow',
              link: '/lca-login/importslca',
            }, //vincy check here
            {
              id: 2,
              menu: 'Pending',
              icon: 'play_arrow',
              link: '/lca-login/pendinglca',
            },
            {
              id: 3,
              menu: 'Completed',
              icon: 'play_arrow',
              link: '/lca-login/completedlca',
            },
            {
              id: 4,
              menu: 'In Risk',
              icon: 'play_arrow',
              link: '/lca-login/risklca',
            },
          ],
        },
        {
          role:'All',
          id: 3,
          menu: 'Reports',
          hasubMenu: true,
          icon: 'assessment',
          subMenus: [
            {
              id: 1,
              menu: 'Settlement',
              icon: 'play_arrow',
              link: '/reports/lcasettlementsreport',
            },
          ],
        }
      );
    } else {

      let def,accessprofile;
      let abc=this.auth.getmycompanyprofile() || '';
      if(abc){
         def=JSON.parse(abc);
        console.log(abc);
    
         accessprofile=def.accessprofiles;
      }
      else{
        return;
      }
      
      const accessprofiles = accessprofile.split(',').map((profile:any) => profile.trim().toLowerCase());
  
      //

      const roleBasedMenuItems = [
        {
          role:'All',
          id: 1,
          menu: 'Dashboard',
          icon: 'dashboard',
          link: '/shared',
          hasubMenu: false,
        }
        ,
        {
          role:'All',
          id: 4,
          menu: 'Company Profile',
          icon: 'settings',
          link: 'shared/companyprofile',
          hasubMenu: false,
        } ,
        {
          role:'All',
          id: 4,
          menu: 'Glossary',
          icon: 'psychology_alt',
          link: 'shared/glossary',
          hasubMenu: false,
        },
        {
          role:'LCA',
          id: 1,
          menu: 'Attestation',
          icon: 'event_note',
          hasubMenu: true,
          subMenus: [
            {
              id: 1,
              menu: 'Pending',
              icon: 'play_arrow',
              link: '/lca/attestation',
            },
            {
              id: 2,
              menu: 'Completed',
              icon: 'play_arrow',
              link: '/lca/lcacompletedattestation',
              param: 'true',
            },
            // {
            //   id: 3,
            //   menu: 'In process',
            //   icon: 'play_arrow',
            //   link: '/lca/lcainprocess',
            //   param: 'true',
            // },
            {
              id: 4,
              menu: 'In Risk',
              icon: 'play_arrow',
              link: '/lca/lcainhold',
              param: 'true',
            },
          ],
        },
        {
          role:'COO',
          id: 1,
          menu: 'COO Attestation',
          hasubMenu: true,
          icon: 'travel_explore',
          subMenus: [
            {
              id: 1,
              menu: 'Pending',
              icon: 'play_arrow',
              link: '/coo/cooattestation',
            },
            {
              id: 3,
              menu: 'Completed',
              icon: 'play_arrow',
              link: '/coo/CompletedCooRequest',
            },
          ],
        },
        {
          role:'Physical',
          id: 1,
          menu: 'Physical Attestation',
          hasubMenu: true,
          icon: 'save_as',
          subMenus: [
            {
              id: 1,
              menu: 'Pending',
              icon: 'play_arrow',
              link: '/physical/physicalattestation',
            },
            {
              id: 3,
              menu: 'Completed',
              icon: 'play_arrow',
              link: '/physical/completedattestation',
            },
          ],
        },
        {
          role:'All',
          id: 1,
          menu: 'Reports',
          hasubMenu: true,
          icon: 'feed',
          subMenus: [
            { id: 1, menu: 'LCA', icon: 'play_arrow', link: '/reports/rptpendinglca' },
            { id: 2, menu: 'COO', icon: 'play_arrow', link: '/reports/rptpendingcoo' },
            { id: 3, menu: 'Physical',icon: 'play_arrow', link: '/reports/rptpendingphysical' },
            { id: 4, menu: 'Fines', icon: 'play_arrow',link: '/reports/rptfines',},
            { id: 5, menu: 'Region-wise Import', icon: 'play_arrow',link: '/reports/rptregionwiseimport',},
            { id: 5, menu: 'Analytics', icon: 'play_arrow',link: '/reports/rptanalytics',},

          ],
        }
      ];

      if (this.isAdmin) {
        this.menuList.push(...roleBasedMenuItems)
        this.menuList.push(
          {
          role:'All',
          id: 3,
          menu: 'My Team',
          icon: 'supervisor_account',
          link: 'shared/userslist',
          hasubMenu: false,
        }
       
        );
      } else {
//push menu based on user role
                const filteredMenuItems: MenuModel[] = roleBasedMenuItems.map(menuItem => {
                  if (menuItem.role.toLowerCase() === 'all' || accessprofiles.includes(menuItem.role.toLowerCase())) {
                    if (menuItem.menu.toLowerCase() === 'reports' && menuItem.hasubMenu && menuItem.subMenus) {
                      // If the menu is 'Reports', filter sub-menus based on accessprofiles
                      menuItem.subMenus = menuItem.subMenus.filter(subMenu => {
                        const subMenuName = subMenu.menu.toLowerCase();
                        return accessprofiles.includes(subMenuName) || (subMenuName === 'fines' || subMenuName === 'region-wise import');
                      });
                    }
                    return menuItem;
                  }
                  return null; // Exclude menu if the user doesn't have access
                }).filter(Boolean) as MenuModel[];

                this.menuList.push(...filteredMenuItems);
//end
        const switchCompanyIndex = this.menuList.findIndex(
          (item) => item.id === 3
        );

        if (switchCompanyIndex !== -1) {
          this.menuList.splice(switchCompanyIndex, 1);
        }
      }
// for pay all menu
      this.common.payallcount$.subscribe((payallcountv) => {
        console.log('company switched!!')
          // this.isAdmin = isAdmin_;

          console.log(payallcountv);
          if (this.usertype == '11' || this.usertype == '12') {
          } else {
            if(payallcountv && payallcountv<100){  
              this.addpayallinmenu();
            }
          }
        });
// pay all menu with session
        let payallcountfromsession=this.common.getpayallcount() ||'0';
        if(parseInt(payallcountfromsession) && parseInt(payallcountfromsession)<100 ){
          this.addpayallinmenu();
        }
    
    }
  }
  addpayallinmenu(){
     const isPayAllAlreadyAdded = this.menuList.some(item => item.id === 6);
              if (!isPayAllAlreadyAdded) {
              this.menuList.push(
                {
                  role:'All',
                  id: 6,
                  menu: 'Pay All',
                  icon: 'checklist',
                  link: 'shared/payall',
                  hasubMenu: false,
                }
                );
              }
  }

  onPanelClick(items: any) {
    // items.hasSubMenus = items.subMenus && items.subMenus.length > 0;
    if (items.link) {
      this.router.navigate([items.link]);
      this.myPanel.close();
    }
    // mat-list-item
    this.selectedMenu = items;
    this.stylingMenus();
  }

  handleRouteChange(): void {
    const url = this.router.url;
    const foundMenu: { parent: MenuModel; child: MenuModel } =
      this.findMenuByUrl(url);

    if (foundMenu) {
      this.currentlyExpandedIndex = this.menuList.indexOf(foundMenu.parent);
      // mat-list-item
      this.selectedMenu = foundMenu.child;
      this.stylingMenus();
    }
  }

  findMenuByUrl(url: string): any {
    for (const item of this.menuList) {
      if (
        item.link === url ||
        (item.subMenus && item.subMenus.some((subMenu) => subMenu.link === url))
      ) {
        let childmenu = item.subMenus?.find((itm) => itm.link === url);
        return { parent: item, child: childmenu };
      }
    }

    return null;
  }

  stylingMenus() {
    this.recentlyUsedMenus(this.selectedMenu);
    //
    const elements2 = document.getElementsByClassName(
      'mat-list-item-content active'
    );
    let elementsArray2 = Array.from(elements2);
    for (const element of elementsArray2) {
      element.className = 'mat-list-item-content';
    }

    //
    const elements = document.getElementsByClassName('mat-items');
    const elementsActive = document.getElementsByClassName(
      this.selectedMenu.link ? this.selectedMenu.link : ''
    );
    let elementsArray = Array.from(elements);
    for (const element of elementsArray) {
      const childDiv = element.querySelector('span');
      if (childDiv) {
        childDiv.className = 'mat-list-item-content';
      }
    }
    elementsArray = Array.from(elementsActive);
    if (!this.selectedMenu?.subMenus) {
      for (const element of elementsArray) {
        const childDiv = element.querySelector('span');
        if (childDiv) {
          if (childDiv.className == 'mat-list-item-content active') {
            childDiv.className = 'mat-list-item-content';
          } else {
            childDiv.className = 'mat-list-item-content active';
          }
          // lement.firstChild.className = element.firstChild.className + ' active';
        }
      }
    }
  }

  recentlyUsedMenus(selectedMenu: MenuModel) {
    let results = this.recentlyusedList;
    const menu = results.find((m) => m.link === selectedMenu.link);
    if (!menu?.link && !selectedMenu?.subMenus) {
      results.push(selectedMenu);
    }
    results = results.slice(-5);
    this.recentlyusedList = results;
  }

  onSubMenuClick(items: any, i?: any) {
    this.selectedMenuIndex = i;
    console.log('in parent component after drawer change');

    this.submenuClicked.emit();
    if (items.link) {
      this.router.navigate([items.link]);
      this.myPanel.close();
    }
    // mat-list-item
    this.selectedMenu = items;
    this.stylingMenus();
  }

  setSelectedMenuIndex(index: number): void {
    this.selectedMenuIndex = index;
  }

  calculateLinePosition(): string {
    // Calculate the position based on the selected menu index
    const lineHeight = 48; // Adjust this value based on your menu item height
    const topPosition =
      this.selectedMenuIndex !== -1
        ? `${this.selectedMenuIndex * lineHeight}px`
        : '0';
    return topPosition;
  }

  onMainPanelClick(index: number): void {
    this.currentlyExpandedIndex =
      this.currentlyExpandedIndex === index ? -1 : index;
  }

  setusername() {
    console.log('calling set user name');
    let data = this.common.getUserProfile();
    if (data != undefined || data != null) {
      let abc = JSON.parse(data);
      console.log(JSON.parse(data));
      this.username = abc.Data.firstnameEN;
    }
  }
  redirectuserprofile(){
    this.router.navigateByUrl('/shared/userprofile');
  }
}
