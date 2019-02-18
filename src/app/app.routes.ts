import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AProposComponent } from './components/apropros/apropros.component';
import { Chip8Component } from './components/chip8/chip8.component';
import { CompetencesComponent } from './components/competences/competences.component';
import { CursusComponent } from './components/cursus/cursus.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ProjetComponent } from './components/projet/projet.component';
import { ProjetsComponent } from './components/projets/projets.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TechnologiesComponent } from './components/technologies/technologies.component';
import { TechnologyComponent } from './components/technology/tehnology.component';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PresentationComponent,
  },
  {
    path: 'presentation',
    component: PresentationComponent,
  },
  {
    path: 'cursus',
    component: CursusComponent,
  },
  {
    path: 'competences',
    component: CompetencesComponent,
  },
  {
    path: 'experience',
    component: ExperienceComponent,
  },
  {
    path: 'projets',
    component: ProjetsComponent,
  },
  {
    path: 'chip8',
    component: Chip8Component,
  },
  {
    path: 'apropos',
    component: AProposComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    CursusComponent,
    CompetencesComponent,
    ExperienceComponent,
    Chip8Component,
    ProjetsComponent,
    NotFoundComponent,
    SidebarComponent,
    AProposComponent,
    Chip8Component,
    ProgressBarComponent,
    TechnologyComponent,
    TechnologiesComponent,
    ProjetComponent,
  ],
  imports: [RouterModule.forRoot(routes), CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
