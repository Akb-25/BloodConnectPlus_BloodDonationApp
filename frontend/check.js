import axios from 'axios'

const data = {
  userId: "234235324",
  name: 'John Doe',
  phone: '123-456-7890',
  selectedCity: 'New York',
  selectedCountry: 'USA',
  dateOfBirth: '1990-01-01',
  gender: 'male',
  occupation: 'Software Engineer',
  isDonor: true,
  aboutYourself: 'Hello, world!',
  photoURL: ""
};
// await axios.post("http://192.168.1.19:5000/user/upload", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
// });

const response = await axios.post("http://192.168.1.6:5000/user/upload", data);
console.log(response);
axios.post('http://192.168.1.6:5000/user/upload', data, {
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });