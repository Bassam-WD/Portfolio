import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard-layout/dashboard-layout';
import { Profile } from './components/dashboard-layout/profile/profile';
import { Projects as ProjectsDash } from './components/dashboard-layout/projects/projects';
import { Skills } from './components/dashboard-layout/skills/skills';
import { Public } from './components/public-layout/public-layout';
import { Home } from './components/public-layout/home/home';
import { Projects } from './components/public-layout/projects/projects';
import { Contact } from './components/public-layout/contact/contact';

export const routes: Routes = [
  {
    path: '',
    component: Public,
    children: [
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'projects', component: Projects },
      { path: 'contact', component: Contact },
    ],
  },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: Profile },
      { path: 'projects', component: ProjectsDash },
      { path: 'skills', component: Skills },
    ],
  },
];
