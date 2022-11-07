import { redirect } from 'react-router-dom'

export const exampleData = async () => {
  try {
    const promiseData = await fetch('API_SOURCE');
    const data = await promiseData.json();
    if (data.status === false) {
      return redirect('/404');
    };
    return data;
  } catch (error) {
    console.log(error);
  };
};