import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserstateService {

  private isUserAdmin= signal<boolean>(false)

  constructor() { }

  public set_admin (val:boolean) {
    this.isUserAdmin.set(val)
  }

  public get_admin () {
    return(this.isUserAdmin())
  }
}
