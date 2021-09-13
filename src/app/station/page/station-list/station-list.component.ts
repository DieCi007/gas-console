import { Component, OnInit } from '@angular/core';
import { GasStationService } from '../../service/gas-station.service';
import { SortType } from '../../../shared/model/SortType';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit {

  constructor(
    private service: GasStationService
  ) {
  }

  ngOnInit(): void {
    this.service.getStations({
      sortType: SortType.ASC,
      sortBy: '',
      size: 20,
      page: 0
    }).subscribe(r => console.log(r));
  }

}
