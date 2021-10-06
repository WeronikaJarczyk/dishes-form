import { Field } from 'react-final-form';

export const Error = ({ name }) => (
  <Field name={name} subscription={{ error: true, touched: true }}>
    {({ meta: { error, touched } }) =>
      error && touched ? <span className="err">{error}</span> : null
    }
  </Field>
);