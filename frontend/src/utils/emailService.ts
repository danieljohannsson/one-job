export const handleEmailSubmit = async (
  email: string,
  role: string,
  location: string,
  company: string
) => {
  const PORT = process.env.BACKEND_PORT || 5001;
  try {
    const response = await fetch(
      `http://localhost:${PORT}/api/jobs/send-email`,
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
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
