import { Field } from 'react-final-form';
import { Error } from './Error';

export const SelectFormField = ({ label, name, options, ...rest }) => {

  return (
    <div className="row">
      <label>{label}</label>
      <Field
        name={name}
        component="select"
        className="input"
        {...rest}
      >
        {
          options.map(({ name, value }) => {
            return <option key={name} value={name}>{value}</option>;
          })
        }
      </Field>
      <Error name={name} />
    </div>
  );
}