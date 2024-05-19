import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SprintCalculatorComponent } from './sprint-calculator/sprint-calculator.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AddStoryComponent } from './add-story/add-story.component';
import { CommonInputFieldComponent } from './common/common-input-field/common-input-field.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { TextInputComponent } from './common/text-input/text-input.component';
@NgModule({
  declarations: [
    AppComponent,
    SprintCalculatorComponent,
    AddStoryComponent,
    CommonInputFieldComponent,
    TextInputComponent,
    TextInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    NgxEchartsModule.forRoot({ echarts }),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
