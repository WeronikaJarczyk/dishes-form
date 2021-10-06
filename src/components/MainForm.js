import { Condition } from './Condition';
import { Form } from 'react-final-form';
import { validate } from '../utils/validate';
import { InputFormField } from './InputFormField';
import { SelectFormField } from './SelectFormField';
import { addNotification } from '../utils/addNotification';

const onSubmit = async (values) => {
  try {
    const response = await fetch('https://frosty-wood-6558.getsandbox.com:443/dishes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      addNotification("Thank You", "You have successfully placed your order", "success");
    } else {
      addNotification("Oops!", "Please, try again", "danger");
    }
  } catch (err) {
    addNotification("Oops!", "Please, try again", "danger");
  }
};

export const MainForm = () => {

  const parseToFloat = value => (isNaN(parseFloat(value)) ? "" : parseFloat(value));

  const parseToInt = value => (isNaN(parseInt(value)) ? "" : parseInt(value));

  const options = [
    { name: "pizza", value: "Pizza" },
    { name: "soup", value: "Soup" },
    { name: "sandwich", value: "Sandwich" },
  ];

  return (
    <Form
      validate={validate}
      onSubmit={onSubmit}
      initialValues={{ type: "pizza", preparation_time: "00:20:00" }}
      render={({ handleSubmit, form, restart }) => (

        <form
          className="form"
          onSubmit={event => {
            const promise = handleSubmit(event);
            promise && promise.then(() => {
              form.restart();
            })
            return promise;
          }}
        >
          <InputFormField label="Name Your Dish" name="name" type="text" placeholder="Dish Name" />

          <InputFormField label="Preparation Time" name="preparation_time" type="time" step="1" />

          <SelectFormField label="Select Dish" name="type" options={options} />

          <Condition when="type" is="pizza">
            <InputFormField label="Number of slices" name="no_of_slices" type="number" min="0" placeholder="0" parse={parseToInt} />
            <InputFormField label="Diameter" name="diameter" type="number" step="0.01" min="0.00" placeholder="0.00" parse={parseToFloat} />
          </Condition>

          <Condition when="type" is="soup">
            <InputFormField label="Select Spiceness" name="spiciness_scale" type="number" step="1" min="1" max="10" placeholder="1" parse={parseToInt} />
          </Condition>

          <Condition when="type" is="sandwich">
            <InputFormField label="Number of bread slices" name="slices_of_bread" type="number" min="0" placeholder="0" parse={parseToInt} />
          </Condition>

          <button className="btn" type="submit">Submit</button>
        </form>
      )}
    />
  )
}
