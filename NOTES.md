# Introduction

_This is the documentation for the WEA5 project hand-in: Its structure and features will be described._ The bus stop project was applied to a sort of event management system for a Catholic Dorm in Linz (KHG, Katholische Hochschulgemeinde): the idea is to actually test run the system in this community, filling a real need (making events happening _right now_ visible).

**Handed in by Jack Heseltine, s2110307016**

![Website Header](./header.png)

## Contents

- Introduction
- Structure of the App
- Navigation Paths
- Test Runs with Screenshots
- Q&A
- Setup
- Libraries and Components
- Not Implemented Features
- +3rd Party Resoureces
- ++Own Learnings

# Structure of the App

One main component, one folder for services. 4 modules: holidays (management), stops, routes, schedules. These are only accessible if logged in (admin level), otherwise guarded against. The main component functions as a bus stop sign. Checks every 30 seconds if there are any connections available and flashes red if the next connection is leaving within 5 minutes.

```
*
|- (main) app
|---- holidays
|---- stops
|---- routes
|---- schedules
|- /services
|- /guards
|- /environments
*
```

The actual stop the bus stop sign is showing for can be selected via drop down, or also query parameter, like `http://localhost:4200/holidays/list?stopId=21`. Corresponds to:

![Stop Selection via Dropdown](./img/Screenshot%202025-01-02%20at%2020.55.10.png)

# Navigation Paths

The above structure shows the main navigation paths, starting from the main app. The sub navigation further allows for selecting ...

```
*
|- holidays|stops|routes|schedules
|---- list view
|---- create view
|---- udate view
*
```

These are the same for each component. 

![Stop Selection via Dropdown](./img/Screenshot%202025-01-02%20at%2020.56.26.png)

Everything is display within one page = SPA.

# Test Runs

## 1. general user: bus arrives and leaves

![Test Case 1.1](./img/Screenshot%202025-01-02%20at%2015.43.48.png)
![Test Case 1.2](./img/Screenshot%202025-01-02%20at%2015.44.16.png)

### Another Run with Clock (logged in as admin this time)

![Test Case 1a.1](./img/Screenshot%202025-01-02%20at%2015.37.58.png)
![Test Case 1a.2](./img/Screenshot%202025-01-02%20at%2015.38.33.png)

## 2. admin user: click through admin menu

![Test Case 2.1](./img/Screenshot%202025-01-02%20at%2015.38.54.png)
![Test Case 2.2](./img/Screenshot%202025-01-02%20at%2015.39.07.png)
![Test Case 2.3](./img/Screenshot%202025-01-02%20at%2015.39.17.png)
![Test Case 2.4](./img/Screenshot%202025-01-02%20at%2015.39.22.png)
![Test Case 2.5](./img/Screenshot%202025-01-02%20at%2015.39.29.png)
![Test Case 2.6](./img/Screenshot%202025-01-02%20at%2015.39.33.png)
![Test Case 2.7](./img/Screenshot%202025-01-02%20at%2015.39.37.png)
![Test Case 2.8](./img/Screenshot%202025-01-02%20at%2015.39.49.png)

# Q&A

## a. URLs

These work via URL router module: I tested with the Holidays module, to introduce the common type "Hollidays"

- It is enough to simply change app.routes.ts to ...
```
import { Routes } from '@angular/router';
import { HolidayListComponent } from './holidays/holiday-list/holiday-list.component';

export const routes: Routes = [
    { path: 'hollidays', loadChildren: () => import('./holidays/holidays.module').then(m => m.HolidaysModule) },
    { path: 'stops', loadChildren: () => import('./stops/stops.module').then(m => m.StopsModule) },
    { path: 'routes', loadChildren: () => import('./routes/routes.module').then(m => m.RoutesModule) },
    { path: 'schedules', loadChildren: () => import('./schedules/schedules.module').then(m => m.SchedulesModule) },
    { path: '**', redirectTo: '' },
  ];  
```

## b. Auth-guards to protect components component-wise

E.g. Holidays component (RedirectAuthGuard) - see also URL-interactions with the above url specs.

```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidaysComponent } from './holidays.component';
import { HolidayListComponent } from './holiday-list/holiday-list.component';
import { HolidayCreateComponent } from './holiday-create/holiday-create.component';
import { HolidayUpdateComponent } from './holiday-update/holiday-update.component';
import { RedirectAuthGuard } from '../guards/redirect-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HolidaysComponent,
    canActivate: [RedirectAuthGuard], // Ensure authentication
    children: [
      { path: '', component: HolidayListComponent },
      { path: 'list', component: HolidayListComponent },
      { path: 'create', component: HolidayCreateComponent },
      { path: 'update', component: HolidayUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HolidaysRoutingModule {}
```

