export const passwordCheck = (password: string) => {
  const schema = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,12}$/;
  return schema.test(password);
};
