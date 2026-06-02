import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ElementRegistryService {

    inputElements = new Map<string, HTMLElement>

    outputElements = new Map<string, HTMLElement>

}
