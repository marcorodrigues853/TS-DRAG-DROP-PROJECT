import './../app.css'


//autobind decorator

function autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    }

  };
  return adjDescriptor;
}

// Project Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

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
    this.element.id = 'user-input'


    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement

    this.configure()
    this.attach();
  }


  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    if (enteredTitle.trim().length === 0
      || enteredDescription.trim().length === 0
      || enteredPeople.trim().length === 0) {
      alert("Please enter a valid input")
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople]
    }
  }


  private clearInput() {

    this.peopleInputElement.value = ''
    this.titleInputElement.value = ''
    this.descriptionInputElement.value = ''
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput()

    // validate if has a tuple once tuple is array
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput
      this.clearInput()
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  /**
   *
   */
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}


const projectInput = new ProjectInput()
