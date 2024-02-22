import { InjectionToken } from "@angular/core";

// export enum MODES {
//     CREATE, EDIT
// }

export const SHARED_STATE = new InjectionToken("shared_state");

/**
 * This class is used to share state between myaccount component and subject component.
 * This class is needed as even though Angular will detect changes for property value that is used as data binding in UI,
 * by default component, for example subject component, doesn't know changes to property it is interested in.
 * Using observer, observable pattern through this problem is solved.
 * Subject component is displayed (<router-outlet>) inside myaccount component. Angular doesn't re-create component unless it
 * is destroyed and therefore clicking Java, JavaScript icons on myacoount component and
 * using somethinglike navigate to url feature (activatedRoute.snapshot.params["subCategory"]) to subject component wouldn't work.
 */
export class SharedState {
    constructor(public subCategory?: string) { }
}
