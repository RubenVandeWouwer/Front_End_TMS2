import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Site} from '../../models/site';
import {Router} from '@angular/router';
import {SiteService} from "../../services/site.service";

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  @Input() site!: Site;
  @Output() onDeleteSite: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  detail(id: number) {
    this.router.navigate(['/site', id]);
  }

  deleteSite() {
    if (confirm(`Do you want to delete ${this.site.name}`)) {
      this.onDeleteSite.emit()
    }
  }
}
