import { Loader2 } from 'lucide-react';
import styles from './loader.module.scss';

export function Loader() {
	return <Loader2 className={styles.loader} />;
}
