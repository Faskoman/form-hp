import { ChangeEvent, FormEvent, useState } from "react";
import "./App.scss";
import FormField from "./FormField";
import Input from "./Input";

function App() {
  const { errors, handleInput, validateFields } = useFormValidation();
  const [currentPage, setCurrentPage] = useState(0);

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

    setCurrentPage(1);
  };

  const lastPage = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setCurrentPage(0);
  };

  return (
    <>
      <header>
        <h1>New Form</h1>
      </header>
      <main>
        <form className="card" onSubmit={nextPage} noValidate>
          {currentPage === 0 ? (
            <article className="page-one">
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
              <FormField
                label="Email: "
                htmlFor="email"
                error={errors["email"]}
              >
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onInput={handleInput}
                />
              </FormField>
            </article>
          ) : (
            <article className="page-two">
              <FormField
                label="Pet's name: "
                htmlFor="pet-name"
                error={errors["petName"]}
              >
                <Input
                  id="pet-name"
                  name="petName"
                  type="text"
                  minLength={2}
                  required
                  autoFocus
                  onInput={handleInput}
                />
              </FormField>
              <FormField
                label="Pet species: "
                htmlFor="pet-species"
                error={errors["petSpecies"]}
              >
                <Input
                  id="pet-species"
                  name="petSpecies"
                  type="text"
                  minLength={2}
                  required
                  onInput={handleInput}
                />
              </FormField>
              <FormField
                label="Email: "
                htmlFor="email"
                error={errors["email"]}
              >
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onInput={handleInput}
                />
              </FormField>
            </article>
          )}

          <div className="buttons-container">
            {currentPage != 0 ? (
              <button className="back-btn" onClick={lastPage}>
                Back
              </button>
            ) : (
              <button className="visibility-hidden">Back</button>
            )}
            <button onClick={() => window.location.reload()}>Clear</button>
            {currentPage != 1 ? (
              <button className="next-btn">Next</button>
            ) : (
              <button className="submit-btn">Submit</button>
            )}
          </div>
        </form>
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
