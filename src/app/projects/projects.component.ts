import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from './project';
import { ProjectsService } from './projects.service';
import { ClientLocation } from './../client-location/client-location';
import { ClientLocationsService } from '../client-location/client-locations.service';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { TeamSizeService } from './team-size.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  showLoading: boolean = true;

  projects: Project[] = []
  clientLocations: ClientLocation[] = []
  newProject: Project = new Project();
  editProject: Project = new Project();
  editProjectIndex = 0;

  deleteProject: Project = new Project();
  deleteProjectIndex: number = 0;

  searchBy: string = 'Porject ID'
  searchText: string = 'Search Text'

  @ViewChild("newProjectForm") newProjectForm: NgForm | any = null;
  @ViewChild("editProjectForm") editProjectForm: NgForm | any = null;

  constructor(private service: ProjectsService, private clientLocationService: ClientLocationsService,
    private toaster: ToastrService) { }

  ngOnInit(): void {

    this.service.getProjects()
      .subscribe(
        (response) => {
          this.projects = response;
          console.log(this.projects)
          this.showLoading = false;
        }
      )

    this.clientLocationService.getClientLocations()
      .subscribe(
        (response) => {
          this.clientLocations = response
        }
      )


  }

  onCreateProjectClicked() {
    this.newProjectForm.resetForm();
  }

  onSave() {
    console.log("Validity Status: ", this.newProjectForm.valid)
    if (this.newProjectForm.valid) {
      this.newProject.clientLocation =
        this.clientLocations.find(
          (client) => client.clientLocationID == this.newProject.clientLocationID);
      this.service.createProject(this.newProject)
        .subscribe(
          (response) => {
            //Adding new project to the table
            let createdProject: Project = response;
            this.projects.push(createdProject)

            //Clearing the field
            this.newProject = new Project();
            // Jquery Call
            this.showSuccess();
            $("#newProjectCancel").trigger("click")


          },
          (error) => { console.log(error) }
        )
    }
  }

  showSuccess() {
    console.log("Before")
    this.toaster.success("Project Addition Status", "Successful")
    console.log("After")
  }
  showError() {
    console.log("Before")
    this.toaster.error("Project Addition Status", "Error")
    console.log("After")
  }

  onEditClicked(event: any, index: number) {
    this.editProjectIndex = index;
    let selectedProject: Project = this.projects[index];
    this.editProject = selectedProject;
  }

  onUpdate() {
    if (this.editProjectForm.valid) {
      this.editProject.clientLocation =
        this.clientLocations.find(
          (client) => client.clientLocationID == this.editProject.clientLocationID);

      this.service.updateProject(this.editProject)
        .subscribe(
          (response) => {
            this.projects[this.editProjectIndex] = response;

            this.editProject = new Project();

            // Jquery Call
            $("#updateProjetCancel").trigger("click")

          },
          (error) => {
            console.log(error)
          },
        )
    }

  }

  onDeleteClicked(index: number) {
    this.deleteProjectIndex = index;

    this.deleteProject = { ...this.projects[index] }

  }

  onDeleteConfirmed() {
    this.service.deleteProject(this.deleteProject.projectID)
      .subscribe(
        (response) => {
          this.projects.splice(this.deleteProjectIndex, 1);
        },
        (error) => {
          console.log(error)
        },


      )
  }

  onSearch() {
    this.service.searchProject(this.searchBy, this.searchText)
      .subscribe(
        (response) => {
          this.projects = response;
        },
        (error) => {
          console.log(error)
        },
      )
  }


}
