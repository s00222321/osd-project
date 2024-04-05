import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { ProjectService } from '../projects/project.service';
import { Project } from '../projects/project';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  users: User[] | undefined
  selectedUser: User | undefined;
  selectedProjects: Project[] | undefined
  userId: string | undefined | null;
  filteredUsers: User[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    console.log(this.userId)
    this.getUsers();
  }

  getUsers(): void {
    this.projectService.getUsers().subscribe({
      next: (users: any) => {
        this.users = users.users;
        if (this.users)
        this.filteredUsers = this.users.filter(user => user._id !== this.userId);
        console.log(this.filteredUsers)
      },
      error: (error) => {
        if (error.status === 404) {
          console.log('No users found');
        } else {
          console.error('Error fetching users:', error);
        }
      }
    });
  }

  
  selectUser(user: User): void {
    this.selectedUser = user;
    this.getUsersProjects(user._id)
  }

  getUsersProjects(userId: string): void{
    this.projectService.getProjects(userId).subscribe({
      next: (projects: any) => {
        this.selectedProjects = projects;
        console.log(this.selectedProjects)
      },
      error: (error) => {
        if (error.status === 404) {
          console.log('No tasks found for this project.');
        } else {
          console.error('Error fetching tasks:', error);
        }
      }
    });
  }

}
