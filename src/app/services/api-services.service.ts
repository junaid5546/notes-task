import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore,AngularFirestoreCollection,DocumentReference} from '@angular/fire/firestore';

export interface notes {
  id?:string,
  title:string,
  content:string,
  date_created:string
}
@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
 notes: any[] = [];
 private notesCollection: AngularFirestoreCollection<notes>;

  constructor(private afs:AngularFirestore) {


  }

  addItem(title,content) {
    this.afs.collection('notes-task').doc(Date.now().toString())
    .set({
      title:title,
      content:content,
      date_created:Date.now()
    });
  }

  getItem() {
    return new Promise(resolve=>{
      this.afs.collection('notes-task').get().subscribe(res=>{
        res.forEach((doc)=>{

          console.log( " => ", doc.data());
          this.notes.push(doc.data());
          resolve(this.notes);
        })
      })
    });

  }

  getSortedList(){


  }

}
