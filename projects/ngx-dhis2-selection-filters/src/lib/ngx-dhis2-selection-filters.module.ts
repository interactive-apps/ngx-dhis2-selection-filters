import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDhis2SelectionFiltersComponent } from './containers/ngx-dhis2-selection-filters/ngx-dhis2-selection-filters.component';
import { TranslateModule } from '@ngx-translate/core';
import { filterModules } from './modules/index';
import { NgxDhis2OrgUnitFilterModule } from '@iapps/ngx-dhis2-org-unit-filter';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxDhis2OrgUnitFilterModule,
    ...filterModules
  ],
  declarations: [NgxDhis2SelectionFiltersComponent],
  exports: [NgxDhis2SelectionFiltersComponent]
})
export class NgxDhis2SelectionFiltersModule {}
