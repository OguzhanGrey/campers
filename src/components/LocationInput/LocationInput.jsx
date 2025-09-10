import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setLocation } from "../../redux/slices/filtersSlice";
import { filterCampers } from "../../redux/slices/campersSlice";
import styles from "./LocationInput.module.css";

const locationSchema = Yup.object().shape({
  location: Yup.string()
    .min(2, "Location must be at least 2 characters")
    .max(50, "Location must be less than 50 characters")
    .required("Location is required"),
});

function LocationInput() {
  const dispatch = useDispatch();
  const { equipment, vehicleType } = useSelector((state) => state.filters);

  const handleLocationSubmit = (values) => {
    dispatch(setLocation(values.location));
    const filterData = {
      location: values.location,
      equipment,
      vehicleType,
    };
    dispatch(filterCampers(filterData));
  };

  const handleLocationChange = (value) => {
    dispatch(setLocation(value));
    const filterData = {
      location: value,
      equipment,
      vehicleType,
    };
    dispatch(filterCampers(filterData));
  };

  return (
    <div className={styles.locationInputContainer}>
      <Formik
        initialValues={{ location: "" }}
        validationSchema={locationSchema}
        onSubmit={handleLocationSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <label className={styles.label}>Location</label>
            <div className={styles.inputWrapper}>
              <Field
                type="text"
                name="location"
                className={styles.input}
                placeholder="City"
                onChange={(e) => {
                  setFieldValue("location", e.target.value);
                  handleLocationChange(e.target.value);
                }}
              />
              <ErrorMessage
                name="location"
                component="div"
                className={styles.errorMessage}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LocationInput;
