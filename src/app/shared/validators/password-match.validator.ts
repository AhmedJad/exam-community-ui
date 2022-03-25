import { AbstractControl } from '@angular/forms';
export function PasswordMatchValdiator(form: AbstractControl): { [key: string]: boolean } | null {
    let password = form.get('password') as AbstractControl;
    let password_confirmation = form.get('password_confirmation') as AbstractControl;
    if (!(password.value && password.value == "")
        && !(password_confirmation.value && password_confirmation.value == "")
        && (password.value != password_confirmation.value)) {
        return { notMatch: true }
    }
    return null;
}
