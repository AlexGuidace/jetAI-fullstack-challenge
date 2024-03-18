interface Heading {
  title: string;
  fontSize: string;
}

const Heading: React.FC<Heading> = ({ title, fontSize }): JSX.Element => {
  return (
    <h1 className={`${fontSize} text-center text-stone-600 font-bold mt-6`}>
      {title}
    </h1>
  );
};

export default Heading;
