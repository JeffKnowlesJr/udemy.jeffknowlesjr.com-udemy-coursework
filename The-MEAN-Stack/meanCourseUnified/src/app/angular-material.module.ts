import { NgModule } from '@angular/core';

// Material Style imports
import { MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  // imports: [
  //   MatInputModule,
  //   MatCardModule,
  //   MatButtonModule,
  //   MatToolbarModule,
  //   MatDialogModule,
  //   MatPaginatorModule,
  //   MatExpansionModule,
  //   MatProgressSpinnerModule
  // ], // importing done automatically by angular
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
  ]
  // by default these are not exposed to any other module and need exports
})
export class AngularMaterialModule {}
