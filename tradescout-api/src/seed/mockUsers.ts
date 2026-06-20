import * as bcrypt from 'bcrypt';

export const generateMockUsers = async () => {
  const defaultPasswordHash = await bcrypt.hash('password123', 10);

  return [
    {
      email: 'bob@tradescout.com',
      password: defaultPasswordHash,
      name: 'Bob Builder',
      termsAccepted: true,
    },
    {
      email: 'alice.spark@tradescout.com',
      password: await bcrypt.hash('securepass456', 10),
      name: 'Alice Spark',
      termsAccepted: true,
    },
    {
      email: 'charlie.wood@tradescout.com',
      password: await bcrypt.hash('timber789', 10),
      name: 'Charlie Wood',
      termsAccepted: false,
    },
  ];
};
