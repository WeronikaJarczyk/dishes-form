import { Form, Field } from 'react-final-form';
import React, { useState } from 'react'


const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

const onSubmit = async (values) => {
  // console.log(values);
  // return new Promise(resolve => {
  //   const data = JSON.stringify(values);
  //   console.log(data);
  //   resolve(data);
  // })
  // TRZEBA SPARSOWAĆ NA NUMBER RZECZY
  const data = JSON.stringify(values);
  const diameter = Number(values.diameter);
  console.log(diameter);
  // fetch('https://frosty-wood-6558.getsandbox.com:443/dishes', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: data,
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('Success:', data);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
};

const Error = ({ name }) => (
  <Field name={name} subscription={{ error: true, touched: true }}>
    {({ meta: { error, touched } }) =>
      error && touched ? <span className="err">{error}</span> : null
    }
  </Field>
);

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.preparation_time) {
    errors.preparation_time = "Required";
  }
  if (values.type === "pizza") {
    if (!values.no_of_slices) {
      errors.no_of_slices = "Required";
    }
    if (!values.diameter) {
      errors.diameter = "Required";
    }
  } else if (values.type === "sandwich") {
    if (!values.slices_of_bread) {
      errors.slices_of_bread = "Required";
    }
  }
  return errors;
}

export const MainForm = () => {

  const [spiceState, setSpiceState] = useState(5);

  return (
    <Form
      validate={validate}

      onSubmit={onSubmit}

      initialValues={{ type: "pizza" }}

      render={({ handleSubmit, form, reset }) => (

        <form className="form"
          onSubmit={event => {
            const promise = handleSubmit(event);
            promise && promise.then(() => {
              form.reset();
            })
            return promise;
          }}
        >
          <div className="row">
            <label>Name Your Dish</label>
            <Field name="name" component="input" type="text" placeholder="Dish Name" className="input" />
            <Error name="name" />
          </div>
          <div className="row">
            <label>Preparation Time</label>
            <Field name="preparation_time" component="input" type="time" step='1' min="00:00:00" className="input" />
            <Error name="preparation_time" />
          </div>
          <div className="row">
            <label>Select Dish</label>
            <Field name="type" component="select" className="input">
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="sandwich">Sandwich</option>
            </Field>
            <Error name="type" />
          </div>
          <Condition when="type" is="pizza">
            <div className="row">
              <label>Number of slices</label>
              <Field
                name="no_of_slices"
                component="input"
                type="number"
                min="0"
                placeholder="0"
                className="input"
              />
              <Error name="no_of_slices" />
            </div>
            <div className="row">
              <label>Diameter</label>
              <Field
                name="diameter"
                component="input"
                type="number"
                step="0.01"
                min="0.00"
                placeholder="0.00"
                className="input"
              />
              <Error name="diameter" />
            </div>
          </Condition>
          <Condition when="type" is="soup">
            <div className="row">
              <label>Select Spiceness</label>
              <Field
                name="spiciness_scale"
                component="input"
                type="range"
                min="1"
                max="10"
                step="1"
                value={spiceState}
                onChange={(e) => setSpiceState(e.target.value)}
                className="input"
              />
              <label>{spiceState}</label>
              <Error name="spiciness_scale" />
            </div>
          </Condition>
          <Condition when="type" is="sandwich">
            <div className="row">
              <label>Number of bread slices</label>
              <Field
                name="slices_of_bread"
                component="input"
                type="number"
                min="0"
                placeholder="0"
                className="input"
              />
              <Error name="slices_of_bread" />
            </div>
          </Condition>

          <button className="btn" type="submit">Submit</button>
        </form>
      )}
    />
  )
}
