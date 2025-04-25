export const fetchDoctors = async () => {
    try {
      const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch doctors. Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching doctors:', error.message);
      return { error: 'Failed to fetch doctors' }; // Return error message
    }
  };
  