const findByCode = async (code: string) => {
  try {
    const response = await fetch(
      `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=${code}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;
  } catch (error) {
    return error;
  }
};

export default { findByCode };
