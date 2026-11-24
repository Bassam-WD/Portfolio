import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Sidebar } from './shared/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, Header, Sidebar],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class Dashboard {}
