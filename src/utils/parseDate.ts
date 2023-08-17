import { Timestamp } from 'firebase/firestore';
import moment from 'moment';
import 'moment/locale/es';

export function parseDate(timestamp: Timestamp): string {
  const fecha = moment.unix(timestamp.seconds);
  return fecha.startOf('hour').fromNow();
}
