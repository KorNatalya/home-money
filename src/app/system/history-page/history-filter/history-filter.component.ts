import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'wfm-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Output() filterCancel = new EventEmitter<any>();
  @Output() filterApply = new EventEmitter<any>();

  @Input() categories: Category[] = [];

  timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'}
  ];

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  constructor() { }

  ngOnInit() {
  }

  closeFiler() {
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.selectedPeriod = '';
    this.filterCancel.emit();
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      if (this[field].indexOf(value) === -1) {
        this[field].push(value);
      }
    } else {
      this[field] = this[field].filter (i => i !== value);
    }
  }

  handleChangeType({checked, value}) {
    this.calculateInputParams('selectedTypes', checked, value);
  }

  handleChangeCategory({checked, value}) {
   this.calculateInputParams('selectedCategories', checked, value);
  }

  applyFilter() {
    const value = {
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    };
    this.filterApply.emit(value);
  }

}
