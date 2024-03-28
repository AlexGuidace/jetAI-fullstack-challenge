// A reusable component for the headings in this application.

'use client';

import type { Heading } from '../types/interfaces';

const Heading: React.FC<Heading> = ({
  title,
  fontSize,
  alignment,
}): JSX.Element => {
  return <h1 className={`${fontSize} ${alignment} font-bold mt-6`}>{title}</h1>;
};

export default Heading;
