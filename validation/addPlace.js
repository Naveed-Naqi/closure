const validator = require("validator");
const isEmpty = require("is-empty");
const axios = require("axios");

const validateAddPlaceInput = data => {
  let { name, address, desc } = data;

  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  name = !isEmpty(name) ? name : "";
  address = !isEmpty(address) ? address : "";
  desc = !isEmpty(desc) ? desc : "";

  // name checks
  if (validator.isEmpty(name)) {
    errors.name = "Restaurant name is required";
  } else if (name.length() > 50) {
    errors.name = "Restaurant name is too long";
  } else if (name.length() < 3) {
    errors.name = "Restaurant name is too short";
  }

  // address checks
  if (validator.isEmpty(address)) {
    errors.address = "Address is required";
  } else if (address.length() < 8) {
    errors.address = "Address is too short";
  } else {
    const {existingAddress} = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json?address="+ address.replace(' ','+') +"&key=YOUR_API_KEY"
    )
    if (existingAddress[0].partial_match) {
      errors.address = "Address does not exist or is not specific enough";
    }
  }

  // desc checks
  if (validator.isEmpty(desc)) {
    errors.desc = "Description is required";
  } else if (desc.length() > 150) {
    errors.desc = "Description is too long";
  } else if (desc.length() < 20) {
    errors.desc = "Description is too short";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateAddPlaceInput;
