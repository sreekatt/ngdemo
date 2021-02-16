import { Component, ViewChild, OnInit } from '@angular/core';
import { FreeapiService } from '../services/freeapi.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'node_modules/chart.js';
import { SuperBowlStats } from '../models/superbowl'

@Component({
  selector: 'app-superbowl',
  templateUrl: './superbowl.component.html',
  styleUrls: ['./superbowl.component.css']
})
export class SuperbowlComponent implements OnInit {

  public superbowlStats:SuperBowlStats[] = [];
  public dataSource;
  public errorMsg: string;

  chart1 = [];
  chart2 = [];

  constructor(private _freeApiService: FreeapiService) { }

  displayedColumns: string[] = ['SB', 'Date', 'Winner', 'Loser', 'MVP', 'Winner Pts', 'Loser Pts'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Chart properties
  public sbDates;
  public sbWinners;
  public sbWinnerPts;
  public sbLoserPts;
  public sbWinYears =[];

/*
"Date": "Feb 2 2020",
   "SB": "LIV (54)",
   "Winner": "Kansas City Chiefs",
   "Winner Pts": 31,
   "Loser": "San Francisco 49ers",
   "Loser Pts": 20,
   "MVP": "Patrick Mahomes",
   "Stadium": "Hard Rock Stadium",
   "City": "Miami Gardens",
   "State": "Florida"
*/
  ngOnInit(): void {

    this._freeApiService.getSuperBowlStats()
            .subscribe( data => {
              this.superbowlStats = data;
              this.dataSource = new MatTableDataSource(this.superbowlStats)
              this.dataSource = new MatTableDataSource(this.superbowlStats);
                          this.dataSource.paginator = this.paginator;
                          this.dataSource.sort = this.sort;
                          this.sbDates = this.superbowlStats.map(item => item.Date);
                          this.sbWinners = this.superbowlStats.map(item => item.Winner);
                          this.sbWinnerPts = this.superbowlStats.map(item => item['Winner Pts']);
                          this.sbLoserPts = this.superbowlStats.map(item => item['Loser Pts']);
                          this.sbWinYears = this.superbowlStats.map(item =>  item.Date+ "-" +item.Winner);
                          this.sbWinYears = this.sbWinYears.map(item => item.slice(6));
                          // Chart config
                          this.chart1 = new Chart('myChart1', {
                            type: 'bar',
                            data: {
                              labels: this.sbWinYears,
                              datasets:[{
                                label: 'Winning team points',
                                data: this.sbWinnerPts,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                              },
                            ]
                            },
                            options: {
                              legend: {
                                display: true
                              },
                              scales: {
                                xAxes: [{
                                  display: true
                                }],
                                yAxes: [{
                                  display: true,
                                  ticks: {
                                    beginAtZero: true
                                }
                                }]
                              }
                            }

                          });

                        },
                        error => this.errorMsg = error);

  }

  ngOnDestroy() {
    //this._freeApiService.getSuperBowlStats().unsubscribe();
  }

  // var dates = array.map(item => item.date);

}
