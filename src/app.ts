import './../app.css'


class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement; // exclamation to tell Ts all good that always will have a value
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    ); // import to HTML
    this.element = importedNode.firstElementChild as HTMLFormElement
    this.attach();
  }
  /**
   *
   */
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}




const projectInput = new ProjectInput();
