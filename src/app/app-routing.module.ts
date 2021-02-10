import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommentsComponent } from './comments/comments.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { TrackingComponent } from './tracking/tracking.component';
import { GMapsComponent } from './g-maps/g-maps.component';
import { SuperbowlComponent } from './superbowl/superbowl.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path:'home', component:HomeComponent },
  { path:'dashboard', component:MyDashboardComponent },
  { path:'comments', component:CommentsComponent },
  { path:'tracking', component:TrackingComponent },
  { path:'gmaps', component:GMapsComponent },
  { path:'superbowl', component:SuperbowlComponent },

  // {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
