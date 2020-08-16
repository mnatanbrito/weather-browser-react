export function kelvinToCelsius(temp) {
  return Number(temp - 273.15).toFixed(2);
}

export function celsiusLabel() {
  return '˚C';
}
export function kelvinLabel() {
  return '˚K';
}

export function formatTemperature(language, conversionFunctionOrValue, value) {
  const finalValue =
    typeof conversionFunctionOrValue === 'function'
      ? conversionFunctionOrValue(value)
      : conversionFunctionOrValue;
  return `${finalValue} ${language === 'en' ? kelvinLabel() : celsiusLabel()}`;
}
