import { Component, OnInit } from "@angular/core";
import { CredentialsService } from "../credentials.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(private credentialService: CredentialsService) {}

  ngOnInit() {}
}
