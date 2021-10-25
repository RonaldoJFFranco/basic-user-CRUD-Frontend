import { Component, ContentChild, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { encode } from 'base64-arraybuffer';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  element!: User;
  isEdit!: boolean;
  srcResult: any;
  photoInFileMode: any;
  fileSelected!: Blob;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: User,
    public dialogRef: MatDialogRef<DialogComponent>,
  ) { }

  ngOnInit(): void {
    this.isEdit = (this.data.cod != null) ? true : false;
    this.photoInFileMode = this.data.photoFile;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSelectPhoto(){
    this.fileSelected = this.photoInFileMode;
    const reader = new FileReader();
    reader.readAsArrayBuffer(this.fileSelected);
    this.data.photoName = this.photoInFileMode.name
    this.data.photoType = this.photoInFileMode.type
    reader.onload = () => {
      this.data.photo = encode(reader.result as ArrayBuffer) as string;
    };
  }

}
