import { Field } from 'react-final-form';
import { Error } from './Error';

export const InputFormField = ({ label, name, ...rest }) => {

  return (
    <div className="row">
      <label>{label}</label>
      <Field
        name={name}
        component="input"
        className="input"
        {...rest}
      />
      <Error name={name} />
    </div>
  );
}