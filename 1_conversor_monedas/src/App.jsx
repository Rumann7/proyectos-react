import React from "react";
import { useState } from "react";

const CustomInput = ({ value, onChange }) => (
  <input type="number" value={value} onChange={onChange} />
);

const useCurrencyConverter = () => {
  const [euros, setEuros] = useState(0);
  const [dollars, setDollars] = useState(0);

  const changeEuros = (e) => {
    const euroAmount = e.target.value ? parseFloat(e.target.value) : 0;
    setEuros(euroAmount);
    const convertedDollars = euroAmount * 1.12; // Suponiendo 1 euro = 1.12 dólares
    setDollars(convertedDollars);
  };

  const changeDollars = (e) => {
    const dollarAmount = e.target.value ? parseFloat(e.target.value) : 0;
    setDollars(dollarAmount);
    const convertedEuros = dollarAmount / 1.12; // Tipo de cambio inverso
    setEuros(convertedEuros);
  };

  return { euros, dollars, changeEuros, changeDollars };
};

const CurrencyChange = () => {
  const { euros, dollars, changeEuros, changeDollars } = useCurrencyConverter();

  return (
    <>
      Euros:
      <CustomInput value={euros} onChange={changeEuros} /> <br></br>
      Dollars:
      <CustomInput value={dollars} onChange={changeDollars} />
    </>
  );
};

export default CurrencyChange;
