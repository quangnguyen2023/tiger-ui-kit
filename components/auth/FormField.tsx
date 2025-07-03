import PasswordField from '@/components/base/PasswordField';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  FormField as ShadcnFormField,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { HTMLInputTypeAttribute } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

type InputProps = React.ComponentProps<typeof Input>;

interface FormFieldProps<T extends FieldValues> extends InputProps {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  type?: HTMLInputTypeAttribute;
}

export default function FormField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  type = 'text',
  ...inputProps
}: FormFieldProps<T>) {
  return (
    <ShadcnFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {type !== 'password' ? (
              <Input {...field} {...inputProps} />
            ) : (
              <PasswordField {...field} {...inputProps} />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
