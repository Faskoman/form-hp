import { ChangeEvent, FormEvent, PropsWithChildren, useState } from "react";
import "./App.scss";

function App() {
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const validateFields = () => {
    const formData = new FormData(document.querySelector('form')!);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    setFirstNameError(firstName ? "" : "Please enter your first name.");
    setLastNameError(lastName ? "" : "Please enter your last name.");

    return !!firstName && !!lastName;
  };

  const nextPage = (e: FormEvent<HTMLFormElement>) => {
    console.log("on submit");
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    console.log(firstName, lastName);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, validity, validationMessage } = e.target;

    if (name === "firstName") {
      setFirstNameError(validity.valid ? "" : validationMessage || "Please enter your first name.");
    } else if (name === "lastName") {
      setLastNameError(validity.valid ? "" : validationMessage || "Please enter your last name.");
    }
  };

  return (
    <>
      <header>
        <h1>New Form</h1>
      </header>
      <main>
        <article>
          <form className="card" onSubmit={nextPage} noValidate>
            <FormField
              label="First name: "
              htmlFor="first-name"
              error={firstNameError}
            >
              <Input
                id="first-name"
                name="firstName"
                type="text"
                minLength={2}
                required
                autoFocus
                onInput={handleInput}
              />
            </FormField>
            <FormField
              label="Last name: "
              htmlFor="last-name"
              error={lastNameError}
            >
              <Input
                id="last-name"
                name="lastName"
                type="text"
                required
                onInput={handleInput}
              />
            </FormField>
            <div className="buttons-container">
              <button type="reset">Clear</button>
              <button>Next</button>
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
  error?: string;
};

function FormField({
  htmlFor,
  label,
  error,
  children,
}: PropsWithChildren<FormFieldProps>) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      <p className="error-message">{error || " "}</p>
    </div>
  );
}

function Input({ className, ...props }: JSX.IntrinsicElements["input"]) {
  return <input className={["text-field", className].join(" ")} {...props} />;
}

export default App;