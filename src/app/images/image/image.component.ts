import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styles: []
})
export class ImageComponent implements OnInit {
  imgSrc : string;
  imgSrc2 : string;
  selectedImage: any = null;
  selectedImage2: any = null;
  isSubmitted:boolean;

  formTemplate = new FormGroup({
    caption : new FormControl('',Validators.required),
    category : new FormControl(''),
    imageUrl : new FormControl('',Validators.required),
    imageUrl2 : new FormControl('')
  })

  constructor(private storage:AngularFireStorage, private service:ImageService) { }

  ngOnInit() {
    this.resetForm();
  }
  showPreview(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new  FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);  
      this.selectedImage = event.target.files[0];
    }else{
      this.imgSrc =  '/assets/img/placeholder.png';
      this.selectedImage = null;
    }
  }
  showPreview2(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new  FileReader();
      reader.onload = (e:any) => this.imgSrc2 = e.target.result;
      reader.readAsDataURL(event.target.files[0]);  
      this.selectedImage2 = event.target.files[0];
    }else{
      this.imgSrc2 =  '/assets/img/placeholder.png';
      this.selectedImage2 = null;
    }
  }
  onSubmit(formValue){
    this.isSubmitted = true;
    if(this.formTemplate.valid){
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe (
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
            formValue['imageUrl'] = url;
            this.service.insertImageDetails(formValue);

          })
        })
      ).subscribe()
    }
    if(this.formTemplate.valid){
      var filePath = `${formValue.category}/${this.selectedImage2.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage2).snapshotChanges().pipe (
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
            formValue['imageUrl2'] = url;
            this.service.insertImageDetails(formValue);

          })
        })
      ).subscribe()
    }

    
  }
  get formControls(){
    return this.formTemplate['controls'];
  }
  get formControls2(){
    return this.formTemplate['controls'];
  }
  resetForm(){
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption:'',
      imageUrl:'',
      imageUrl2:'', 
      category:''
    });
    this.imgSrc = '/assets/img/placeholder.png';
    this.imgSrc2 = '/assets/img/placeholder.png';
    this.selectedImage = null;
    this.selectedImage2 = null;
    this.isSubmitted=false;
  }
}
