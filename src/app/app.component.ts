import { HttpService } from './services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  tasks: any;
  constructor(private taskService: HttpService) { }

  ngOnInit(): void {

    this.taskService.getTaskList().subscribe(res => {
      // this.tasks = res.map(e => {
      //   return {
      //     id: e.payload.doc.id,
      //     ... (e.payload.doc.data() as object)
      //   };
      // })
      console.log(res)
    })


  }

}
