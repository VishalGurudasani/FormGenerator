export const validateJSON = (json: string): [boolean, unknown] => {
    try {
      const parsed = JSON.parse(json);
      return [true, parsed];
    } catch {
      return [false, null];
    }
  };
  