import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import {
  FILTER_ICON,
  ARROW_LEFT_ICON,
  ARROW_RIGHT_ICON,
  DATA_ICON,
  PERIOD_ICON,
  ARROW_DOWN_ICON,
  TREE_ICON
} from '../../icons';
import { SelectionFilterConfig } from '../../models/selected-filter-config.model';
import { SELECTION_FILTER_CONFIG } from '../../constants/selection-filter-config.constant';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-selection-filters',
  templateUrl: './ngx-dhis2-selection-filters.component.html',
  styleUrls: ['./ngx-dhis2-selection-filters.component.css']
})
export class NgxDhis2SelectionFiltersComponent implements OnInit {
  @Input()
  dataSelections: any[];
  @Input()
  layout: any;
  @Input()
  selectionFilterConfig: SelectionFilterConfig;
  @Output()
  update: EventEmitter<any[]> = new EventEmitter<any[]>();
  showFilters: boolean;
  showFilterBody: boolean;

  // icons
  filterIcon: string;
  arrowLeftIcon: string;
  arrowRightIcon: string;
  arrowDownIcon: string;
  dataIcon: string;
  periodIcon: string;
  orgUnitIcon: string;
  selectedFilter: string;

  // selections
  selectedData: any[];
  selectedDynamicDimensions: any[];
  selectedDataGroups: any[];
  selectedPeriods: any[];
  selectedOrgUnits: any[];

  constructor() {
    this.showFilters = this.showFilterBody = false;

    // icons initializations
    this.filterIcon = FILTER_ICON;
    this.arrowLeftIcon = ARROW_LEFT_ICON;
    this.arrowRightIcon = ARROW_RIGHT_ICON;
    this.arrowDownIcon = ARROW_DOWN_ICON;
    this.dataIcon = DATA_ICON;
    this.periodIcon = PERIOD_ICON;
    this.orgUnitIcon = TREE_ICON;
  }

  ngOnInit() {
    // initialize data Selections
    if (!this.dataSelections || !_.isArray(this.dataSelections)) {
      this.dataSelections = [];
    }

    // set filter configuration
    this.selectionFilterConfig = {
      ...SELECTION_FILTER_CONFIG,
      ...(this.selectionFilterConfig || {})
    };

    // set selection paremeters
    this._setSelectionParameters();

    // set current filter
    this.selectedFilter = this.selectionFilterConfig.showDataFilter
      ? 'DATA'
      : this.selectionFilterConfig.showPeriodFilter
      ? 'PERIOD'
      : this.selectionFilterConfig.showOrgUnitFilter
      ? 'ORG_UNIT'
      : this.selectionFilterConfig.showLayout
      ? 'LAYOUT'
      : '';
  }

  onToggleFilter(e) {
    e.stopPropagation();
    this.showFilters = !this.showFilters;
    if (this.showFilters) {
      this.showFilterBody = true;
    } else {
      this.showFilterBody = false;
    }
  }

  toggleCurrentFilter(e, selectedFilter) {
    e.stopPropagation();
    if (this.selectedFilter === selectedFilter) {
      this.selectedFilter = '';
      this.showFilterBody = false;
    } else {
      this.selectedFilter = selectedFilter;
      this.showFilterBody = true;
    }
  }

  onFilterClose(selectedItems, selectedFilter) {
    if (selectedFilter === 'LAYOUT') {
      const layouts = _.flatten(
        _.map(_.keys(selectedItems), (selectedItemKey: string) => {
          return _.map(
            selectedItems[selectedItemKey],
            (selectedItem: any, selectedItemIndex: number) => {
              return {
                ...selectedItem,
                layout: selectedItemKey,
                layoutOrder: selectedItemIndex
              };
            }
          );
        })
      );

      this.dataSelections = _.sortBy(
        _.map(this.dataSelections || [], (dataSelection: any) => {
          const availableDataSelectionLayout = _.find(layouts, [
            'value',
            dataSelection.dimension
          ]);

          return availableDataSelectionLayout
            ? {
                ...dataSelection,
                layout: availableDataSelectionLayout.layout,
                layoutOrder: availableDataSelectionLayout.layoutOrder
              }
            : dataSelection;
        }),
        'layoutOrder'
      );
    } else {
      if (selectedItems) {
        if (_.isArray(selectedItems)) {
          // Remove all dynamic dimension selections first
          this.dataSelections = _.filter(
            this.dataSelections || [],
            (dataSelection: any) =>
              ['ou', 'pe', 'dx', 'co', 'dy'].indexOf(
                dataSelection.dimension
              ) !== -1
          );
          _.each(selectedItems, (selectedItem: any) => {
            this.dataSelections = !_.find(this.dataSelections, [
              'dimension',
              selectedItem.dimension
            ])
              ? [
                  ...(this.dataSelections || []),
                  { ...selectedItem, layout: 'filters' }
                ]
              : [
                  ...this.updateDataSelectionWithNewSelections(
                    this.dataSelections || [],
                    selectedItem
                  )
                ];
          });
        } else if (selectedItems.items.length > 0) {
          this.dataSelections = !_.find(this.dataSelections, [
            'dimension',
            selectedItems.dimension
          ])
            ? [
                ...(this.dataSelections || []),
                { ...selectedItems, layout: 'columns' }
              ]
            : [
                ...this.updateDataSelectionWithNewSelections(
                  this.dataSelections || [],
                  selectedItems
                )
              ];
        }
      }
    }

    // set selection paremeters
    this._setSelectionParameters();

    if (this.selectedFilter === selectedFilter) {
      this.selectedFilter = '';
      this.showFilterBody = false;
    }
  }

