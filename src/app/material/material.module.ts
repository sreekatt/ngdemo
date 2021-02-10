import { NgModule } from '@angular/core';
import { MatButtonModule,  } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
// import { MatGridListModule } from
// import { MatFilterModule } from


const MaterialComponents = [
  MatButtonModule,
  MatButtonToggleModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatMenuModule,
  MatSelectModule,
  MatCardModule
]


@NgModule({
  imports: [ MaterialComponents ],
  exports: [ MaterialComponents ]
})


export class MaterialModule { }
