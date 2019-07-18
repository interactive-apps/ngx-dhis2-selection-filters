import { OrgUnitFilterConfig } from '@iapps/ngx-dhis2-org-unit-filter';

export interface SelectionFilterConfig {
  showDataFilter?: boolean;
  disableDataFilter?: boolean;
  showPeriodFilter?: boolean;
  disablePeriodFilter?: boolean;
  showOrgUnitFilter?: boolean;
  disableOrgUnitFilter?: boolean;
  showValidationRuleGroupFilter?: boolean;
  disableValidationRuleGroupFilter?: boolean;
  showLayout?: boolean;
  disableLayout?: boolean;
  showDynamicDimension?: boolean;
  disableDynamicDimension?: boolean;
  orgUnitFilterConfig?: OrgUnitFilterConfig;
  allowStepSelection?: boolean;
  stepSelections?: string[];
}
