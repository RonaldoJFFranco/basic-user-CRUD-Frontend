import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { DialogComponent } from '../dialog/dialog.component';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() source: User[] = []

  constructor(
    public dialog: MatDialog,
    public userService: UsersService
  ) { }

  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['code', 'name', 'birthday', 'photo', 'actions'];
  dataSource: any;

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.source) {
      this.dataSource = new MatTableDataSource(this.source);
      this.source.forEach(el => {
        el.photoPath = 'data:image/jpeg;base64,' + el.photo;
        el.photoFile = new File([this.b64toBlob(el.photo, 'image/jpeg')], el.photoName)
      })
    }
  }

  b64toBlob(b64Data: string, contentType: string,) {
    contentType = contentType || '';
    const sliceSize = 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  openDialog(element: any) {
    let aux = {}
    Object.assign(aux,element)
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: !element ? {
        cod: null,
        name: '',
        birthday: '',
        photoFile: '',
      } : aux
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        result.cod ? this.userService.updateUser(result).subscribe(() => {
          window.location.reload();
        }) :
          this.userService.addUser(result).subscribe(() => {
            window.location.reload();
          })
      }
    });
  }

  removeUser(element: User) {
    this.userService.removeUser(element).subscribe();
    window.location.reload();
  }

  editUSer(element: User) {
    this.openDialog(element);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }
}
