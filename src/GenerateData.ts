import bcryptjs from 'bcryptjs';

// Function to generate an array of ten users
export const generateUsers = async () => {
  const users = [];
  const palletteOptions = ['#242424', '#ff0000', '#00ff00', '#0000ff', '#ffff00'];

  //Random names
  const firstNames = ['John', 'Mary', 'Michael', 'Emma', 'David', 'Sophia', 'James', 'Olivia', 'Daniel', 'Ava'];
const lastNames = ['Smith', 'Johnson', 'Brown', 'Lee', 'Chen', 'Garcia', 'Kim', 'Taylor', 'Lee', 'Jones'];


// Function to generate a random value from an array
const getRandomValueFromArray = (array:string[]) => {
  return array[Math.floor(Math.random() * array.length)];
};
  
  for (let i = 0; i < 10; i++) {
    const user = {
      URL:  getRandomValueFromArray(firstNames) + getRandomValueFromArray(lastNames), 
      firstName: 'User' + (i + 1),
      lastName: 'Last' + (i + 1),
      email: 'user' + (i + 1) + '@example.com',
      password: await bcryptjs.hash('password' + (i + 1),12),
      photos: [],
      options: {
        layout: 'top',
        carousel: i % 2 === 0, // Setting carousel option to true for even users, false for odd users
        hero: i % 3 === 0, // Setting hero option to true for every third user, false for others
        message: 'Welcome User' + (i + 1),
      },
      palette: {
        primary: palletteOptions[Math.floor(Math.random() * palletteOptions.length)],
        secondary: palletteOptions[Math.floor(Math.random() * palletteOptions.length)],
        text: palletteOptions[Math.floor(Math.random() * palletteOptions.length)], 
      },
    };
    users.push(user);
  }
  return users;
};

// Call the function to generate users
const usersArray = generateUsers();
//console.log(usersArray);