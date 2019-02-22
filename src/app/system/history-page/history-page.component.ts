import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {combineLatest, Subscription} from 'rxjs';
import {WFMEvent} from '../shared/models/event.model';
import {Category} from '../shared/models/category.model';

@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  constructor(private categoriesService: CategoriesService,
              private eventsService: EventsService) { }

  isLoaded = false;
  s1: Subscription;

  categories: Category[] = [];
  events: WFMEvent[] = [];

  chartData = [];

  isFilterVisible = false;

  ngOnInit() {
    this.s1 = combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Category[], WFMEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];

      this.calculateChartData();

      this.isLoaded = true;
    });
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((cat) => {
      const catEvents = this.events.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  filterCancel() {
    this.toggleFilterVisibility(false);
  }

  filterApply(filterData) {
    console.log(filterData);
  }


  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}
