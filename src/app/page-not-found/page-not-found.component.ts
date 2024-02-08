import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/service/common.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  backtohome: string = '/';

  constructor(private common: CommonService, private router: Router) {}

  ngOnInit(): void {
    // const { role } = this.common.getUserDetails();
    // this.backtohome = this.common.getStartingPage(role);
    this.backtohome = '/login';
  }

  redirectToHome() {
    this.router.navigate([`/${this.backtohome}`]);
  }
}
