import { ChangeEvent, FormEvent, useState } from "react";
import "./App.scss";
import FormField from "./FormField";
import Input from "./Input";

function App() {
  const { errors, handleInput, validateFields } = useFormValidation();

  const nextPage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!validateFields(formData)) {
      return;
    }
    console.log(
      formData.get("firstName"),
      formData.get("lastName"),
      formData.get("email")
    );
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
              error={errors["firstName"]}
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
              error={errors["lastName"]}
            >
              <Input
                id="last-name"
                name="lastName"
                type="text"
                minLength={2}
                required
                onInput={handleInput}
              />
            </FormField>
            <FormField label="Email: " htmlFor="email" error={errors["email"]}>
              <Input
                id="email"
                name="email"
                type="email"
                required
                onInput={handleInput}
              />
            </FormField>
            <div className="buttons-container">
              <button className="back-btn">Back</button>
              <button onClick={() => window.location.reload()}>Clear</button>
              <button className="next-btn">Next</button>
            </div>
          </form>
        </article>
      </main>
    </>
  );
}

function useFormValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, validity, validationMessage } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validity.valid
        ? ""
        : validationMessage || `Please enter your ${name}.`,
    }));
  };

  const validateFields = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (!value) {
        newErrors[key] = `Please enter your ${key}.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, handleInput, validateFields };
}

export default App;
