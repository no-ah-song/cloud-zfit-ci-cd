import { useState, useEffect } from 'react';

function useForm({ initialValues, onSubmit, validate }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event, targetName, targetValue) => {
    //    try{
    const { name, value } = event.target;
    //     if(name&&value){
    setValues({ ...values, [name]: value });
    //   }else {
    //     setValues({ ...values, [targetName]: targetValue });
    //   }
    // }catch{
    //   setValues({ ...values, [targetName]: targetValue });
    // }
  };

  const changeValue = async (targetName, targetValue) => {
    setValues({ ...values, [targetName]: targetValue });
  };
  const handleSubmit = async event => {
    setSubmitting(true);
    event?.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    onSubmit(values);
    setSubmitting(false);
    // setErrors(validate(values));
  };

  //  function validate(values){
  //    return 0;
  //  }

  // useEffect(() => {
  //   console.log('update');
  //   if (submitting) {
  //     if (Object.keys(errors).length === 0) {
  //       onSubmit(values);
  //     }
  //     setSubmitting(false);
  //   }
  // }, [errors]);

  useEffect(() => {
    onSubmit(values);
  }, [values]);

  return {
    values,
    errors,
    submitting,
    handleChange,
    changeValue,
    handleSubmit,
  };
}

export default useForm;
