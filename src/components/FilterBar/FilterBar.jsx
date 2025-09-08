import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./FilterBar.module.css";
import Button from "../Button/Button";
import AC from "../../images/vector/Vector.svg";
import Auto from "../../images/vector/automatic.svg";
import Kitchen from "../../images/vector/kitchen.svg";
import TV from "../../images/vector/tv.svg";
import Bath from "../../images/vector/bathroom.svg";
import Van from "../../images/vector/Van.svg";
import Full from "../../images/vector/Fullyintegrated.svg";
import Alcove from "../../images/vector/alcove.svg";
import { setFilters } from "../../redux/slices/filtersSlice";
import { filterCampers } from "../../redux/slices/campersSlice";

const filterSchema = Yup.object().shape({
  equipment: Yup.object(),
  vehicleType: Yup.object()
});

function FilterBar() {
  const dispatch = useDispatch();

  const equipmentIcons = {
    AC: AC,
    Automatic: Auto,
    Kitchen: Kitchen,
    TV: TV,
    Bathroom: Bath,
  };

  const vehicleTypeIcons = {
    Van: Van,
    FullyIntegrated: Full,
    Alcove: Alcove,
  };

  const initialValues = {
    equipment: {
      AC: false,
      Automatic: false,
      Kitchen: false,
      TV: false,
      Bathroom: false,
    },
    vehicleType: {
      Van: false,
      FullyIntegrated: false,
      Alcove: false,
    }
  };

  const handleFilterSubmit = (values) => {
    console.log("Search clicked with:", values);
    dispatch(setFilters(values));
    dispatch(filterCampers(values));
  };

  return (
    <div className={styles.filterBar}>
      <h3 className={styles.filterTitle}>Filters</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={filterSchema}
        onSubmit={handleFilterSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className={styles.filterSection}>
              <h4 className={styles.sectionTitle}>Vehicle equipment</h4>
              <div className={styles.filterOptions}>
                {Object.entries(values.equipment).map(([equipmentName, isSelected]) => (
                  <button
                    key={equipmentName}
                    type="button"
                    className={`${styles.filterOption} ${
                      isSelected ? styles.selected : ""
                    }`}
                    onClick={() => setFieldValue(`equipment.${equipmentName}`, !isSelected)}
                  >
                    <span className={styles.optionIcon}>
                      <img
                        src={equipmentIcons[equipmentName]}
                        alt={`${equipmentName} icon`}
                        className={styles.iconImage}
                      />
                    </span>
                    <span className={styles.optionText}>{equipmentName}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4 className={styles.sectionTitle}>Vehicle type</h4>
              <div className={styles.filterOptions}>
                {Object.entries(values.vehicleType).map(([typeName, isSelected]) => (
                  <button
                    key={typeName}
                    type="button"
                    className={`${styles.filterOption} ${
                      isSelected ? styles.selected : ""
                    }`}
                    onClick={() => setFieldValue(`vehicleType.${typeName}`, !isSelected)}
                  >
                    <span className={styles.optionIcon}>
                      <img
                        src={vehicleTypeIcons[typeName]}
                        alt={`${typeName} icon`}
                        className={styles.iconImage}
                      />
                    </span>
                    <span className={styles.optionText}>
                      {typeName === "FullyIntegrated" ? "Fully Integrated" : typeName}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.searchButtonContainer}>
              <Button text="Search" className="filterbutton" type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FilterBar;

