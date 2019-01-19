import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppComponent } from "./app.component";
import { NotFoundComponent } from "./not-found.component";
import { PresentationComponent } from "./components/presentation/presentation.component";
import { CursusComponent } from "./components/cursus/cursus.component";
import { CompetencesComponent } from "./components/competences/competences.component";
import { LanguesComponent } from "./components/langues/langues.component";
import { ExperienceComponent } from "./components/experience/experience.component";
import { Chip8Component } from "./components/chip8/chip8.component";
import { InteretsComponent } from "./components/interets/interets.component";
import { ProjetsComponent } from "./components/projets/projets.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { AProposComponent } from "./components/apropros/apropros.component";

const routes: Routes = [
  {
    path: "",
    component: PresentationComponent
  },
  {
    path: "presentation",
    component: PresentationComponent
  },
  {
    path: "cursus",
    component: CursusComponent
  },
  {
    path: "competences",
    component: CompetencesComponent
  },
  {
    path: "experience",
    component: ExperienceComponent
  },
  {
    path: "projets",
    component: ProjetsComponent
  },
  {
    path: "interets",
    component: InteretsComponent
  },
  {
    path: "langues",
    component: LanguesComponent
  },
  {
    path: "apropos",
    component: AProposComponent
  },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    CursusComponent,
    CompetencesComponent,
    LanguesComponent,
    ExperienceComponent,
    Chip8Component,
    InteretsComponent,
    ProjetsComponent,
    NotFoundComponent,
    SidebarComponent,
    AProposComponent,
    Chip8Component
  ],
  imports: [RouterModule.forRoot(routes), CommonModule, FontAwesomeModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
