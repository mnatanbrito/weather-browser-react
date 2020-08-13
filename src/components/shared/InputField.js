import React from 'react';

function InputField({
  value,
  loading = false,
  onChange,
  onSubmit,
  maxLength = 140,
}) {
  const submit = (ev) => {
    ev.preventDefault();

    onSubmit();
  };
  return (
    <form noValidate onSubmit={submit}>
      <div
        className={`inputfield control has-icons-left has-icons-right ${
          loading ? 'is-loading' : ''
        }`}
      >
        <input
          className="inputfield--input input is-large"
          type="text"
          placeholder="Type a city name"
          onChange={onChange}
          value={value}
          maxLength={maxLength}
        />
        <span className="icon is-medium is-right">
          <i className="fas fa-search"></i>
        </span>
      </div>
    </form>
  );
}

export default InputField;
