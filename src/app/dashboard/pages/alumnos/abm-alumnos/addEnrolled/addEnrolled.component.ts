import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Inscription } from "src/app/core/models/Inscription";
import { InscriptionsServices } from "src/app/core/services/Inscription.service";

@Component({
    selector: 'app-addEnrolled',
    templateUrl: './addEnrolled.component.html',
    styleUrls: ['./addEnrolled.component.scss']
})
export class AddEnrolledComponent implements OnInit {

    noteControl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10)]);
    selectControl = new FormControl('', [Validators.required]);

    enrolledList: Inscription[] = [];
    selectedEnrollment: Inscription | null = null;
    form: FormGroup;

    registerForm = new FormGroup({
        selectedEnrollment: this.selectControl,
        note: this.noteControl,
    });

    constructor(
        private matDialogRef: MatDialogRef<AddEnrolledComponent>,
        private inscriptionsServices: InscriptionsServices,
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            selectedEnrollment: ['', Validators.required],
            note: ['', [Validators.required, Validators.min(0), Validators.max(10)]]
        });
    }

    ngOnInit(): void {
        this.inscriptionsServices.getInscriptions().subscribe(
            (inscriptions: Inscription[]) => {
                this.enrolledList = inscriptions;
            }
        );
    }

    save(): void {
        if (this.registerForm.valid) {
            const selectedEnrollment = this.registerForm.get('selectedEnrollment')?.value;
            const note = this.registerForm.get('note')?.value;

            const data = Object.assign({}, selectedEnrollment, { note });

            this.matDialogRef.close(data);
        } else {
            this.registerForm.markAllAsTouched();
        }
    }

}
