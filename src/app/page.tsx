import prisma from '../db';

export default async function Homepage() {
  const jets = await prisma.jet.findMany();
  console.log(jets);
  return <h1>Jets Homepage</h1>;
}
