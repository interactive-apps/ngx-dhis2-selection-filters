import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDhis2SelectionFiltersComponent } from './containers/ngx-dhis2-selection-filters/ngx-dhis2-selection-filters.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDhis2OrgUnitFilterModule } from '@iapps/ngx-dhis2-org-unit-filter';
import { NgxDhis2DataFilterModule } from '@iapps/ngx-dhis2-data-filter';
import { NgxDhis2PeriodFilterModule } from '@iapps/ngx-dhis2-period-filter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxDhis2OrgUnitFilterModule,
    NgxDhis2DataFilterModule,
    NgxDhis2PeriodFilterModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [NgxDhis2SelectionFiltersComponent],
  exports: [NgxDhis2SelectionFiltersComponent]
})
export class NgxDhis2SelectionFiltersModule {}
