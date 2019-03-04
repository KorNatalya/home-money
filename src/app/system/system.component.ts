import {Component, HostBinding} from '@angular/core';
import {fadeStateTrigger} from '../shared/animations/fade.animation';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'wfm-system',
  templateUrl: './system.component.html',
  animations: [fadeStateTrigger]
})

export class SystemComponent {
  constructor(
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Домашняя бухгалтерия');
    meta.addTags([
      {name: 'keywords', content: 'бухгалтерия'},
      {name: 'description', content: 'Сервис для ведения доходов и расходов онлайн'}
    ]);
  }

  @HostBinding('@fade') a = true;
}
