import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setLocation } from "../../redux/slices/filtersSlice";
import styles from "./LocationInput.module.css";

const locationSchema = Yup.object().shape({
  location: Yup.string()
    .min(2, "Location must be at least 2 characters")
    .max(50, "Location must be less than 50 characters")
    .required("Location is required")
});

function LocationInput() {
  const dispatch = useDispatch();

  const handleLocationSubmit = (values) => {
    dispatch(setLocation(values.location));
  };

  return (
    <div className={styles.locationInputContainer}>
      <Formik
        initialValues={{ location: "" }}
        validationSchema={locationSchema}
        onSubmit={handleLocationSubmit}
      >
        <Form>
          <label className={styles.label}>Location</label>
          <div className={styles.inputWrapper}>
            <Field
              type="text"
              name="location"
              className={styles.input}
              placeholder="City"
            />
            <ErrorMessage name="location" component="div" className={styles.errorMessage} />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default LocationInput;
