import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./BookForm.module.css";
import Button from "../Button/Button";

const bookingSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  bookingDate: Yup.date()
    .min(new Date(), "Booking date must be in the future")
    .required("Booking date is required"),
  comment: Yup.string().max(500, "Comment must be less than 500 characters"),
});

function BookForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookingSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Booking request submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.bookingCard}>
      <h2>Book your campervan now</h2>
      <p className={styles.bookingSubtext}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={{
          name: "",
          email: "",
          bookingDate: "",
          comment: "",
        }}
        validationSchema={bookingSchema}
        onSubmit={handleBookingSubmit}
      >
        {({ isSubmitting: formikSubmitting }) => (
          <Form className={styles.bookingForm}>
            <div className={styles.formGroup}>
              <Field
                type="text"
                id="name"
                name="name"
                className={styles.formInput}
                placeholder="Name*"
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.formGroup}>
              <Field
                type="email"
                id="email"
                name="email"
                className={styles.formInput}
                placeholder="Email*"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bookingDate">Booking Date</label>
              <Field
                type="date"
                id="bookingDate"
                name="bookingDate"
                className={styles.formInput}
              />
              <ErrorMessage
                name="bookingDate"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.formGroup}>
              <Field
                as="textarea"
                id="comment"
                name="comment"
                rows="4"
                className={styles.formTextarea}
                placeholder="Comment"
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <Button
              text={isSubmitting ? "Sending..." : "Send"}
              className="bookingButton"
              type="submit"
              disabled={isSubmitting || formikSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default BookForm;
