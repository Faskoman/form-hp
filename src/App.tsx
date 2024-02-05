import { FormEvent, JSXElementConstructor, PropsWithChildren } from "react";
import "./App.scss";

function App() {
  const nextPage = (e: FormEvent<HTMLFormElement>) => {
    console.log("on submit");
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    console.log(firstName, lastName);
  };

  return (
    <>
      <header>
        <h1>New Form</h1>
      </header>
      <main>
        <article>
          <form onSubmit={nextPage} noValidate>
            <FormField label="First name: " htmlFor="first-name">
              <Input
                id="first-name"
                name="firstName"
                type="text"
                required
                autoFocus
              />
            </FormField>
            <FormField label="Last name: " htmlFor="last-name">
              <Input id="last-name" name="lastName" type="text" required />
            </FormField>
            <div className="buttons-container">
              <button>Submit</button>
            </div>
          </form>
        </article>
      </main>
    </>
  );
}

type FormFieldProps = {
  htmlFor?: string;
  label: string;
};

function FormField({
  htmlFor,
  label,
  children,
}: PropsWithChildren<FormFieldProps>) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}

function Input({ className, ...props }: JSX.IntrinsicElements["input"]) {
  return <input className={["text-field", className].join(" ")} {...props} />;
}

export default App;
