import { faqs } from '../../assets/data/faqs';
import FaqItem from './FaqItem';

export default function FaqList() {
  return (
    <ul className='mt-[38px]'>
      {faqs.map((item, index) => (
        <li key={index}><FaqItem item={item} /></li>
      ))}
    </ul>
  );
}
