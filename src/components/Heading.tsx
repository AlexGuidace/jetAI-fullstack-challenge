import { Heading } from '../types/interfaces';

const Heading: React.FC<Heading> = ({
  title,
  fontSize,
  alignment,
}): JSX.Element => {
  return <h1 className={`${fontSize} ${alignment} font-bold mt-6`}>{title}</h1>;
};

export default Heading;
