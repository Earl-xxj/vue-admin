import { NgModule } from '@angular/core';
import { SingelSheetComponent } from './singel-sheet/singel-sheet.component';
import { PlayCountPipe } from '../play-count.pipe';
import { WyPlayerModule } from './wy-player/wy-player.module';



@NgModule({
  declarations: [
    SingelSheetComponent, 
    PlayCountPipe,
  ],
  imports: [
    WyPlayerModule
  ],
  exports: [
    SingelSheetComponent,
    PlayCountPipe,
    WyPlayerModule
  ]
})
export class WyUiModule { }
