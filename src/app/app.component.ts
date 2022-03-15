import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { ProjectsRepositoryService } from './projects/projects-repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-manager';
  projectCount = 0;

  constructor(public loginService: LoginService,
    private projectRepository: ProjectsRepositoryService) { }


}
