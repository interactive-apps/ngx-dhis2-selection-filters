import { Component } from '@angular/core';
import { SelectionFilterConfig } from 'projects/ngx-dhis2-selection-filters/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  selectionFilterConfig: SelectionFilterConfig = {
    allowStepSelection: true,
    stepSelections: ['dx', 'vrg', 'pe', 'ou'],
    dataFilterConfig: {
      singleSelection: true,
      enabledSelections: ['in']
    }
  };

  onUpdate(dataSelections) {
    console.log(dataSelections);
  }
}
