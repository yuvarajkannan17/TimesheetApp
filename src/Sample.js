function Sample() {

  function validateInput(input) {
    let value = input.value; // Convert input value to a number
   console.log(typeof value)
    // Ensure the value is within the range of 0 to 12
    if (value < 0 || value > 12 || isNaN(value)) {
      // If the value is less than 0 or greater than 12, set it to 0 or 12 respectively
      value = Math.min(Math.max(value, 0), 12);
    }
  
    // Update the input value
    input.value = value;
    console.log(value);
  }
  
  

  return (
    <>
        <label for="inputField">Field Name</label>
        <input type="text" inputMode="numeric" onInput={(event) => validateInput(event.target)} />


      </>
      )
}

export default Sample;