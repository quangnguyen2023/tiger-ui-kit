import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

const PasswordField = (props: React.ComponentProps<typeof Input>) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        type={show ? 'text' : 'password'}
        className={cn('pr-11', props.className)}
        {...props}
      />

      <button
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer *:w-5 *:h-5"
        onClick={() => setShow((s) => !s)}
      >
        {show ? <Eye /> : <EyeClosed />}
      </button>
    </div>
  );
};

export default PasswordField;
