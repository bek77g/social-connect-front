import { IField } from '@/components/ui/Field/field.types';
import cn from 'clsx';
import { forwardRef } from 'react';
import styles from './field.module.scss';

const Field = forwardRef<HTMLInputElement, IField>(
	({ error, style, Icon, className, ...rest }, ref) => {
		return (
			<label className={cn(styles.field, className)} style={style}>
				{Icon && (
					<div className={styles.icon}>
						<Icon />
					</div>
				)}
				<input ref={ref} {...rest} />
				{error && <div className={styles.error}>{error.message}</div>}
			</label>
		);
	}
);

export default Field;
