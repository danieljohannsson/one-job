export const handleEmailSubmit = async (
  email: string,
  role: string,
  location: string,
  company: string
) => {
  const PORT = import.meta.env.VITE_BACKEND_PORT || 5001;
  try {
    const response = await fetch(
      `http://localhost:${PORT}/preferences/preference`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          role,
          location,
          company,
        }),
      }
    );
    const result: { message: string } = await response.json();
    console.log(result.message);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
