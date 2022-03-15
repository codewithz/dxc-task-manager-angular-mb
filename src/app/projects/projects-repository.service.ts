import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { ProjectsListRequestedAction, ProjectsListSuccessAction } from '../actions/projects-action';
import { getProjectLoaded, getProjectLoading, getProjects } from '../reducers';
import { ProjectsService } from './projects.service';
import { Store } from '@ngrx/store';
import { RootReducerState } from './../reducers/index';
import { Project } from './project';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProjectsRepositoryService {

  constructor(private service: ProjectsService, private store: Store<RootReducerState>) { }

  getProjects(force = false): Observable<Project[]> {
    const loading = this.store.select(getProjectLoading);
    const loaded = this.store.select(getProjectLoaded);
    const getProjectData = this.store.select(getProjects);
    const loadedAndLoadingObs = combineLatest([loaded, loading])

    loadedAndLoadingObs.pipe(take(1)).subscribe(
      (data) => {
        if (!data[0] && !data[1] || force) {

          this.store.dispatch(new ProjectsListRequestedAction());

          this.service.getProjects()
            .subscribe(
              (response) => {

                this.store.dispatch(new ProjectsListSuccessAction({ data: response }))
              }
            )
        }
      }
    );

    return getProjectData;
  }
}
