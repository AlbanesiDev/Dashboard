import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Inscription } from 'src/app/core/models/Inscription';
import { InscriptionsServices } from 'src/app/core/services/Inscription.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent {
  displayedColumns: string[] = [
    'id',
    'fullName',
    'course',
    'email',
  ];

  dataSource: MatTableDataSource<Inscription>;

  constructor(
    private matDialog: MatDialog,
    private inscriptionsServices: InscriptionsServices,
    @Inject(MAT_DIALOG_DATA) public data: { course: string, commission: string }
  ) {
    this.dataSource = new MatTableDataSource<Inscription>();
    this.inscriptionsServices.getInscriptions().subscribe((enrolled) => {
      const filteredData = this.filterData(enrolled);
      this.dataSource.data = filteredData;
    });
  }

  filterData(enrolled: Inscription[]): Inscription[] {
    const { course, commission } = this.data;
    const regex = /(\D+)(\d+)/;
    return enrolled.filter((inscription) => {
      const match = inscription.course.match(regex);
      if (match) {
        const inscriptionCourse = match[1].trim();
        const inscriptionCommission = match[2];
        return inscriptionCourse === course && inscriptionCommission === commission;
      }
      return false;
    });
  }
}
