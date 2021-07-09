/* eslint-disable */
import React from 'react';
import { Formik, Form } from 'formik';
import FormikErrorFocus from 'formik-error-focus';

export default function index({
  key,
  initialValues = {},
  onSubmit,
  validationSchema,
  children,
  enableReinitialize = true,
}) {
  return (
    <Formik
      enableReinitialize={enableReinitialize}
      key={key}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnBlur={true}
      validateOnChange={true}
    >
      {props => (
        <Form>
          {children(props)}
          <FormikErrorFocus
            offset={-50}
            align={'top'}
            focusDelay={0}
            ease={'linear'}
            duration={300}
          />
        </Form>
      )}
    </Formik>
  );
}
