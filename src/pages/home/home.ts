import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  bgColor: string = 'white';

  constructor(
    public navCtrl: NavController,
    private speechRecognition: SpeechRecognition
  ) {

  }

  ngOnInit() {

    this.speechRecognition.hasPermission()
      .then((has: boolean) => {
        if(!has) {
          this.speechRecognition.requestPermission()
            .then(
              () => console.log('granted'),
              () => console.log('denied')
            );
        }
      });

  }

  start() {

    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          console.log(matches);
          this.bgColor = matches[0];
        }
      );

  }

}
