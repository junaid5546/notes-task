import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ApiServicesService } from '../services/api-services.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  notes:any[]=[];
  title:string;
  content:string;
  sortBywhat = [{name:"Date",selected:false,id:0},{name:"Title",selected:false,id:1},{name:"Content",selected:false,id:2}]
  constructor(private afs:AngularFirestore, private apiServices:ApiServicesService) {


  }

  ngOnInit(){
    console.log("IN INIT")
    this.apiServices.getItem()
    .then((res:any)=>{
      this.notes  = res;
      console.log("RESULT NOTES: ", res);
    })
  }

  addItems(){
    this.apiServices.addItem(this.title,this.content);
    this.notes.push({
      title:this.title,
      content:this.content,
      date_created:Date.now()
    })
  }

  sortBy(index){
    this.sortBywhat.forEach(x=>{
      x.selected = false;
    });
     this.sortBywhat[index].selected = true;
     let item = this.sortBywhat[index].name;
     switch (index) {
       case 0:
         this.sortByDate()
         break;

         case 1:
           this.sortByTitle();
           break
           case 2:
             this.sortByContent();
             break;

       default:
         break;
     }
  }

  sortByDate(){
    this.notes.sort(function(a, b) {
      let dateA:any = a.date_created, dateB:any = b.date_created;
      return dateA - dateB;
  });
  this.notes.reverse();


  console.log("LIST: ", this.notes);
  }


  sortByTitle(){
    console.log("SORT BY TITLE:");
    this.notes.sort(function (a, b) {
      console.log('a:',a);
      console.log("b",b);
      return b.title - a.title;
    });

  }

  sortByContent(){
    console.log("SORT BY Content:");
     this.notes = this.notes.sort();
  }
}
