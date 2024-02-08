import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/service/common.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import {
  ConstantsService,
  ActionConstants,
} from 'src/service/constants.service';

// import {
//   ActionConstants,
//   ConstantsService,
// } from "src/app/services/constants.service";
import { ApiService } from 'src/service/api.service';
// import { ModalPopupService } from "src/app/services/modal-popup.service";
import { TranslateService } from '@ngx-translate/core';
import { EChartsOption } from 'echarts';
import { LayoutModel } from 'src/app/shared/models/layout-model';
import { CompanyStatusEnums } from 'src/app/shared/constants/status-enum';
import { FilterTypeCompany } from 'src/app/shared/models/filetype-model';
import { MatSelect } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent extends LayoutModel implements OnInit {
  isLoading: boolean = false;
  progress_val: number = 0;
  totalrecords: number = 0;
  statisticsLists: any = {};
  statisticsDailyListsFilter: any[] = [];
  statisticsWeeklyListsFilter: any[] = [];
  statisticsMonthlyListsFilter: any[] = [];
  statisticsData: any = {};
  currentDate: Date = new Date();
  currentDateStr: string = '2023-10-02T00:00:00'; // (new Date()).toDateString();
  routesname: 'pending' | 'approve' = 'pending';
  routesurl: string = '';
  loading: boolean = false;
  selectedFilterOption: FilterTypeCompany = {
    id: CompanyStatusEnums.Approved,
    value: 'Approved',
  };
  totalTile = {
    noofentity: 0,
    noofcompanyregn: 0,
    noofcompanyregnrequestapproved: 0,
    noofcompletedattestation: 0,
    noofrequests: 0,
    nooflcarequestapproved: 0,
    noofcoorequestapproved: 0,
    noofphysicalrequestapproved: 0,
    noofpendings: 0,
    nooflcapendings: 0,
    noofcoopendings: 0,
    noofphysicalpendings: 0,
  };
  lcaChartOptionattestation: EChartsOption = {};
  cooChartOptionattestation: EChartsOption = {};
  physicalChartOptionattestation: EChartsOption = {};

  allattesttogether: EChartsOption = {};
  LCAstatusChart: EChartsOption = {};
  COOStatusChart: EChartsOption = {};
  PhysicalStatusChart: EChartsOption = {};



  uuid: any;
  weekNumber: number = 0;
  constructor(
    public override router: Router,
    public override consts: ConstantsService,
    public override apiservice: ApiService,
    public override common: CommonService,
    public override translate: TranslateService,
    public datePipe: DatePipe,
    private auth: AuthService
  ) {
    super(router, consts, apiservice, common, translate);
    this.progress_val = 0;
    const url = this.router.url;
    this.routesurl = url;
    this.routesname =
      this.routesurl === '/landingpagepending' ? 'pending' : 'approve';
    // if (this.routesname === "pending" || this.routesname === "approve") {
    //   this.checkPermissionAllPage("landingpage");
    // }
  }

  getWeekNumber(date: Date): number {
    const formattedDate = this.datePipe.transform(date, 'w') || '';
    return parseInt(formattedDate, 10);
  }

  ngOnInit(): void {

   
    const today = new Date();
    this.weekNumber = this.getWeekNumber(today);

    let data11 = this.common.getUserProfile();
    let uuid;
    if (data11 != null || data11 != undefined) {
      data11 = JSON.parse(data11);
      console.log(data11.Data);
      uuid = data11.Data.uuid;
      this.uuid = uuid;
    } else {
      this.common.setlogoutreason('session');
      this.auth.logout();
    }

    if (this.routesname === 'pending') {
      this.selectedFilterOption = {
        id: 1,
        value: 'Pending',
      };
    } else if (this.routesname === 'approve') {
      this.selectedFilterOption = {
        id: 2,
        value: 'Approved',
      };
    }
    this.selectedFilterOption.Enddate = this.currentDate;
    this.selectedFilterOption.Startdate = new Date(
      this.selectedFilterOption.Enddate
    );
    this.selectedFilterOption.Startdate.setDate(
      this.selectedFilterOption.Startdate.getDate() - 30
    );
    this.selectedFilterOption.uuid = this.uuid;
    this.onClickFilterOptionDate('daily');
    this.onClickFilterOptionDate('weekly');
    this.onClickFilterOptionDate('monthly');
    this.siteAnalyticsData({ action: ActionConstants.load });
  }

  bindDataToDaily() {
    this.onClickFilterOption('lca', '01');
    this.onClickFilterOption('coo', '01');
    this.onClickFilterOption('physical', '01');
  }

  onClickFilterOptionDate(type: 'daily' | 'weekly' | 'monthly') {
    const { Startdate, Enddate } = this.selectedFilterOption;
    this.selectedFilterOption.StartdateStr = this.splitdatetime(
      Startdate,
      'dd-MMM-yyyy'
    )?.date?.toString(); //, "dd-MMM-yyyy"
    this.selectedFilterOption.EnddateStr = this.splitdatetime(
      Enddate,
      'dd-MMM-yyyy'
    )?.date?.toString(); //, "dd-MMM-yyyy"
    this.onClickFilterOptionDailyMonthlyWeekly(type);
    this.common.showLoading();
    setTimeout(() => {
      // Set isLoading to false after 3 seconds
      this.common.hideLoading();

      this.isLoading = false;
    }, 1500);
  }

  onClickFilterOptionDailyMonthlyWeekly(
    filterType: 'daily' | 'weekly' | 'monthly'
  ) {
    let payload = {};
    if (filterType === 'daily') {
      payload = {
        date: this.splitdatetime(this.currentDate)?.date,
        uuid: this.selectedFilterOption.uuid,
      };
    } else if (filterType === 'weekly') {
      payload = {
        week: this.weekNumber,
        year: this.splitdatetime(this.currentDate, 'yyyy')?.date, //, "yyyy"
        uuid: this.selectedFilterOption.uuid,
      };
    } else if (filterType === 'monthly') {
      payload = {
        Month: this.splitdatetime(this.currentDate, 'MMM-yyyy')?.date, //, "MMM-yyyy"
        year: this.splitdatetime(this.currentDate, 'yyyy')?.date, //, "yyyy"
        uuid: this.selectedFilterOption.uuid,
      };
    }
    this.getStatistics(filterType, payload);
  }

  getStatistics(filterType: 'daily' | 'weekly' | 'monthly', data: any) {
    const getLists =
      filterType === 'daily'
        ? this.consts.getDailyStatistics
        : filterType === 'weekly'
        ? this.consts.getWeeklyStatistics
        : this.consts.getMonthlyStatistics;
    this.loading = true;
    this.apiservice.post(getLists, data).subscribe((response: any) => {
      this.loading = false;
      const dictionary = this.routesname === 'pending' ? response : response;
      if (`${dictionary.responsecode}` === '1') {
        const dataArray = dictionary.data;
        this.statisticsLists = {
          ...this.statisticsLists,
          [filterType]: dataArray,
        };
        if (filterType === 'daily') {
          this.statisticsDailyListsFilter = this.statisticsLists?.daily;
          this.totalTile.noofentity = this.statisticsDailyListsFilter.reduce(
            (total: any, item: any) => total + item.noofentityrequest,
            0
          );
          this.totalTile.noofcompanyregn =
            this.statisticsDailyListsFilter.reduce(
              (total: any, item: any) => total + item.noofcompanyregnrequest,
              0
            );
          this.totalTile.noofcompanyregnrequestapproved =
            this.statisticsDailyListsFilter.reduce(
              (total: any, item: any) =>
                total + item.noofcompanyregnrequestapproved,
              0
            );
          this.totalTile.noofcompletedattestation =
            this.statisticsDailyListsFilter.reduce(
              (total: any, item: any) =>
                total +
                item.nooflcarequestcompleted +
                item.noofentityrequestcompleted +
                item.noofphysicalrequestcompleted,
              0
            );
          this.totalTile.noofrequests = this.statisticsDailyListsFilter.reduce(
            (total: any, item: any) =>
              total +
              item.nooflcarequest +
              item.noofphysicalrequest +
              item.noofcoorequest,
            0
          );
          this.totalTile.nooflcarequestapproved =
            this.statisticsDailyListsFilter.reduce(
              (total: any, item: any) => total + item.nooflcarequestapproved,
              0
            );
          this.totalTile.noofcoorequestapproved =
            this.statisticsDailyListsFilter.reduce(
              (total: any, item: any) => total + item.noofcoorequestapproved,
              0
            );
          this.totalTile.noofphysicalrequestapproved =
            this.statisticsDailyListsFilter.reduce(
              (total: any, item: any) =>
                total + item.noofphysicalrequestapproved,
              0
            );
          // Pendings
          this.totalTile.noofpendings = this.statisticsDailyListsFilter.reduce(
            (total: any, item: any) =>
              total +
              item.nooflcarequestpending +
              item.noofphysicalrequest +
              item.noofcoorequest,
            0
          );
          this.totalTile.nooflcapendings =
            this.statisticsDailyListsFilter.reduce(
              (total: any, item: any) => total + item.nooflcarequestpending,
              0
            );
          this.totalTile.noofcoopendings =
            this.statisticsDailyListsFilter.reduce(
              (total: any, item: any) => total + item.noofcoorequest,
              0
            );
          this.totalTile.noofphysicalpendings =
            this.statisticsDailyListsFilter.reduce(
              (total: any, item: any) => total + item.noofphysicalrequest,
              0
            );
          this.bindDataToDaily();
        } else if (filterType === 'weekly') {
          this.statisticsWeeklyListsFilter = this.statisticsLists?.weekly;
        } else if (filterType === 'monthly') {
          this.statisticsMonthlyListsFilter = this.statisticsLists?.monthly;
        }
      }
    });
  }

  onClickFilterOption(
    type: 'lca' | 'coo' | 'physical',
    dayweekmonth: '01' | '02' | '03'
  ) {
    setTimeout(() => {
      // Set isLoading to false after 3 seconds
      this.isLoading = false;
    }, 1500);

    this.refreshAttestChartAll(type);
    let xAxis: string[] = [];
    let seriesDataRequest: number[] = [];
    let seriesDataApproved: number[] = [];
    let seriesDataCompleted: number[] = [];
    let statisticsListsFilter: any[] = [];
    if (dayweekmonth) {
      if (dayweekmonth === '01') {
        statisticsListsFilter = this.statisticsDailyListsFilter;
        statisticsListsFilter.forEach((row) => {
          xAxis.push(row?.statdate);
        });
      } else if (dayweekmonth === '02') {
        statisticsListsFilter = this.statisticsWeeklyListsFilter;
        statisticsListsFilter.forEach((row) => {
          xAxis.push(`${row?.weekno}/${row?.yearuno}`);
        });
      } else if (dayweekmonth === '03') {
        statisticsListsFilter = this.statisticsMonthlyListsFilter;
        statisticsListsFilter.forEach((row) => {
          xAxis.push(`${row?.monthname}`);
        });
      }
    }

    if (dayweekmonth === '01') {
      statisticsListsFilter = this.statisticsDailyListsFilter;
      xAxis = statisticsListsFilter.map((row) => row?.statdate);
      // Convert date-like strings to comparable format (e.g., Date objects)
      const convertedXAxis = xAxis.map((item) => new Date(item));
      // Sort the array in ascending order
      convertedXAxis.sort((a: any, b: any) => a - b);
      // Convert back to the original format
      xAxis = convertedXAxis.map((item) =>
        item.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      );
    } else if (dayweekmonth === '02') {
      statisticsListsFilter = this.statisticsWeeklyListsFilter;
      xAxis = statisticsListsFilter.map(
        (row) => `${row?.weekno}/${row?.yearuno}`
      );

      // Convert week and year strings to comparable format (e.g., Date objects)
      const convertedXAxis = xAxis.map((item) => {
        const [weekNo, year] = item.split('/').map(Number);

        // Ensure proper parsing and use numbers in the Date constructor
        return new Date(Number(year), 0, 1 + (Number(weekNo) - 1) * 7);
      });

      // Sort the array in ascending order
      convertedXAxis.sort((a, b) => a.getTime() - b.getTime());

      // Convert back to the original format
      xAxis = convertedXAxis.map(
        (item) =>
          `${item.getUTCFullYear()}/${Math.ceil(
            (item.getTime() - new Date(item.getUTCFullYear(), 0, 1).getTime()) /
              (7 * 24 * 60 * 60 * 1000)
          )}`
      );
    }

    if (type) {
      if (type === 'lca') {
        statisticsListsFilter.forEach((row) => {
          seriesDataRequest.push(row?.nooflcarequestpending);
          seriesDataApproved.push(row?.nooflcarequestapproved);
          seriesDataCompleted.push(row?.nooflcarequestcompleted);
        });
      } else if (type === 'coo') {
        statisticsListsFilter.forEach((row) => {
          seriesDataRequest.push(row?.noofcoorequest);
          seriesDataApproved.push(row?.noofcoorequestapproved);
          seriesDataCompleted.push(row?.noofcoorequestapproved);
        });
      } else if (type === 'physical') {
        statisticsListsFilter.forEach((row) => {
          seriesDataRequest.push(row?.noofphysicalrequest);
          seriesDataApproved.push(row?.noofphysicalrequestapproved);
          seriesDataCompleted.push(row?.noofphysicalrequestcompleted);
        });
      }
    }
    //
    // console.log("seriesDataRequest: ", seriesDataRequest);
    // console.log("seriesDataCompleted: ", seriesDataCompleted);
    this.refreshAttestationChart(
      type,
      xAxis,
      seriesDataRequest,
      seriesDataApproved,
      seriesDataCompleted
    );
  }

  refreshAttestChartAll(type: 'lca' | 'coo' | 'physical' | '') {
    this.isLoading = true;
    const commonObject: EChartsOption = {
      tooltip: {},
      legend: {
        right: '5%',
        show: false,
        orient: 'vertical',
      },
      grid: {
        left: '6%',
        right: '6%',
        bottom: '10%',
        top: '13%',
      },
      color: ['#b68a35', '#1b1d21'],
      toolbox: {
        feature: {
          saveAsImage: {
            show: true,
            name: 'Attestation Request',
          },
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
      },
      yAxis: {
        type: 'value',
      },
      
      series: [
        {
          name: 'Pending',
          type: 'line',
          smooth: true,
          stack: 'Total',
          data: [],
        },
        {
          name: 'Completed',
          type: 'line',
          smooth: true,
          stack: 'Total',
          data: [],
        },
      ],
    };
    if (type === 'lca') {
      this.lcaChartOptionattestation = { ...commonObject };
    } else if (type === 'coo') {
      this.cooChartOptionattestation = { ...commonObject };
    } else if (type === 'physical') {
      this.physicalChartOptionattestation = { ...commonObject };
    } else {
      this.lcaChartOptionattestation = { ...commonObject };
      this.cooChartOptionattestation = { ...commonObject };
      this.physicalChartOptionattestation = { ...commonObject };
    }
  }

  refreshAttestationChart(
    type: 'lca' | 'coo' | 'physical',
    xAxis: string[],
    seriesDataRequest: number[],
    seriesDataApproved: number[],

    seriesDataCompleted: number[]
  ) {
    //LCA
    if (type === 'lca') {
      this.lcaChartOptionattestation.xAxis = {
        type: 'category',
        boundaryGap: false,
        data: xAxis,
      };
      this.lcaChartOptionattestation.series = [
        {
          name: 'Pending',
          type: 'line',
          smooth: true,
          stack: 'Total',
          data: seriesDataRequest,
        },

        {
          name: 'Completed',
          type: 'line',
          smooth: true,
          stack: 'Total',
          data: seriesDataCompleted,
        },
      ];

      this.lcaChartOptionattestation.title= {
        show: xAxis.length === 0,
        textStyle: {
            color: "grey",
            fontSize: 20
        },
        text: this.translate.instant("No data"),
        left: "center",
        top: "center"
    }

    } 
    //COO
    else if (type === 'coo') {
      this.cooChartOptionattestation.xAxis = {
        type: 'category',
        boundaryGap: false,
        data: xAxis,
      };
      this.cooChartOptionattestation.series = [
        {
          name: 'Pending',
          type: 'line',
          smooth: true,
          stack: 'Total',
          data: seriesDataCompleted,
        },

        {
          name: 'Completed',
          type: 'line',
          smooth: true,
          stack: 'Total',
          data: seriesDataRequest,
        },
      ];
      this.cooChartOptionattestation.title= {
        show: xAxis.length === 0,
        textStyle: {
            color: "grey",
            fontSize: 20
        },
        text: this.translate.instant("No data"),
        left: "center",
        top: "center"
    }
    } 
    //Physical
    else if (type === 'physical') {
      this.physicalChartOptionattestation.xAxis = {
        type: 'category',
        boundaryGap: false,
        data: xAxis,
      };
      this.physicalChartOptionattestation.series = [
        {
          name: 'Pending',
          type: 'line',
          smooth: true,
          stack: 'Total',
          data: seriesDataCompleted,
        },
        {
          name: 'Completed',
          type: 'line',
          smooth: true,
          stack: 'Total',
          data: seriesDataRequest,
        },
      ];

      this.physicalChartOptionattestation.title= {
        show: xAxis.length === 0,
        textStyle: {
            color: "grey",
            fontSize: 20
        },
        text: this.translate.instant("No data"),
        left: "center",
        top: "center"
    }
    }
  }

 
  splitdatetime(datetimeString: any, dateFormat: string = 'dd-MMM-yyyy') {
    if (datetimeString) {
      if (typeof datetimeString === 'string') {
        const dateTimeParts = datetimeString.split('T');
        let date = dateTimeParts.length >= 1 ? dateTimeParts[0] : '';
        let time = dateTimeParts.length >= 2 ? dateTimeParts[1] : '';
        if (!date || (date && new Date(date) <= new Date('1900-01-01'))) {
          date = '';
        }
        if (!time || time == '00:00:00') {
          time = '';
        }
        return {
          date: this.datePipe.transform(date, dateFormat),
          time: time,
        };
      } else if (typeof datetimeString === 'object') {
        return {
          date: this.datePipe.transform(datetimeString, dateFormat),
        };
      }
    }
    return null; // Invalid or null datetime string
  }

 


}