I.e. sub-urls are determined here but protected, redirect to base app component.

## c. HTML Form level validation

If the server cannot process the data, at this second-tier a message will be issued an the user informed with a pop-up. The form validation looks like this in the case of Holidays:

```
<mat-card>
    <h2>Create a New Holiday</h2>
    <form [formGroup]="holidayForm" (ngSubmit)="onSubmit()">
        <mat-form-field class="holiday-form-field" appearance="fill">
        <mat-label>Description</mat-label>
        <input matInput formControlName="description" placeholder="Enter holiday description" />
        <mat-error *ngIf="submitted && holidayForm.controls['description'].invalid">
            A description is required (min 3 characters).
        </mat-error>
        </mat-form-field>

        <mat-form-field class="holiday-form-field" appearance="fill">
        <mat-label>Date</mat-label>
        <input matInput formControlName="date" placeholder="Enter holiday date" type="date" />
        <mat-error *ngIf="submitted && holidayForm.controls['date'].invalid">
            A valid date is required.
        </mat-error>
        </mat-form-field>

        <mat-checkbox formControlName="isSchoolBreak">
        Is this a school break?
        </mat-checkbox>

        <button mat-raised-button class="holiday-button" color="primary" type="submit">
        Create Holiday
        </button>
    </form>
</mat-card>
```

## d. reactive server message handling in the front end

See also immediately above. If the schedule cannot be pulled for example:

```
fetchNextConnections(): void {
    this.scheduleService.getNextConnections(this.stopId).subscribe({
      next: (data) => {
        this.scheduleId = data[0]?.scheduleId;
        this.routeStopSchedules = data[0]?.routeStopSchedules || [];
        this.fetchRouteDetails(data[0]?.routeId);

        // pull out time for flshing logic
        const now = new Date();

        const providedTime = new Date(now);
        providedTime.setMinutes(data[0]?.routeStopSchedules[0].time.minute);
        providedTime.setHours(data[0]?.routeStopSchedules[0].time.hour);

        const timeDifference = providedTime.getTime() - now.getTime();

        if (timeDifference > 0 && timeDifference <= 5 * 60 * 1000) {
            this.isFlashing = true;
        } else {
            this.isFlashing = false;
        }
      },
      error: (err) => {
        console.info('Error fetching connections:', err);
        if (this.isFlashing) {
          this.isFlashing = false;
        }
        this.routeStopSchedules = [];
      },
    });
  }
```

So this information is passed visually to the user. In later stages of development I largely removed console error logs since some outage is possible. This is logged at info level and the use informed in tandem, be it visually.

# Setup

See readme: requires running backend and db. I might still look at online deployment of asp.net core/wea bundle.

Locally: `ng serve` in the repo.

# Structure

at first two-tier authorisation was considered (special admins group), but then in accordance with bus stop info signs: the main view should be public, only one extra tier (~admins) for management and check-in.

# Libraries and Components

- Angular Material Design (liked this very much, first time)
- Auth0 AuthService made Auth0 integration very straightforward
- (Native) RouterModule (super helpful, see structure above)

# Not Implemented Features

These simplifications were made, Hard: 

- No Checkin.
- No diagrams and delays (also not in backend - cf. SWK).

Soft:

- Full object display: update forms refer to ids but it would be better to get relevant object. 

# +Resources

I want to make a note of resources helpful for work on this app.

- https://auth0.com/docs/libraries/auth0-single-page-app-sdk
- https://community.auth0.com/t/angular-and-net-6-integrated/124647 and https://auth0.com/docs/quickstart/spa/angular/02-calling-an-api?_gl=1*1ps7fdf*_gcl_au*MTQwODIzMDA1MC4xNzM0ODY5MTMx*_ga*MTY2MTE2MDI1NS4xNzM0ODY5MTMy*_ga_QKMSDV5369*MTczNTQ3OTcyMi40LjEuMTczNTQ4MzYyNC42MC4wLjA. (for authorizationt oekn/audience setup questions)/also reference from auth0 perspective as far as flows in general https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow-with-pkce

# ++Learnings

Not always using DTOs on client side, instead relying on form functionality to shape data here and let backend take over the validation.
