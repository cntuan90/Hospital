import moment, { Moment } from 'moment';

export const convertDateStringToMoment = (dateStr: string) => moment(dateStr, ['HH:mm', 'HH:mm:ss', 'YYYY/MM/DD HH:mm:ss']);

export const convertMomentToYYYYMMDD = (momentObj: Moment) => momentObj.format('YYYY/MM/DD HH:mm:ss');

export const convertTZ = (date: any, tzString: TimeZoneTypes = 'Asia/Tokyo', formatTime: string = 'YYYY-MM-DD HH:mm:ss') => new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }));

export const convertDateWithTZ = (date: any) => {
  const YMD = moment(date).format('YYYY-MM-DD');
  const getTime = new Date().toTimeString().split(' ')[0];
  const getTZ = new Date().toTimeString().split(' ')[1].split('GMT')[1];
  const convertedText = `${YMD}T${getTime}${getTZ}`;
  return convertedText;
};

type TimeZoneTypes =
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Asia/Bangkok'
  | 'America/New_York'
  | 'Asia/Ho_Chi_Minh'
