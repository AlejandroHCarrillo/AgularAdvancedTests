import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from "@angular/core";

@Component({
  selector: "app-countdown",
  templateUrl: "./countdown.component.html",
  styleUrls: ["./countdown.component.scss"]
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {
  @Input() init: number = null;
  
  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();
  
  public counter: number = 0;
  private timerRef: any = null;
  
  constructor() {}
  
  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    this.clearTimeout();
  }

  ngOnChanges(changes) {
    console.log(changes.init);
    this.startCountdown();
  }
  
  startCountdown() {
    if (this.init && this.init > 0) {
      this.clearTimeout();
      this.counter = this.init;
      this.cuentaPaTras();
    }
  }

  cuentaPaTras() {
    this.timerRef = setTimeout(() => {
      this.counter--;
      this.processCount();
    }, 1000);
  }

  processCount() {
    this.onDecrease.emit(this.counter);
    console.log(`La cuenta es ${this.counter}`);
    if (this.counter === 0) {
      console.log(`Boom!!!!`);
      this.onComplete.emit();
    } else {
      this.cuentaPaTras();
    }
  }

  private clearTimeout(){
    if (this.timerRef){
      clearTimeout(this.timerRef);
      this.timerRef = null;
    }
  }

}
