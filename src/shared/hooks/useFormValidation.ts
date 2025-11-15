import { useForm, type UseFormProps, type FieldValues,type Path} from 'react-hook-form';

export const useFormValidation = <T extends FieldValues>(
    options?: UseFormProps<T>
) => {
  const methods = useForm<T>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    ...options
  });

  const shouldShowError = (fieldName: Path<T>): boolean => {
    return methods.formState.isSubmitted &&
        !!methods.formState.errors[fieldName];
  };

  const getErrorMessage = (fieldName: Path<T>): string => {
    const error = methods.formState.errors[fieldName];
    return error?.message as string || '';
  };

  return {
    ...methods,
    shouldShowError,
    getErrorMessage
  };
};