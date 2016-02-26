export class Anchor {
    id: string;
    title: string;
    location: string;
    element: HTMLElement;
    position: number;
    selected: boolean = false;
    updateOffset() : number {
        this.position = this.element.offsetTop - 1;
        return this.position;
    }
    
    constructor (id: string, title: string, location: string, element: HTMLElement) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.element = element;
        this.position = this.updateOffset();
    }
}