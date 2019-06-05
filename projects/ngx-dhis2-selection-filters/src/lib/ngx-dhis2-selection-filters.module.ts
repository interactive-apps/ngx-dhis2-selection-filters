import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDhis2SelectionFiltersComponent } from './containers/ngx-dhis2-selection-filters/ngx-dhis2-selection-filters.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDhis2OrgUnitFilterModule } from '@iapps/ngx-dhis2-org-unit-filter';
import { NgxDhis2DataFilterModule } from '@iapps/ngx-dhis2-data-filter';
import { NgxDhis2PeriodFilterModule } from '@iapps/ngx-dhis2-period-filter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { NgxDhis2ValidationRuleFilterModule } from '@iapps/ngx-dhis2-validation-rule-group-filter';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxDhis2ValidationRuleFilterModule,
    NgxDhis2OrgUnitFilterModule,
    NgxDhis2DataFilterModule,
    NgxDhis2PeriodFilterModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule
  ],
  declarations: [NgxDhis2SelectionFiltersComponent],
  exports: [NgxDhis2SelectionFiltersComponent],
  providers: []
})
export class NgxDhis2SelectionFiltersModule {}

