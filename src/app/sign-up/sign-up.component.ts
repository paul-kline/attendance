import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { CredentialsService } from "../credentials.service";
import { Observable } from "rxjs";
import { AClass } from "../AClass";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  id: string;
  // id$: Observable<string>;
  aclass: AClass;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private credentialService: CredentialsService
  ) {}

  addToMyClasses(aclass: AClass = this.aclass) {
    this.credentialService.addToMyClasses(aclass);
  }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.aclass = await this.credentialService.getClass(this.id);
    console.log("this class:", this.aclass);
    // let x = this.route.paramMap.pipe();
    // console.log("the route!!", this.route);
    // this.id$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => {
    //     this.id = params.get("id");
    //     console.log("got id", this.id);
    //     return this.id;
    //   })
    // );
  }
}
