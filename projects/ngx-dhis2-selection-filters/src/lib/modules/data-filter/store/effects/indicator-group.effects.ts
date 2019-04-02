import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { withLatestFrom, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromIndicatorGroupReducer from '../reducers/indicator-group.reducer';

import * as fromIndicatorGroupActions from '../actions/indicator-group.actions';
import * as fromIndicatorGroupSelectors from '../selectors/indicator-group.selectors';
import * as fromHelpers from '../../helpers';
import { IndicatorGroupService } from '../../services/indicator-group.service';

@Injectable()
export class IndicatorGroupEffects {
  @Effect({ dispatch: false })
  loadIndicatorGroups$: Observable<any> = this.actions$.pipe(
    ofType(
      fromIndicatorGroupActions.IndicatorGroupActionTypes.LoadIndicatorGroups
    ),
    withLatestFrom(
      this.indicatorGroupStore.select(
        fromIndicatorGroupSelectors.getIndicatorGroupsInitiatedStatus
      )
    ),
    tap(
      ([action, indicatorGroupInitiated]: [
        fromIndicatorGroupActions.LoadIndicatorGroups,
        boolean
      ]) => {
        if (!indicatorGroupInitiated) {
          this.indicatorGroupStore.dispatch(
            new fromIndicatorGroupActions.LoadIndicatorGroupsInitiated()
          );
          this.indicatorGroupService.loadAll().subscribe(
            (indicatorGroups: any[]) => {
              this.indicatorGroupStore.dispatch(
                new fromIndicatorGroupActions.AddIndicatorGroups(
                  fromHelpers.getStandardizedIndicatorGroups(indicatorGroups)
                )
              );
            },
            (error: any) => {
              this.indicatorGroupStore.dispatch(
                new fromIndicatorGroupActions.LoadIndicatorGroupsFail(error)
              );
            }
          );
        }
      }
    )
  );

  constructor(
    private actions$: Actions,
    private indicatorGroupService: IndicatorGroupService,
    private indicatorGroupStore: Store<fromIndicatorGroupReducer.State>
  ) {}
}
