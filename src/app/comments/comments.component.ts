import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FreeapiService } from '../services/freeapi.service'
import { CommentsModel } from '../models/commentsModel'
import { PostsModel } from '../models/postsModel'
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {

  public listOfPosts:PostsModel[];
  public listOfComments:CommentsModel[];
  public errorMsg: string;
  public newPost:PostsModel = {userId:5, title:"new title", body:"new body"};
  objPost:PostsModel;
  public dataSource;

  constructor(private _freeApiService: FreeapiService) { }

  // Material table
  displayedColumns: string[] = ['userId', 'id', 'title', 'body'];
  // dataSource = new MatTableDataSource(this.listOfPosts);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this._freeApiService.getPosts()
      .subscribe(data => {this.listOfPosts = data;
                          this.dataSource = new MatTableDataSource(this.listOfPosts);
                          this.dataSource.paginator = this.paginator;
                          this.dataSource.sort = this.sort;
                          this.dataSource.filterPredicate =
                            (data: PostsModel, filter: string) => data.title.indexOf(filter) != -1;},
                error => this.errorMsg = error);
        /*
    this._freeApiService.getCommentsByParameter()
        .subscribe(data => this.listOfComments = data,
          error => this.errorMsg = error);

    this._freeApiService.post(this.newPost)
          .subscribe(
            data => this.objPost = data,
            error => this.errorMsg = error
          );
          */
  }

  ngAfterViewInit(){
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
