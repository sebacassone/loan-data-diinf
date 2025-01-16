interface PasswordInput {
  value: string;
  onValueChange: (value: string) => void;
  onBlur?: () => void;
  width?: string;
  errorPassword: string;
  nameComponent?: string;
}
export default PasswordInput;