  onFilterUpdate(selectedItems, selectedFilter) {
    if (selectedFilter === 'LAYOUT') {
      const layouts = _.flatten(
        _.map(_.keys(selectedItems), (selectedItemKey: string) => {
          return _.map(
            selectedItems[selectedItemKey] || [],
            (selectedItem: any, selectedItemIndex: number) => {
              return {
                ...selectedItem,
                layout: selectedItemKey,
                layoutOrder: selectedItemIndex
              };
            }
          );
        })
      );

      this.dataSelections = _.sortBy(
        _.map(this.dataSelections || [], (dataSelection: any) => {
          const availableDataSelectionLayout = _.find(layouts, [
            'value',
            dataSelection.dimension
          ]);

          return availableDataSelectionLayout
            ? {
                ...dataSelection,
                changed: true,
                layout: availableDataSelectionLayout.layout,
                layoutOrder: availableDataSelectionLayout.layoutOrder
              }
            : { ...dataSelection, changed: true };
        }),
        'layoutOrder'
      );
    } else {
      if (_.isArray(selectedItems)) {
        // Remove all dynamic dimension selections first
        this.dataSelections = _.filter(
          this.dataSelections || [],
          (dataSelection: any) =>
            ['ou', 'pe', 'dx', 'co', 'dy'].indexOf(dataSelection.dimension) !==
            -1
        );
        _.each(selectedItems, (selectedItem: any) => {
          this.dataSelections = !_.find(this.dataSelections, [
            'dimension',
            selectedItem.dimension
          ])
            ? [
                ...(this.dataSelections || []),
                { ...selectedItem, layout: 'filters' }
              ]
            : [
                ...this.updateDataSelectionWithNewSelections(
                  this.dataSelections || [],
                  selectedItem
                )
              ];
        });
      } else {
        this.dataSelections = !_.find(this.dataSelections, [
          'dimension',
          selectedItems.dimension
        ])
          ? [
              ...(this.dataSelections || []),
              { ...selectedItems, layout: 'columns' }
            ]
          : [
              ...this.updateDataSelectionWithNewSelections(
                this.dataSelections || [],
                selectedItems
              )
            ];
      }
    }

    // set selection paremeters
    this._setSelectionParameters();

    this.update.emit(this.dataSelections || []);
    this.selectedFilter = '';
    this.showFilterBody = false;
  }

  updateDataSelectionWithNewSelections(
    dataSelections: any[],
    selectedObject: any
  ): any[] {
    const selectedDimension = _.find(dataSelections, [
      'dimension',
      selectedObject.dimension
    ]);
    const selectedDimensionIndex = selectedDimension
      ? dataSelections.indexOf(selectedDimension)
      : -1;
    return selectedDimension
      ? [
          ...dataSelections.slice(0, selectedDimensionIndex),
          { ...selectedDimension, ...selectedObject },
          ...dataSelections.slice(selectedDimensionIndex + 1)
        ]
      : dataSelections
      ? [...dataSelections, selectedObject]
      : [selectedObject];
  }

  private _setSelectionParameters() {
    // set data items
    const dataObject = _.find(this.dataSelections, ['dimension', 'dx']);
    this.selectedData = dataObject ? dataObject.items : [];

    // set dynamic dimennsion
    this.selectedDynamicDimensions = _.filter(
      this.dataSelections || [],
      (dataSelection: any) =>
        ['ou', 'pe', 'dx', 'co', 'dy'].indexOf(dataSelection.dimension) === -1
    );

    // set data groups
    this.selectedDataGroups = dataObject ? dataObject.groups : [];

    // set periods
    const periodObject = _.find(this.dataSelections, ['dimension', 'pe']);
    this.selectedPeriods = periodObject ? periodObject.items : [];

    // set org units
    const orgUnitObject = _.find(this.dataSelections, ['dimension', 'ou']);
    this.selectedOrgUnits = orgUnitObject ? orgUnitObject.items : [];

    // set layout
    const layoutItem = _.groupBy(
      _.map(this.dataSelections, dataSelection => {
        return {
          name: dataSelection.name,
          value: dataSelection.dimension,
          layout: dataSelection.layout
        };
      }),
      'layout'
    );
  }
}
