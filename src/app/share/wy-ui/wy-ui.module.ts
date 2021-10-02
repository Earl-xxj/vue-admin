import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingelSheetComponent } from './singel-sheet/singel-sheet.component';
import { PlayCountPipe } from '../play-count.pipe';



@NgModule({
  declarations: [
    SingelSheetComponent, 
    PlayCountPipe
  ],
  imports: [],
  exports: [
    SingelSheetComponent,
    PlayCountPipe
  ]
})
export class WyUiModule { }
