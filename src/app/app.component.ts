import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import * as atlet from "../atlet.js";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = "banky";
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log("CREATING");
    atlet.setup();
  }

  ngOnDestroy(): void {
    atlet.stop();
  }
}
