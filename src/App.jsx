import React, { useState } from "react";

const CustomInput = ({ value, onChange }) => (
  <input type="number" value={value} onChange={onChange} />
);

const useCurrencyConverter = (initialValue, change) => {
  const [baseValue, setBaseValue] = useState(initialValue);
  const [convertedValue, setConvertedValue] = useState(initialValue * change);

  const handleChange = (e) => {
    const inputValue = e.target.value ? parseFloat(e.target.value) : 0;
    setBaseValue(inputValue);
    setConvertedValue(inputValue * change);
  };

  return { baseValue, convertedValue, handleChange };
};

const CurrencyChanger = ({ currencySymbol, initialValue, change }) => {
  const { baseValue, convertedValue, handleChange } = useCurrencyConverter(
    parseFloat(initialValue),
    parseFloat(change)
  );

  return (
    <div>
      {currencySymbol}:
      <CustomInput value={baseValue} onChange={handleChange} /> <br />
      Euros: {convertedValue}
    </div>
  );
};

const App = () => (
  <div>
    <CurrencyChanger currencySymbol="$" initialValue="10" change="1.055925" />
    <CurrencyChanger currencySymbol="£" initialValue="15" change="7.578144" />
    <CurrencyChanger currencySymbol="¥" initialValue="20" change="0.866575" />
  </div>
);

export default App;
