import { LucideIcon } from 'lucide-react';
import { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface IFieldProps {
	placeholder: string;
	error?: FieldError;
	isEyeIcon?: boolean;
	Icon: LucideIcon;
}

type TypeInputProps = InputHTMLAttributes<HTMLInputElement> & IFieldProps;

export interface IField extends TypeInputProps {}
