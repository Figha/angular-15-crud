// import { Component, OnInit } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';
// import { Tutorial } from 'src/app/models/tutorial.model';
// import { TutorialService } from 'src/app/services/tutorial.service';

// @Component({
//   selector: 'app-add-tutorial',
//   templateUrl: './add-tutorial.component.html',
//   styleUrls: ['./add-tutorial.component.css']
// })
// export class AddTutorialComponent implements OnInit {

//   tutorial: Tutorial = {
//     title: '',
//     description: '',
//     published: false
//   };
//   submitted = false;

//   constructor(private tutorialService: TutorialService){

//   }

//   ngOnInit(): void {
      
//   }

//   saveTutorial(): void{

//     const data = {
//       title: this.tutorial.title,
//       description: this.tutorial.description
//     };
    
//     this.tutorialService.create(data)
//     .subscribe({
//       next: (res) => {
//         console.log(res);
//         this.submitted = true;
//       },
//       error: (e) => console.error(e)
//     })
//   }

//   newTutorial(): void{
//     this.submitted = false;
//     this.tutorial = {
//       title: '',
//       description: '',
//       published: false
//     }
//   }

  

// }
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  tutorialForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    published: new FormControl(false),
  });
  submitted = false;
  validator = false;

  constructor(
    private formBuilder: FormBuilder,
    private tutorialService: TutorialService
  ) {}

  ngOnInit(): void {
    this.tutorialForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required,
      Validators.minLength(6)]],
      published: [false]
    });
  }

  get f(): { [key: string]:AbstractControl } { return this.tutorialForm.controls; }

  saveTutorial(): void {

    this.validator = true;
    

    if (this.tutorialForm.invalid) {
      return;
    }

    const data = {
      title: this.f['title'].value,
      description: this.f['description'].value
    };

    this.tutorialService.create(data)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorialForm.reset();
  }

}